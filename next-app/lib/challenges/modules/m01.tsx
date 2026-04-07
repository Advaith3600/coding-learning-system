import type { ModuleDefinition } from "../types";
import type { ReactNode } from "react";

export const MODULE_1: ModuleDefinition = {
  id: 1,
  title: "HTML5 Foundations",
  description:
    "Build the structural and semantic foundation of every professional web page. These 10 tasks cover the HTML5 boilerplate, semantic elements, heading hierarchy, CSS organisation, Flexbox, Grid, responsive design, accessible forms, and code review.",

  challenges: [
    // -----------------------------------------------------------------------
    // Task 1 — HTML5 Boilerplate
    // -----------------------------------------------------------------------
    {
      id: "1-1",
      moduleId: 1,
      badge: "Task 1",
      title: "Write Your HTML5 Boilerplate",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            Every HTML5 page must begin with the correct structural skeleton. Write a complete HTML5
            boilerplate that includes all six required elements:{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<!DOCTYPE html>"}
            </code>
            , an{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<html>"}
            </code>{" "}
            element with a{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              lang
            </code>{" "}
            attribute,{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<meta charset>"}
            </code>
            ,{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<meta viewport>"}
            </code>
            , a{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<title>"}
            </code>
            , and a{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<body>"}
            </code>
            .
          </p>
          <p className="text-sm text-muted">
            <strong className="text-fg">Background:</strong> Without{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              DOCTYPE
            </code>{" "}
            browsers enter quirks mode. The{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              lang
            </code>{" "}
            attribute lets screen readers use the correct language. The viewport meta tag is the
            single most important line for mobile rendering.
          </p>
        </div>
      ) as ReactNode,
      competences: ["HTML5 structure", "Document skeleton", "Meta tags", "Accessibility"],
      kind: "html",
      initialCode: `<!-- Write your complete HTML5 boilerplate below.
     Include all required elements. -->
`,
      expected: "__html:doctype,lang,charset,viewport,title-tag,body-tag__",
      helperText: "All 6 required elements must be present.",
      successText: "Correct — your HTML5 boilerplate is complete and valid."
    },

    // -----------------------------------------------------------------------
    // Task 2 — Semantic HTML Structure
    // -----------------------------------------------------------------------
    {
      id: "1-2",
      moduleId: 1,
      badge: "Task 2",
      title: "Replace Divs with Semantic Elements",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            The starter code uses generic{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<div>"}
            </code>{" "}
            elements throughout. Replace each div with the correct semantic HTML5 element:{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<header>"}
            </code>
            ,{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<nav>"}
            </code>
            ,{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<main>"}
            </code>
            ,{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<section>"}
            </code>
            ,{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<article>"}
            </code>
            , and{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<footer>"}
            </code>
            .
          </p>
          <p className="text-sm text-muted">
            <strong className="text-fg">Background:</strong> Semantic elements tell browsers and
            screen readers what each region means. Google uses them to understand page structure.
            Screen reader users navigate by landmark regions — a page full of divs forces them to
            listen to everything from top to bottom.
          </p>
        </div>
      ) as ReactNode,
      competences: ["Semantic HTML5", "Landmark regions", "Accessibility", "SEO"],
      kind: "html",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NovaBuild Portfolio</title>
</head>
<body>

  <div id="site-header">
    <div id="site-nav">
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Contact</a>
    </div>
  </div>

  <div id="main-content">
    <div id="about-section">
      <div class="about-post">
        <p>We are a web design studio based in the UAE.</p>
      </div>
    </div>

    <div id="services-section">
      <p>We offer web design, development, and branding.</p>
    </div>
  </div>

  <div id="site-footer">
    <p>&copy; 2026 NovaBuild Web Studio</p>
  </div>

</body>
</html>
`,
      expected: "__html:header-tag,nav-tag,main-tag,footer-tag,section-tag,article-tag__",
      helperText: "Replace every structural div with its semantic equivalent.",
      successText: "Correct — all six semantic landmark elements are present."
    },

    // -----------------------------------------------------------------------
    // Task 3 — Heading Hierarchy
    // -----------------------------------------------------------------------
    {
      id: "1-3",
      moduleId: 1,
      badge: "Task 3",
      title: "Fix the Broken Heading Hierarchy",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            The page below has a broken heading structure — it skips levels and uses headings in the
            wrong order. Fix it so the hierarchy is logical and unbroken: exactly one{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<h1>"}
            </code>{" "}
            at the top, then{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<h2>"}
            </code>{" "}
            for major sections, then{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<h3>"}
            </code>{" "}
            only within sections that already have an h2.
          </p>
          <p className="text-sm text-muted">
            <strong className="text-fg">Rule:</strong> Never skip heading levels. Jumping from h1
            to h3 creates a gap that screen reader users cannot navigate. Headings describe
            document structure — not visual size. Use CSS for sizing.
          </p>
        </div>
      ) as ReactNode,
      competences: ["Heading hierarchy", "Document outline", "Accessibility", "Screen readers"],
      kind: "html",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NovaBuild Services</title>
</head>
<body>
  <header>
    <!-- BUG: Two h1 elements — only one allowed per page -->
    <h1>NovaBuild Web Studio</h1>
  </header>

  <main>
    <section>
      <!-- BUG: Skipped h2, jumped straight to h3 -->
      <h3>Our Services</h3>
      <h3>Web Design</h3>
      <h3>Development</h3>
    </section>

    <section>
      <!-- BUG: Another h1 when this should be h2 -->
      <h1>Our Portfolio</h1>
      <!-- BUG: h3 before any h2 exists in this section -->
      <h3>Recent Projects</h3>
      <h3>Case Studies</h3>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 NovaBuild</p>
  </footer>
</body>
</html>
`,
      expected: "__html:one-h1,h2-present,no-h3-before-h2__",
      helperText: "Fix heading levels so there is exactly one h1 and h3 never comes before h2.",
      successText: "Correct — heading hierarchy is logical and unbroken."
    },

    // -----------------------------------------------------------------------
    // Task 4 — CSS Reset & Organisation
    // -----------------------------------------------------------------------
    {
      id: "1-4",
      moduleId: 1,
      badge: "Task 4",
      title: "Write a Universal CSS Reset",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            Different browsers apply different default margins, padding, and font sizes. A CSS reset
            removes these inconsistencies so every browser starts from the same baseline. Write a
            universal reset using the{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              *
            </code>{" "}
            selector that: removes all margin, removes all padding, and sets{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              box-sizing
            </code>{" "}
            to{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              border-box
            </code>{" "}
            for all elements.
          </p>
          <p className="text-sm text-muted">
            <strong className="text-fg">Why border-box?</strong> It makes width and height include
            padding and border, so a{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              width: 100px
            </code>{" "}
            element is always exactly 100px wide regardless of its padding.
          </p>
        </div>
      ) as ReactNode,
      competences: ["CSS reset", "box-sizing", "Cross-browser", "CSS organisation"],
      kind: "css",
      initialCode: `/* Write your universal CSS reset here.
   Use the * selector to target all elements.
   Set: margin, padding, and box-sizing. */
`,
      expected: "__css:universal-selector,margin-reset,padding-reset,box-sizing__",
      helperText: "Use the * selector to reset margin, padding, and box-sizing.",
      successText: "Correct — your universal CSS reset is complete.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Reset Preview</title>
<style>
{{CSS}}
/* Demo styles applied after your reset */
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; padding: 24px; }
.demo-box { background: #e2e8f0; padding: 16px; margin-bottom: 12px; border: 2px solid #94a3b8; }
</style>
</head>
<body>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <p>A paragraph. With your reset applied, margin and padding are removed from all elements.</p>
  <ul>
    <li>List item 1 — default bullet removed by reset</li>
    <li>List item 2</li>
  </ul>
  <div class="demo-box">div with padding: 16px — always exactly 100% wide with border-box</div>
  <button>A Button</button>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 5 — CSS Custom Properties
    // -----------------------------------------------------------------------
    {
      id: "1-5",
      moduleId: 1,
      badge: "Task 5",
      title: "Define CSS Custom Properties",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            CSS custom properties (variables) store values in one place so changes propagate
            everywhere instantly. Declare at least 5 custom properties in a{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              :root
            </code>{" "}
            block, then use them with{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              var()
            </code>{" "}
            in at least one rule. Replace all hardcoded colour values in the starter code.
          </p>
          <p className="text-sm text-muted">
            <strong className="text-fg">Example:</strong>{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              :root {"{"} --primary: #2563eb; {"}"}
            </code>{" "}
            then{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              background: var(--primary);
            </code>
          </p>
        </div>
      ) as ReactNode,
      competences: ["CSS variables", "Design tokens", "Maintainability", ":root scope"],
      kind: "css",
      initialCode: `/* Replace the hardcoded values below with CSS custom properties.
   1. Add a :root block with at least 5 variables (colours, font, spacing, radius).
   2. Use var(--variable-name) everywhere a hardcoded value currently appears.   */

body {
  font-family: system-ui, sans-serif;
  background-color: #0d1117;
  color: #f0f6fc;
  font-size: 16px;
}

.card {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 24px;
}

.btn {
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 16px;
}

.btn:hover {
  background-color: #1d4ed8;
}
`,
      expected: "__css:root-block,min-5-vars,var-usage__",
      helperText: "Add a :root block with 5+ variables, then replace all hardcoded values with var().",
      successText: "Correct — CSS custom properties defined and used.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Variables Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
{{CSS}}
</style>
</head>
<body style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
  <div class="card">
    <h2 style="margin-bottom:12px;">NovaBuild Card</h2>
    <p>This card uses your custom property values for background, border, and radius.</p>
  </div>
  <div>
    <button class="btn">Primary Button</button>
  </div>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 6 — Flexbox Navigation Bar
    // -----------------------------------------------------------------------
    {
      id: "1-6",
      moduleId: 1,
      badge: "Task 6",
      title: "Build a Flexbox Navigation Bar",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            Add CSS to the{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<style>"}
            </code>{" "}
            block to build a horizontal navigation bar using Flexbox. Requirements: apply{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              display: flex
            </code>{" "}
            to the{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              nav
            </code>
            , use{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              justify-content
            </code>{" "}
            to space items, and remove the default list bullet with{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              list-style: none
            </code>
            .
          </p>
          <p className="text-sm text-muted">
            <strong className="text-fg">Tip:</strong> The brand name goes left and the links go
            right.{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              justify-content: space-between
            </code>{" "}
            achieves this in one property.
          </p>
        </div>
      ) as ReactNode,
      competences: ["Flexbox", "Navigation layout", "justify-content", "list-style"],
      kind: "html",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NovaBuild Navigation</title>
  <style>
    /* Add your Flexbox nav styles here.
       Requirements:
       - display: flex on the nav element
       - justify-content to space brand + links
       - list-style: none on the ul
       - horizontal layout for nav links        */

    body {
      font-family: system-ui, sans-serif;
      background: #0d1117;
      color: #f0f6fc;
      margin: 0;
    }

    nav {
      background: #161b22;
      padding: 0 24px;
      height: 60px;
      border-bottom: 1px solid #30363d;
      /* Add display: flex and alignment here */
    }

    /* Style the ul and li here */

    /* Style the links here */

  </style>
</head>
<body>
  <nav>
    <span class="brand">NovaBuild</span>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Portfolio</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
</body>
</html>
`,
      expected: "__html:display-flex,justify-content,list-style-none__",
      helperText: "Add display:flex, justify-content, and list-style:none to the CSS.",
      successText: "Correct — Flexbox navigation bar complete."
    },

    // -----------------------------------------------------------------------
    // Task 7 — CSS Grid
    // -----------------------------------------------------------------------
    {
      id: "1-7",
      moduleId: 1,
      badge: "Task 7",
      title: "Create a Responsive CSS Grid",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            Write CSS for the{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              .features-grid
            </code>{" "}
            container using CSS Grid. The grid must be responsive: 1 column on mobile (default), 2
            columns at 600 px, and 3 columns at 1024 px. Use{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              repeat()
            </code>{" "}
            with{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              fr
            </code>{" "}
            units, and control spacing with{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              gap
            </code>
            .
          </p>
          <p className="text-sm text-muted">
            <strong className="text-fg">Key properties:</strong>{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              display: grid
            </code>
            ,{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              grid-template-columns: repeat(2, 1fr)
            </code>
            ,{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              gap: 24px
            </code>
            , and two{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              min-width
            </code>{" "}
            media queries.
          </p>
        </div>
      ) as ReactNode,
      competences: ["CSS Grid", "grid-template-columns", "fr units", "Responsive media queries"],
      kind: "css",
      initialCode: `/* Write CSS Grid styles for .features-grid.
   Mobile-first: start with 1 column, then 2 at 600px, then 3 at 1024px.

   Required properties:
   - display: grid
   - grid-template-columns (using repeat and fr)
   - gap
   - Two min-width media queries (600px and 1024px)  */

.features-grid {
  /* Add grid styles here */
}

/* 600px breakpoint */

/* 1024px breakpoint */
`,
      expected: "__css:display-grid,grid-template-cols,gap-property,media-600,media-1024__",
      helperText: "Use display:grid, grid-template-columns, gap, and two min-width media queries.",
      successText: "Correct — responsive CSS Grid layout complete.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Grid Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0d1117; color: #f0f6fc; padding: 24px; }
article { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 20px; }
article h3 { color: #93c5fd; margin-bottom: 8px; }
article p { color: #8b949e; font-size: 14px; line-height: 1.5; }
{{CSS}}
</style>
</head>
<body>
  <section>
    <div class="features-grid">
      <article><h3>HTML5 Semantics</h3><p>Use meaningful elements that describe content structure.</p></article>
      <article><h3>CSS Grid</h3><p>Two-dimensional layout for complex page structures.</p></article>
      <article><h3>Flexbox</h3><p>One-dimensional layouts for navigation and card rows.</p></article>
      <article><h3>Media Queries</h3><p>Adapt your layout to any screen size.</p></article>
      <article><h3>CSS Variables</h3><p>Store and reuse design tokens across your stylesheet.</p></article>
      <article><h3>Accessibility</h3><p>Make your pages usable by everyone.</p></article>
    </div>
  </section>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 8 — Mobile-First Media Queries
    // -----------------------------------------------------------------------
    {
      id: "1-8",
      moduleId: 1,
      badge: "Task 8",
      title: "Write Mobile-First Media Queries",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            Fill in the two{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              min-width
            </code>{" "}
            media query blocks so the layout is truly mobile-first. The base styles (single column,
            small font) are already written for mobile. Add tablet styles at 600 px and desktop
            styles at 1024 px. Do{" "}
            <strong className="text-fg">not</strong> add any{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              max-width
            </code>{" "}
            queries — mobile-first only uses{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              min-width
            </code>
            .
          </p>
          <p className="text-sm text-muted">
            <strong className="text-fg">Why min-width?</strong> Mobile-first sends the simplest CSS
            to small screens. Larger screens progressively receive enhancement via min-width queries,
            instead of downloading desktop styles and then overriding them.
          </p>
        </div>
      ) as ReactNode,
      competences: ["Mobile-first", "min-width queries", "Responsive typography", "Progressive enhancement"],
      kind: "css",
      initialCode: `/* Mobile-first CSS — base styles target the smallest screen.
   Fill in the two media query blocks below.
   Do NOT use max-width queries. */

/* === BASE STYLES (mobile — no media query) === */
body {
  font-family: system-ui, sans-serif;
  font-size: 14px;
  padding: 16px;
  background: #0d1117;
  color: #f0f6fc;
}

.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

h1 { font-size: 22px; margin-bottom: 16px; }
h2 { font-size: 16px; margin-bottom: 8px; }

/* === TABLET: 600px and up — add 2-column grid and larger text === */
@media (min-width: 600px) {
  /* Add styles here */
}

/* === DESKTOP: 1024px and up — add 3-column grid and larger text === */
@media (min-width: 1024px) {
  /* Add styles here */
}
`,
      expected: "__css:media-600,media-1024,no-max-width,media-600-content,media-1024-content__",
      helperText: "Add actual CSS rules inside both min-width query blocks. No max-width queries.",
      successText: "Correct — mobile-first responsive CSS complete.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Media Query Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
.card { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 20px; }
.card h2 { color: #93c5fd; margin-bottom: 8px; }
.card p { color: #8b949e; font-size: 0.875em; }
{{CSS}}
</style>
</head>
<body>
  <h1>NovaBuild Web Studio</h1>
  <div class="cards">
    <div class="card"><h2>HTML5</h2><p>Semantic structure for accessible pages.</p></div>
    <div class="card"><h2>CSS Grid</h2><p>Two-dimensional responsive layouts.</p></div>
    <div class="card"><h2>Flexbox</h2><p>One-dimensional alignment control.</p></div>
    <div class="card"><h2>Media Queries</h2><p>Adapt to any viewport size.</p></div>
    <div class="card"><h2>Variables</h2><p>Reusable design tokens.</p></div>
    <div class="card"><h2>Forms</h2><p>Accessible input elements.</p></div>
  </div>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 9 — Accessible HTML Forms
    // -----------------------------------------------------------------------
    {
      id: "1-9",
      moduleId: 1,
      badge: "Task 9",
      title: "Build an Accessible HTML Form",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            Complete the contact form so it is fully accessible. Requirements: the{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<form>"}
            </code>{" "}
            must have an{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              aria-label
            </code>
            ; every input must have a{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              {"<label>"}
            </code>{" "}
            with a{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              for
            </code>{" "}
            attribute matching the input{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              id
            </code>
            ; at least one field must use{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              required
            </code>
            ; the email field must use{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              type="email"
            </code>
            ; and one field must have{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              aria-describedby
            </code>{" "}
            linked to a helper paragraph.
          </p>
          <p className="text-sm text-muted">
            <strong className="text-fg">Why labels matter:</strong> Screen readers read the label
            aloud when a user focuses a field. Without a linked label, a blind user hears "Edit
            field" with no context. The{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              for
            </code>{" "}
            value must exactly match the input{" "}
            <code className="rounded border border-border bg-bg px-1 py-0.5 font-mono text-sm text-fg">
              id
            </code>
            .
          </p>
        </div>
      ) as ReactNode,
      competences: ["Form accessibility", "aria-label", "aria-describedby", "label/for/id pattern", "required"],
      kind: "html",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form</title>
</head>
<body>
  <main>
    <h1>Get In Touch</h1>

    <!-- Add aria-label to the form element -->
    <form>

      <!-- Full name field: add label with for="full-name", input with id="full-name", required -->
      <div>

      </div>

      <!-- Email field: add label, input type="email" with id="email", required
           and aria-describedby="email-hint" -->
      <div>

        <!-- Helper text linked via aria-describedby — give it id="email-hint" -->

      </div>

      <!-- Project description: add label with for="description",
           textarea with id="description", required -->
      <div>

      </div>

      <button type="submit">Send Enquiry</button>

    </form>
  </main>
</body>
</html>
`,
      expected: "__html:form-aria-label,label-for,input-with-id,required-attr,aria-describedby,email-type__",
      helperText: "Add aria-label to form, linked labels, required fields, email type, and aria-describedby.",
      successText: "Correct — your form meets all accessibility requirements."
    },

    // -----------------------------------------------------------------------
    // Task 10 — Full Review MCQ
    // -----------------------------------------------------------------------
    {
      id: "1-10",
      moduleId: 1,
      badge: "Task 10",
      title: "Web Technologies Knowledge Check",
      instruction: (
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-muted">
            Having completed all nine coding tasks, test your understanding with this knowledge
            check. Select the correct answer and submit.
          </p>
        </div>
      ) as ReactNode,
      competences: ["HTML5", "CSS", "Accessibility", "Responsive design", "Semantic elements"],
      kind: "mcq",
      initialCode: "",
      snippet: `A developer writes the following CSS:

  body { font-size: 16px; }
  .grid { grid-template-columns: repeat(3, 1fr); }

  @media (max-width: 768px) {
    .grid { grid-template-columns: 1fr; }
  }

This CSS is desktop-first. Which statement correctly describes
why mobile-first is preferred in professional development?`,
      options: [
        "Desktop-first is actually preferred — it uses fewer media queries",
        "Mobile-first is preferred because mobile browsers download the base CSS first, then receive enhancements via min-width queries — never having to override styles",
        "Mobile-first only works in Chrome and Safari",
        "The difference is only stylistic — both approaches produce identical performance"
      ],
      correctOption:
        "Mobile-first is preferred because mobile browsers download the base CSS first, then receive enhancements via min-width queries — never having to override styles",
      helperText: "Think about which device receives the simplest stylesheet in each approach.",
      successText:
        "Correct — mobile-first sends the lightest CSS to the devices that need it most. You are ready for the CU01 assessment."
    }
  ]
};
