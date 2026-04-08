import { NextResponse } from "next/server";
import {
  buildProgram,
  isCorrect
} from "@/lib/challenges/grader";
import { getChallenge } from "@/lib/challenges/catalog";
import type { ChallengeId } from "@/lib/challenges/types";
import type { ChallengeTestCase } from "@/lib/challenges/types";

/** Upper bound for the blocking Piston `/execute` request (ms). */
const PISTON_EXECUTE_TIMEOUT_MS = 120_000;

/** Vercel / long-running route budget (seconds); keep >= PISTON_EXECUTE_TIMEOUT_MS. */
export const maxDuration = 120;

type ExecutionStatus = { id: number; description?: string };

type FunctionsStdoutJson = {
  allPassed: boolean;
  tests: Array<{
    name: string;
    passed: boolean;
    expected?: string;
    got?: string;
  }>;
};

function isAbortOrTimeoutError(e: unknown): boolean {
  if (!(e instanceof Error)) return false;
  return e.name === "AbortError" || e.name === "TimeoutError";
}

type PistonRuntime = {
  language?: unknown;
  version?: unknown;
  aliases?: unknown;
  runtime?: unknown;
};

type PistonExecuteRequest = {
  language: string;
  version: string;
  files: Array<{ name: string; content: string }>;
  stdin?: string;
  args?: string[];
  compile_timeout?: number;
  run_timeout?: number;
  compile_memory_limit?: number;
  run_memory_limit?: number;
};

type PistonExecuteResult = {
  language?: string;
  version?: string;
  run?: { stdout?: string; stderr?: string; output?: string; code?: number | null; signal?: string | null };
  compile?: { stdout?: string; stderr?: string; output?: string; code?: number | null; signal?: string | null };
  message?: string;
};

function toPistonRoot(pistonBaseUrl: string): string {
  return pistonBaseUrl.endsWith("/") ? pistonBaseUrl : `${pistonBaseUrl}/`;
}

function parseSemverMajor(version: string): number | null {
  const m = version.trim().match(/^v?(\d+)(?:\.\d+)?(?:\.\d+)?/i);
  if (!m) return null;
  const major = parseInt(m[1] ?? "", 10);
  return Number.isFinite(major) ? major : null;
}

function cmpSemverDesc(a: string, b: string): number {
  const pa = a.replace(/^v/i, "").split(".").map((x) => parseInt(x, 10));
  const pb = b.replace(/^v/i, "").split(".").map((x) => parseInt(x, 10));
  for (let i = 0; i < 3; i++) {
    const da = Number.isFinite(pa[i]) ? (pa[i] as number) : 0;
    const db = Number.isFinite(pb[i]) ? (pb[i] as number) : 0;
    if (da !== db) return db - da;
  }
  return 0;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((x) => (typeof x === "string" ? x : "")).filter(Boolean);
}

function asRuntimeList(data: unknown): Array<{ language: string; version: string; aliases: string[]; runtime: string }> {
  if (!Array.isArray(data)) return [];
  const out: Array<{ language: string; version: string; aliases: string[]; runtime: string }> = [];
  for (const item of data as PistonRuntime[]) {
    const language = typeof item?.language === "string" ? item.language : "";
    const version = typeof item?.version === "string" ? item.version : "";
    const runtime = typeof item?.runtime === "string" ? item.runtime : "";
    const aliases = asStringArray(item?.aliases);
    if (!language || !version) continue;
    out.push({ language, version, aliases, runtime });
  }
  return out;
}

let cachedRuntimes: Array<{ language: string; version: string; aliases: string[]; runtime: string }> | null = null;
let cachedRuntimesAtMs = 0;

async function fetchPistonRuntimes(pistonRoot: string): Promise<Array<{ language: string; version: string; aliases: string[]; runtime: string }>> {
  const now = Date.now();
  if (cachedRuntimes && now - cachedRuntimesAtMs < 30_000) return cachedRuntimes;

  const url = new URL("api/v2/runtimes", pistonRoot);
  const res = await fetch(url.toString(), { signal: AbortSignal.timeout(7_000) });
  if (!res.ok) throw new Error(`Failed to fetch Piston runtimes (${res.status}).`);
  const json = (await res.json()) as unknown;
  const list = asRuntimeList(json);
  cachedRuntimes = list;
  cachedRuntimesAtMs = now;
  return list;
}

function pickRuntimeVersion(
  runtimes: Array<{ language: string; version: string; aliases: string[]; runtime: string }>,
  wantedLanguage: "javascript" | "php",
  wantedMajor?: number
): { language: string; version: string } | null {
  const matches = runtimes
    .filter((r) => r.language === wantedLanguage || r.aliases.includes(wantedLanguage))
    .filter((r) => (typeof wantedMajor === "number" ? parseSemverMajor(r.version) === wantedMajor : true))
    .sort((a, b) => cmpSemverDesc(a.version, b.version));
  const best = matches[0];
  return best ? { language: best.language, version: best.version } : null;
}

