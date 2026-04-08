import type { ChallengeDefinition, FunctionTestSpec } from "./types";

// ---------------------------------------------------------------------------
// Primary exports
// ---------------------------------------------------------------------------

export function buildProgram(challenge: ChallengeDefinition, userCode: string): string {
  if (challenge.kind === "mcq") return userCode;

  if (challenge.kind === "html") {
    const rules = parseWebRules(challenge.expected ?? "");
    return buildHtmlValidationHarness(userCode, rules);
  }

  if (challenge.kind === "css") {
    const rules = parseWebRules(challenge.expected ?? "");
    return buildCssValidationHarness(userCode, rules);
  }

  if (challenge.kind === "functions") {
    const custom = CUSTOM_FUNCTION_HARNESS[challenge.id];
    if (custom) return custom(userCode);
    if (challenge.functionTests?.length) {
      return buildGenericFunctionHarness(userCode, challenge.functionTests);
    }
    return userCode;
  }

  return userCode;
}

export function isCorrect(challenge: ChallengeDefinition, stdout: string): boolean {
  const trimmed = stdout.trim();
  const expected = challenge.expected ?? "";

  if (challenge.kind === "mcq") return false;

  // HTML / CSS challenges return a JSON result from the Node.js harness
  if (challenge.kind === "html" || challenge.kind === "css") {
    return (
      trimmed.includes('"allPassed":true') ||
      trimmed.includes('"allPassed": true')
    );
  }

  if (expected === "__any_nonempty__") return trimmed.length > 0;

  if (expected.startsWith("__any_lines:")) {
    const raw = expected.replace("__any_lines:", "").replace(/__$/, "").trim();
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return false;
    const lines = trimmed.split("\n").filter((l) => l.trim().length > 0);
    return lines.length === n;
  }

  if (expected.startsWith("__contains:")) {
    const substring = expected.replace("__contains:", "").replace(/__$/, "");
    return trimmed.includes(substring);
  }

  if (challenge.kind === "output" || challenge.kind === "fix") {
    return trimmed === expected.trim();
  }

  if (challenge.kind === "functions") {
    return trimmed.includes('"allPassed": true');
  }

  return false;
}

// ---------------------------------------------------------------------------
// Web Technologies: HTML / CSS validation via Node.js harnesses
// ---------------------------------------------------------------------------

/**
 * Parse the rule list from expected strings like:
 *   "__html:doctype,lang,charset__"
 *   "__css:universal-selector,margin-reset__"
 */
function parseWebRules(expected: string): string[] {
  const m = expected.match(/^__(?:html|css):(.+)__$/);
  if (!m) return [];
  return m[1].split(",").map((r) => r.trim()).filter(Boolean);
}

/**
 * Each rule has a human-readable label and a JavaScript expression string
 * that evaluates to a boolean. The expression receives `code` as the
 * variable holding the student's source text.
 */
interface RuleSpec {
  label: string;
  /** JavaScript expression (must evaluate to boolean, receives `code`) */
  expr: string;
}

const HTML_RULES: Record<string, RuleSpec> = {
  doctype: {
    label: "DOCTYPE declaration present",
    expr: `/<!DOCTYPE\\s+html/i.test(code)`
  },
  lang: {
    label: "html element has lang attribute",
    expr: `/<html[^>]*\\slang\\s*=/i.test(code)`
  },
  charset: {
    label: "meta charset declaration present",
    expr: `/< *meta[^>]*charset/i.test(code)`
  },
  viewport: {
    label: "meta viewport tag present",
    expr: `/< *meta[^>]*name\\s*=\\s*["']viewport["']/i.test(code)`
  },
  "title-tag": {
    label: "title element present",
    expr: `/<title[\\s>/]/i.test(code)`
  },
  "body-tag": {
    label: "body element present",
    expr: `/<body[\\s>/]/i.test(code)`
  },
  "header-tag": {
    label: "header element used",
    expr: `/<header[\\s>/]/i.test(code)`
  },
  "nav-tag": {
    label: "nav element used",
    expr: `/<nav[\\s>/]/i.test(code)`
  },
  "main-tag": {
    label: "main element used",
    expr: `/<main[\\s>/]/i.test(code)`
  },
  "footer-tag": {
    label: "footer element used",
    expr: `/<footer[\\s>/]/i.test(code)`
  },
  "section-tag": {
    label: "section element used",
    expr: `/<section[\\s>/]/i.test(code)`
  },
  "article-tag": {
    label: "article element used",
    expr: `/<article[\\s>/]/i.test(code)`
  },
  "one-h1": {
    label: "exactly one h1 element",
    expr: `(code.match(/<h1[\\s>]/gi) || []).length === 1`
  },
  "h2-present": {
    label: "at least one h2 element present",
    expr: `/<h2[\\s>]/i.test(code)`
  },
  "no-h3-before-h2": {
    label: "h3 only appears after an h2",
    expr: `(function(){ var h2=code.search(/<h2[\\s>]/i); var h3=code.search(/<h3[\\s>]/i); if(h3===-1) return true; if(h2===-1) return false; return h2<h3; })()`
  },
  "display-flex": {
    label: "display: flex applied",
    expr: `/display\\s*:\\s*flex/i.test(code)`
  },
  "justify-content": {
    label: "justify-content property used",
    expr: `/justify-content\\s*:/i.test(code)`
  },
  "list-style-none": {
    label: "list-style: none applied",
    expr: `/list-style\\s*:\\s*none/i.test(code)`
  },
  "form-aria-label": {
    label: "form element has aria-label",
    expr: `/<form[^>]*aria-label\\s*=/i.test(code)`
  },
  "label-for": {
    label: "label elements use for attribute",
    expr: `/<label[^>]*\\bfor\\s*=/i.test(code)`
  },
  "input-with-id": {
    label: "input elements have id attribute",
    expr: `/<input[^>]*\\bid\\s*=/i.test(code)`
  },
  "required-attr": {
    label: "required attribute present on inputs",
    expr: `/\\brequired\\b/i.test(code)`
  },
  "aria-describedby": {
    label: "aria-describedby links input to helper text",
    expr: `/aria-describedby\\s*=/i.test(code)`
  },
  "email-type": {
    label: "email input uses type=\"email\"",
    expr: `/type\\s*=\\s*["']email["']/i.test(code)`
  }
};

