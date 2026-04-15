import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_2: ModuleDefinition = {
  id: 2,
  title: "CSS Components & Animations",
  description:
    "Build a reusable front-end component library for NovaBuild Web Studio. These 9 tasks cover CSS button variants, card and badge components, hover/focus/active states, sticky headers, dropdown menus, transitions, keyframe animations, and a utility class system.",

  challenges: [
    // -----------------------------------------------------------------------
    // Task 1 — Button Component Variants  (LO6)
    // -----------------------------------------------------------------------
    {
      id: "2-1",
      moduleId: 2,
      badge: "Task 1",
      title: "Button Component Variants",
      instruction: instructionBlock({
        goal: `NovaBuild developers are rebuilding buttons from scratch on every project. Your job is to create a reusable button component system. Define a .btn base class that sets padding, border-radius, font-weight, cursor, border, and a transition. Then define four variant classes: .btn-primary (blue background), .btn-secondary (grey background), .btn-danger (red background), and .btn-ghost (transparent with a visible border). All four variants must share the .btn base class for common styles.`
      }),
      competences: ["CSS components", "BEM naming", "Reusable classes", "Variant system"],
      kind: "css",
      initialCode: `/* NovaBuild Component Library — Buttons
   Define a .btn base class and four variant classes.
   Each variant only needs to set what differs from the base. */

/* Base button — shared by all variants */
.btn {
  /* padding, border-radius, font-weight, cursor, border, transition */
}

/* Primary — call-to-action (blue) */
.btn-primary {

}

/* Secondary — alternative action (grey) */
.btn-secondary {

}

/* Danger — destructive action (red) */
.btn-danger {

}

/* Ghost — subtle action (transparent, visible border) */
.btn-ghost {

}
`,
      expected: "__css:btn-class,btn-primary,btn-secondary,btn-danger,btn-ghost__",
      helperText: "Define .btn, .btn-primary, .btn-secondary, .btn-danger, and .btn-ghost — each as a separate class block.",
      successText: "Correct — all five button classes are defined. The component system is reusable across any NovaBuild project.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Button Components</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0d1117; color: #f0f6fc; padding: 32px; }
h2 { color: #8b949e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
.row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
{{CSS}}
</style>
</head>
<body>
  <h2>Button Variants</h2>
  <div class="row">
    <button class="btn btn-primary">Primary</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-danger">Danger</button>
    <button class="btn btn-ghost">Ghost</button>
  </div>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 2 — Card and Badge Components  (LO6)
    // -----------------------------------------------------------------------
    {
      id: "2-2",
      moduleId: 2,
      badge: "Task 2",
      title: "Card and Badge Components",
      instruction: instructionBlock({
        goal: `Extend the NovaBuild component library with card and badge components. Define a .card base class (background, border, border-radius, padding, box-shadow), then two variants: .card--featured (highlighted border or accent colour) and .card--minimal (no shadow, lighter border). For badges, define a .badge base class (small, inline-block, pill shape, font-size, padding), then .badge--success (green) and .badge--warning (amber). Use the BEM double-dash convention for all variants.`
      }),
      competences: ["CSS components", "BEM", "Card patterns", "Badge patterns"],
      kind: "css",
      initialCode: `/* NovaBuild Component Library — Cards and Badges */

/* === CARDS === */

.card {
  /* background, border, border-radius, padding, box-shadow */
}

.card--featured {
  /* accent border or highlight colour */
}

.card--minimal {
  /* lighter, no shadow */
}

/* === BADGES === */

.badge {
  /* inline-block, padding, border-radius (pill), font-size */
}

.badge--success {
  /* green */
}

.badge--warning {
  /* amber */
}
`,
      expected: "__css:card-class,card-featured,card-minimal,badge-class,badge-success,badge-warning__",
      helperText: "Define .card, .card--featured, .card--minimal, .badge, .badge--success, and .badge--warning.",
      successText: "Correct — card and badge components complete. Visual consistency across all NovaBuild client deliverables is now enforced.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Card & Badge Components</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0d1117; color: #f0f6fc; padding: 32px; }
h2 { color: #8b949e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 32px; }
.card h3 { margin-bottom: 8px; font-size: 16px; }
.card p { font-size: 14px; color: #8b949e; margin-bottom: 12px; }
.badges { display: flex; gap: 8px; }
{{CSS}}
</style>
</head>
<body>
  <h2>Cards</h2>
  <div class="grid">
    <div class="card"><h3>Default Card</h3><p>Standard component used across all client projects.</p></div>
    <div class="card card--featured"><h3>Featured Card</h3><p>Highlighted card for hero or priority content.</p></div>
    <div class="card card--minimal"><h3>Minimal Card</h3><p>Clean, lightweight card for secondary content.</p></div>
  </div>
  <h2>Badges</h2>
  <div class="badges">
    <span class="badge badge--success">Active</span>
    <span class="badge badge--warning">Pending</span>
  </div>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 3 — Hover and Focus States  (LO7)
    // -----------------------------------------------------------------------
    {
      id: "2-3",
      moduleId: 2,
      badge: "Task 3",
      title: "Hover and Focus States",
      instruction: instructionBlock({
        goal: `NovaBuild client interfaces are failing usability checks because interactive elements have no visible feedback. Add :hover, :focus, and :active pseudo-class rules to the button and link styles in the starter code. The :focus rule must include a visible outline — at least 3px solid with a 2px offset. Do not use outline: none without providing an alternative. Each state must look visibly different from the default.`
      }),
      competences: ["Pseudo-classes", "Keyboard accessibility", "Focus styles", "Interaction feedback"],
      kind: "css",
      initialCode: `/* NovaBuild — Interactive States
   Add :hover, :focus, and :active rules to each element below.
   Focus states MUST use a visible outline (not outline: none). */

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

/* Add :hover, :focus, and :active states for .btn-primary here */


.nav-link {
  color: #94a3b8;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
}

/* Add :hover and :focus states for .nav-link here */
`,
      expected: "__css:hover-state,focus-state,active-state,focus-outline__",
      helperText: "Add :hover, :focus, and :active blocks. The :focus block must include an outline property.",
      successText: "Correct — all interactive states are defined. Interfaces now pass usability and keyboard accessibility checks."
    },

    // -----------------------------------------------------------------------
    // Task 4 — Active State MCQ  (LO7)
    // -----------------------------------------------------------------------
    {
      id: "2-4",
      moduleId: 2,
      badge: "Task 4",
      title: "Active State: Pressed Button Effect",
      instruction: instructionBlock({
        goal: `A NovaBuild developer has asked you to review the following CSS for a button's :active state. Select the answer that correctly describes what the code does and why it creates a pressed effect.`
      }),
      competences: ["Active state", "CSS transforms", "box-shadow", "Interaction design"],
      kind: "mcq",
      initialCode: "",
      snippet: `.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: none;
}`,
      options: [
        "The :active rule moves the button up by 2px to show it is being pressed",
        "The :active rule cancels the hover lift (translateY back to 0) and removes the shadow, making the button appear to press down into the page",
        "The :active rule is incorrect — transform should not be used on :active",
        "The :active rule moves the button to its original position but the shadow remains from :hover"
      ],
      correctOption:
        "The :active rule cancels the hover lift (translateY back to 0) and removes the shadow, making the button appear to press down into the page",
      helperText: "The :hover state lifts the button; :active reverses that lift to simulate pressing.",
      successText: "Correct — :active cancels the hover transform and shadow to create a convincing pressed effect."
    },

    // -----------------------------------------------------------------------
    // Task 5 — Sticky Navigation Header  (LO8)
    // -----------------------------------------------------------------------
    {
      id: "2-5",
      moduleId: 2,
      badge: "Task 5",
      title: "Sticky Navigation Header",
      instruction: instructionBlock({
        goal: `Several NovaBuild client sites lose the navigation bar when users scroll down. Implement a sticky header by setting position: sticky and top: 0 on the .site-header element. The header must also have a z-index high enough to sit above all page content, and a fully opaque background so content does not show through when scrolling. Add these properties to the .site-header rule in the starter code.`
      }),
      competences: ["position: sticky", "z-index", "Sticky headers", "Scroll behaviour"],
      kind: "css",
      initialCode: `/* NovaBuild — Sticky Header
   Make .site-header stick to the top of the viewport on scroll.
   Requirements:
   - position: sticky
   - top: 0
   - z-index sufficient to sit above all content
   - Fully opaque background colour */

.site-header {
  background-color: #0d1117;
  border-bottom: 1px solid #30363d;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Add sticky positioning here */
}

.nav-links {
  display: flex;
  gap: 24px;
  list-style: none;
}

.nav-links a {
  color: #f0f6fc;
  text-decoration: none;
  font-size: 15px;
}
`,
      expected: "__css:sticky-position,z-index-value__",
      helperText: "Add position: sticky, top: 0, and z-index to .site-header.",
      successText: "Correct — the header will now remain visible as users scroll through page content.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sticky Header Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0d1117; color: #f0f6fc; }
.content { padding: 32px 24px; }
.content p { margin-bottom: 24px; color: #8b949e; line-height: 1.7; }
.brand { font-weight: 700; font-size: 18px; color: #f0f6fc; }
{{CSS}}
</style>
</head>
<body>
  <header class="site-header">
    <span class="brand">NovaBuild</span>
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Portfolio</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </header>
  <main class="content">
    <p>Scroll down — the header should stay fixed at the top of the viewport.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia.</p>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
    <p>Nullam quis risus eget urna mollis ornare vel eu leo.</p>
    <p>Cras mattis consectetur purus sit amet fermentum.</p>
    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in.</p>
  </main>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 6 — Dropdown Menu CSS  (LO8)
    // -----------------------------------------------------------------------
    {
      id: "2-6",
      moduleId: 2,
      badge: "Task 6",
      title: "Dropdown Menu CSS",
      instruction: instructionBlock({
        goal: `NovaBuild navigation bars have no dropdown menus. Add CSS to implement a dropdown panel. The .dropdown-menu element must be hidden by default using display: none or visibility: hidden. It must appear when the parent .nav-item is hovered (using .nav-item:hover .dropdown-menu). Set a min-width on the panel so it is at least 160px wide. The existing HTML structure is provided — write only CSS.`
      }),
      competences: ["Dropdown menus", "CSS visibility", "Hover patterns", "Navigation"],
      kind: "css",
      initialCode: `/* NovaBuild — Dropdown Menu
   The HTML is already written. Style the dropdown behaviour with CSS only.

   Requirements:
   - .dropdown-menu hidden by default
   - Visible on .nav-item:hover
   - min-width on the panel
   - Positioned absolutely below the trigger link */

.nav-item {
  position: relative;
  list-style: none;
}

.nav-trigger {
  display: block;
  padding: 8px 16px;
  color: #f0f6fc;
  text-decoration: none;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 8px 0;
  /* Hide by default here */
  /* Set min-width here */
}

.dropdown-menu a {
  display: block;
  padding: 8px 16px;
  color: #f0f6fc;
  text-decoration: none;
  font-size: 14px;
}

/* Show dropdown on hover here */
`,
      expected: "__css:dropdown-hidden,min-width-prop,hover-state__",
      helperText: "Hide .dropdown-menu by default, show it on .nav-item:hover, and set a min-width.",
      successText: "Correct — dropdown menu implemented. Services panel now appears on hover.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Dropdown Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0d1117; color: #f0f6fc; }
nav { background: #161b22; border-bottom: 1px solid #30363d; padding: 0 24px; }
ul { display: flex; }
{{CSS}}
</style>
</head>
<body>
  <nav>
    <ul>
      <li class="nav-item"><a class="nav-trigger" href="#">Home</a></li>
      <li class="nav-item">
        <a class="nav-trigger" href="#">Services ▾</a>
        <div class="dropdown-menu">
          <a href="#">Web Design</a>
          <a href="#">UI/UX</a>
          <a href="#">E-Commerce</a>
          <a href="#">Branding</a>
        </div>
      </li>
      <li class="nav-item"><a class="nav-trigger" href="#">Portfolio</a></li>
      <li class="nav-item"><a class="nav-trigger" href="#">Contact</a></li>
    </ul>
  </nav>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 7 — CSS Transitions  (LO9)
    // -----------------------------------------------------------------------
    {
      id: "2-7",
      moduleId: 2,
      badge: "Task 7",
      title: "CSS Transitions",
      instruction: instructionBlock({
        goal: `NovaBuild interfaces feel abrupt because no transitions are applied. Add the transition property to each element using the exact timing values from the NovaBuild style guide: buttons use 200ms ease, cards use 250ms ease-in-out. Add the transitions to the .btn and .card selectors in the starter code so that all CSS changes on those elements (background-color, transform, box-shadow) animate smoothly.`
      }),
      competences: ["CSS transitions", "Timing functions", "ease vs ease-in-out", "Animation timing"],
      kind: "css",
      initialCode: `/* NovaBuild Transition Guide:
   - Buttons:  transition: all 200ms ease
   - Cards:    transition: all 250ms ease-in-out
   Add the correct transition property to each selector. */

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  /* Add transition here */
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}

.card {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px;
  padding: 24px;
  /* Add transition here */
}

.card:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.2);
}
`,
      expected: "__css:transition-prop,transition-200,transition-250__",
      helperText: "Add transition: all 200ms ease to .btn and transition: all 250ms ease-in-out to .card.",
      successText: "Correct — transitions applied with NovaBuild timing values. Interactions now feel smooth and polished.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Transitions Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0d1117; color: #f0f6fc; padding: 32px; display: flex; flex-direction: column; gap: 24px; }
{{CSS}}
</style>
</head>
<body>
  <button class="btn btn-primary">Hover me — button transition</button>
  <div class="card">
    <h3 style="margin-bottom:8px;">Hover this card</h3>
    <p style="color:#8b949e;font-size:14px;">The border and shadow should animate smoothly.</p>
  </div>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 8 — Keyframe Animations  (LO9)
    // -----------------------------------------------------------------------
    {
      id: "2-8",
      moduleId: 2,
      badge: "Task 8",
      title: "Keyframe Animations",
      instruction: instructionBlock({
        goal: `NovaBuild pages need two keyframe animations. First, define @keyframes fadeInUp — it starts with opacity: 0 and transform: translateY(24px) and ends with opacity: 1 and transform: translateY(0). Apply it to .hero with a 600ms duration, ease-out timing, and run it once on page load. Second, define @keyframes pulse — it scales from 1 to 1.05 and back to 1. Apply it to .badge-live with 1200ms duration, ease-in-out timing, and infinite iteration.`
      }),
      competences: ["@keyframes", "animation property", "Infinite loops", "Page load animations"],
      kind: "css",
      initialCode: `/* NovaBuild Animation System
   Define both keyframe animations and apply them to the correct elements. */

/* fadeInUp — hero section entrance animation */
@keyframes fadeInUp {
  /* from: opacity 0, translateY(24px) */
  /* to: opacity 1, translateY(0) */
}

.hero {
  padding: 80px 24px;
  text-align: center;
  /* Apply fadeInUp: 600ms, ease-out, runs once */
}

/* pulse — repeating scale animation for live badge */
@keyframes pulse {
  /* 0%: scale(1) */
  /* 50%: scale(1.05) */
  /* 100%: scale(1) */
}

.badge-live {
  display: inline-block;
  background: #16a34a;
  color: white;
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
  /* Apply pulse: 1200ms, ease-in-out, infinite */
}
`,
      expected: "__css:keyframes-fadeInUp,keyframes-pulse,animation-prop__",
      helperText: "Define @keyframes fadeInUp and @keyframes pulse, then apply animation: to .hero and .badge-live.",
      successText: "Correct — both keyframe animations implemented. The hero fades in on load and the live badge pulses continuously.",
      previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Animations Preview</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #0d1117; color: #f0f6fc; }
.hero h1 { font-size: 2.5rem; margin-bottom: 16px; }
.hero p { color: #8b949e; margin-bottom: 24px; }
{{CSS}}
</style>
</head>
<body>
  <div class="hero">
    <h1>NovaBuild Web Studio</h1>
    <p>Building digital experiences across the UAE.</p>
    <span class="badge-live">● Live</span>
  </div>
</body>
</html>`
    },

    // -----------------------------------------------------------------------
    // Task 9 — Utility Class System  (LO10)
    // -----------------------------------------------------------------------
    {
      id: "2-9",
      moduleId: 2,
      badge: "Task 9",
      title: "CSS Utility Class System",
      instruction: instructionBlock({
        goal: `NovaBuild has no utility classes, so developers write one-off CSS for every spacing and typography tweak. Build a utility class system using the NovaBuild naming convention. Define at least one class for each category: margin-top (.u-mt-sm, .u-mt-md, .u-mt-lg), margin-bottom (.u-mb-sm, .u-mb-md, .u-mb-lg), padding (.u-p-sm, .u-p-md, .u-p-lg), typography size (.u-text-sm, .u-text-md, .u-text-lg), and font weight (.u-font-normal, .u-font-semibold, .u-font-bold). Use consistent rem or px values for all spacing classes.`
      }),
      competences: ["Utility classes", "CSS naming conventions", "Spacing scale", "Typography scale"],
      kind: "css",
      initialCode: `/* NovaBuild Utility Class System
   Naming convention: .u-{property}-{size}

   Define at least 3 sizes for each spacing utility and
   the required typography utilities. */

/* === MARGIN-TOP === */
/* .u-mt-sm  →  e.g. margin-top: 8px  */
/* .u-mt-md  →  e.g. margin-top: 16px */
/* .u-mt-lg  →  e.g. margin-top: 32px */


/* === MARGIN-BOTTOM === */
/* .u-mb-sm, .u-mb-md, .u-mb-lg */


/* === PADDING === */
/* .u-p-sm, .u-p-md, .u-p-lg */


/* === TEXT SIZE === */
/* .u-text-sm, .u-text-md, .u-text-lg */


/* === FONT WEIGHT === */
/* .u-font-normal, .u-font-semibold, .u-font-bold */
`,
      expected: "__css:utility-mt,utility-mb,utility-p,utility-text,utility-font__",
      helperText: "Class names must start with .u-mt-, .u-mb-, .u-p-, .u-text-, and .u-font- respectively.",
      successText: "Correct — utility class system complete. Developers can now apply spacing and typography without writing new CSS."
    }
  ]
};