export async function POST(req: Request) {
  const pistonBaseUrl = process.env.PISTON_API_URL;
  if (!pistonBaseUrl) {
    return NextResponse.json(
      { error: "PISTON_API_URL is not configured on the server." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const code = (body as { code?: unknown })?.code;
  const challengeIdRaw = (body as { challengeId?: unknown })?.challengeId;
  const challengeId = String(challengeIdRaw ?? "") as ChallengeId;

  if (typeof code !== "string" || code.trim().length === 0) {
    return NextResponse.json({ error: "Missing code." }, { status: 400 });
  }

  const challenge = getChallenge(challengeId);
  if (!challenge) {
    return NextResponse.json({ error: "Unknown challenge." }, { status: 400 });
  }

  if (challenge.kind === "mcq") {
    return NextResponse.json(
      { error: "This challenge is not executed on the server." },
      { status: 400 }
    );
  }

  if (challenge.kind !== "html" && challenge.kind !== "css") {
    return NextResponse.json(
      { error: "Unsupported challenge kind." },
      { status: 400 }
    );
  }

  const program = buildProgram(challenge, code);

  const pistonRoot = toPistonRoot(pistonBaseUrl);

  let runtimes: Array<{ language: string; version: string; aliases: string[]; runtime: string }>;
  try {
    runtimes = await fetchPistonRuntimes(pistonRoot);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to query Piston runtimes.", details: e instanceof Error ? e.message : String(e) },
      { status: 502 }
    );
  }

  // Prefer Node 24 if available, but gracefully fall back to latest JS runtime.
  const node = pickRuntimeVersion(runtimes, "javascript", 24) ?? pickRuntimeVersion(runtimes, "javascript");

  if (!node) {
    return NextResponse.json(
      { error: "Piston does not provide any JavaScript runtime." },
      { status: 500 }
    );
  }

  const executeUrl = new URL("api/v2/execute", pistonRoot);

  let execRes: Response;
  try {
    const payload: PistonExecuteRequest = {
      language: node.language,
      version: node.version,
      files: [{ name: "main.js", content: program }],
      stdin: "",
      args: []
    };

    execRes = await fetch(executeUrl.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(PISTON_EXECUTE_TIMEOUT_MS),
      body: JSON.stringify(payload)
    });
  } catch (e) {
    if (isAbortOrTimeoutError(e)) {
      return NextResponse.json(
        { error: "Code execution timed out." },
        { status: 504 }
      );
    }
    throw e;
  }

  if (!execRes.ok) {
    const text = await execRes.text().catch(() => "");
    return NextResponse.json(
      { error: "Failed to execute on Piston.", details: text },
      { status: 502 }
    );
  }

  const result = (await execRes.json()) as PistonExecuteResult;

  const compileOutput = String(result?.compile?.output ?? "");
  const runOutput = String(result?.run?.output ?? "");
  const stdout = String(result?.run?.stdout ?? "");
  const stderr = String(result?.run?.stderr ?? "") || String(result?.compile?.stderr ?? "") || compileOutput;

  const exitCode = typeof result?.run?.code === "number" ? result.run.code : null;
  const status: ExecutionStatus =
    exitCode === 0
      ? { id: 0, description: "OK" }
      : { id: exitCode ?? 1, description: result?.message ? String(result.message) : "Non-zero exit" };

  let tests: ChallengeTestCase[] | undefined;
  let correct = isCorrect(challenge, stdout);

  // HTML / CSS challenges return structured JSON from the Node.js harness
  const isStructuredKind = challenge.kind === "html" || challenge.kind === "css";

  if (isStructuredKind && !stderr.trim()) {
    try {
      const parsed = JSON.parse(stdout.trim()) as FunctionsStdoutJson;
      if (typeof parsed?.allPassed === "boolean" && Array.isArray(parsed?.tests)) {
        tests = parsed.tests.map((t) => ({
          name: String(t.name),
          passed: Boolean(t.passed),
          expected: typeof t.expected === "string" ? t.expected : undefined,
          got: typeof t.got === "string" ? t.got : undefined
        }));
        correct = parsed.allPassed && tests.every((t) => t.passed);
      }
    } catch {
      // keep string-based correctness
    }
  }

  const stdoutForClient =
    isStructuredKind && tests && tests.length > 0 ? "" : stdout;

  return NextResponse.json({
    stdout: stdoutForClient,
    stderr: stderr || (exitCode === 0 ? "" : runOutput),
    status,
    correct,
    tests
  });
}