const CSS_RULES: Record<string, RuleSpec> = {
  "universal-selector": {
    label: "universal selector (*) used",
    expr: `/\\*\\s*\\{/.test(code)`
  },
  "margin-reset": {
    label: "margin reset to 0",
    expr: `/margin\\s*:\\s*0/.test(code)`
  },
  "padding-reset": {
    label: "padding reset to 0",
    expr: `/padding\\s*:\\s*0/.test(code)`
  },
  "box-sizing": {
    label: "box-sizing: border-box applied globally",
    expr: `/box-sizing\\s*:\\s*border-box/.test(code)`
  },
  "root-block": {
    label: ":root block declared",
    expr: `/:root\\s*\\{/.test(code)`
  },
  "min-3-vars": {
    label: "at least 3 CSS custom properties defined",
    expr: `(code.match(/--[\\w-]+\\s*:/g) || []).length >= 3`
  },
  "min-5-vars": {
    label: "at least 5 CSS custom properties defined",
    expr: `(code.match(/--[\\w-]+\\s*:/g) || []).length >= 5`
  },
  "var-usage": {
    label: "var() function used",
    expr: `/var\\(--/.test(code)`
  },
  "display-flex": {
    label: "display: flex used",
    expr: `/display\\s*:\\s*flex/.test(code)`
  },
  "display-grid": {
    label: "display: grid used",
    expr: `/display\\s*:\\s*grid/.test(code)`
  },
  "grid-template-cols": {
    label: "grid-template-columns defined",
    expr: `/grid-template-columns\\s*:/.test(code)`
  },
  "gap-property": {
    label: "gap property used for spacing",
    expr: `/\\bgap\\s*:/.test(code)`
  },
  "media-600": {
    label: "min-width: 600px media query present",
    expr: `/@media[^{]*min-width\\s*:\\s*600px/.test(code)`
  },
  "media-1024": {
    label: "min-width: 1024px media query present",
    expr: `/@media[^{]*min-width\\s*:\\s*1024px/.test(code)`
  },
  "no-max-width": {
    label: "no max-width queries used (mobile-first)",
    expr: `!/@media[^{]*max-width/.test(code)`
  },
  "media-600-content": {
    label: "600px media query contains CSS rules",
    expr: `(function(){ var m=code.match(/@media[^{]*min-width\\s*:\\s*600px[^{]*\\{([\\s\\S]*?)\\}/); return !!(m && m[1] && m[1].replace(/\\/\\*[\\s\\S]*?\\*\\//g,'').trim().length>0); })()`
  },
  "media-1024-content": {
    label: "1024px media query contains CSS rules",
    expr: `(function(){ var m=code.match(/@media[^{]*min-width\\s*:\\s*1024px[^{]*\\{([\\s\\S]*?)\\}/); return !!(m && m[1] && m[1].replace(/\\/\\*[\\s\\S]*?\\*\\//g,'').trim().length>0); })()`
  }
};

function buildHtmlValidationHarness(userCode: string, rules: string[]): string {
  const b64 = Buffer.from(userCode, "utf-8").toString("base64");
  const checks = rules
    .map((r) => {
      const rule = HTML_RULES[r];
      if (!rule) return `check(${JSON.stringify("Unknown rule: " + r)}, false);`;
      return `check(${JSON.stringify(rule.label)}, ${rule.expr});`;
    })
    .join("\n");

  return `var code = Buffer.from(${JSON.stringify(b64)}, "base64").toString("utf-8");
var results = [];
function check(name, passed) {
  results.push({ name: name, passed: Boolean(passed) });
}

${checks}

var allPassed = results.every(function(r) { return r.passed; });
process.stdout.write(JSON.stringify({ allPassed: allPassed, tests: results }) + "\\n");
`;
}

function buildCssValidationHarness(userCode: string, rules: string[]): string {
  const b64 = Buffer.from(userCode, "utf-8").toString("base64");
  const checks = rules
    .map((r) => {
      const rule = CSS_RULES[r];
      if (!rule) return `check(${JSON.stringify("Unknown rule: " + r)}, false);`;
      return `check(${JSON.stringify(rule.label)}, ${rule.expr});`;
    })
    .join("\n");

  return `var code = Buffer.from(${JSON.stringify(b64)}, "base64").toString("utf-8");
var results = [];
function check(name, passed) {
  results.push({ name: name, passed: Boolean(passed) });
}

${checks}

var allPassed = results.every(function(r) { return r.passed; });
process.stdout.write(JSON.stringify({ allPassed: allPassed, tests: results }) + "\\n");
`;
}

// ---------------------------------------------------------------------------
// Function harnesses (legacy — kept for backwards compatibility)
// ---------------------------------------------------------------------------

export function buildLegacy142Harness(userCode: string): string {
  return `${userCode}

import sys
import traceback
import json

results = []

def _record(name: str, passed: bool, expected=None, got=None):
    item = { "name": name, "passed": bool(passed) }
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

def _assert_eq(label: str, got, expected):
    ok = got == expected
    _record(label, ok, expected=expected, got=got)
    return ok

try:
    sum_fn = globals().get("sum")
    sub_fn = globals().get("subtract")
    if not callable(sum_fn):
        _record("sum exists", False, expected="callable sum(a, b)", got=sum_fn)
        raise RuntimeError("Function sum(a, b) is missing or not callable.")
    if not callable(sub_fn):
        _record("subtract exists", False, expected="callable subtract(a, b)", got=sub_fn)
        raise RuntimeError("Function subtract(a, b) is missing or not callable.")

    _assert_eq("sum #1", sum_fn(1, 2), 3)
    _assert_eq("sum #2", sum_fn(0, 0), 0)
    _assert_eq("sum #3", sum_fn(-1, 5), 4)
    _assert_eq("sum #4", sum_fn(-10, -7), -17)
    _assert_eq("sum #5", sum_fn(123, 456), 579)

    _assert_eq("subtract #1", sub_fn(5, 2), 3)
    _assert_eq("subtract #2", sub_fn(0, 0), 0)
    _assert_eq("subtract #3", sub_fn(-1, 5), -6)
    _assert_eq("subtract #4", sub_fn(-10, -7), -3)
    _assert_eq("subtract #5", sub_fn(123, 456), -333)

    all_passed = all(r.get("passed") for r in results)
    print(json.dumps({ "allPassed": all_passed, "tests": results }))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

function buildGenericFunctionHarness(
  userCode: string,
  specs: FunctionTestSpec[]
): string {
  const b64 = Buffer.from(JSON.stringify(specs), "utf8").toString("base64");
  return `${userCode}

import base64
import json
import traceback
import sys

results = []

def _record(name, passed, expected=None, got=None):
    item = {"name": name, "passed": bool(passed)}
    if expected is not None:
        item["expected"] = repr(expected)
    if got is not None:
        item["got"] = repr(got)
    results.append(item)

SPECS = json.loads(base64.b64decode("${b64}").decode("utf-8"))

try:
    for spec in SPECS:
        fname = spec["functionName"]
        fn = globals().get(fname)
        if not callable(fn):
            _record(fname + " exists", False, expected="callable", got=fn)
            raise RuntimeError("Missing function: " + fname)
        for i, case in enumerate(spec["cases"]):
            label = fname + " #" + str(i + 1)
            exp = case["expected"]
            if "kwargs" in case and case["kwargs"] is not None:
                got = fn(**case["kwargs"])
            else:
                args = case.get("args") or []
                got = fn(*args)
            ok = got == exp
            _record(label, ok, expected=exp, got=got)
    all_passed = all(r["passed"] for r in results)
    print(json.dumps({"allPassed": all_passed, "tests": results}))
except Exception:
    traceback.print_exc()
    sys.exit(0)
`;
}

const CUSTOM_FUNCTION_HARNESS: Record<string, (code: string) => string> = {
  "14-2": buildLegacy142Harness
};
