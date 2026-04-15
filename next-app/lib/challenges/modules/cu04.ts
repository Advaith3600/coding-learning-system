import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_4: ModuleDefinition = {
  id: 4,
  title: "DOM Manipulation & Events",
  description:
    "Build interactive, data-driven front-end features for NovaBuild Web Studio. These 10 tasks cover DOM query selectors, dynamic element creation, event listeners, form validation, localStorage persistence, and client-side debugging.",

  challenges: [
    // -----------------------------------------------------------------------
    // Task 1 — DOM Query Selectors  (LO16)
    // -----------------------------------------------------------------------
    {
      id: "4-1",
      moduleId: 4,
      badge: "Task 1",
      title: "DOM Query Selectors",
      instruction: instructionBlock({
        goal: `A NovaBuild developer is selecting elements on a client page. Select the answer that gives the correct querySelector call to target only the first .card element inside #main, and explains why querySelectorAll would not be used here.`
      }),
      competences: ["querySelector", "querySelectorAll", "CSS selectors", "DOM traversal"],
      kind: "mcq",
      initialCode: "",
      snippet: `// HTML structure:
// <main id="main">
//   <div class="card" id="card-1">Project Alpha</div>
//   <div class="card" id="card-2">Project Beta</div>
// </main>

// Which line selects only the first .card inside #main?
// A) document.getElementById("card-1")
// B) document.querySelector("#main .card")
// C) document.querySelectorAll("#main .card")[0]
// D) document.querySelector(".card")`,
      options: [
        "A — getElementById is always the fastest selector and should be preferred",
        "B — querySelector('#main .card') returns the first matching element and uses the full CSS selector context",
        "C — querySelectorAll always returns a NodeList; index [0] is needed and is the correct approach here",
        "D — querySelector('.card') is sufficient because class selectors are unique per page"
      ],
      correctOption:
        "B — querySelector('#main .card') returns the first matching element and uses the full CSS selector context",
      helperText: "querySelector returns the first match; querySelectorAll returns all matches as a NodeList.",
      successText: "Correct — querySelector with a compound selector is the right tool when you need exactly one element from a specific context."
    },

    // -----------------------------------------------------------------------
    // Task 2 — Dynamic Element Creation  (LO16)
    // -----------------------------------------------------------------------
    {
      id: "4-2",
      moduleId: 4,
      badge: "Task 2",
      title: "Dynamic Element Creation (Node.js)",
      instruction: instructionBlock({
        goal: `In a browser, DOM elements are created with document.createElement and added with appendChild. Practice the same logic using plain JavaScript objects to simulate a DOM tree. Write a function createElement(tag, text) that returns an object { tag, text, children: [] }. Write appendChild(parent, child) that pushes the child into parent.children and returns the parent. Build a list with one parent ul and two li children ("Web Design", "Development"), then log JSON.stringify(ul).`,
        expectedOutput: `{"tag":"ul","text":"","children":[{"tag":"li","text":"Web Design","children":[]},{"tag":"li","text":"Development","children":[]}]}`
      }),
      competences: ["createElement", "appendChild", "DOM tree model", "Object simulation"],
      kind: "output",
      initialCode: `// Simulate browser DOM creation with plain objects.
// createElement(tag, text) → { tag, text, children: [] }
// appendChild(parent, child) → adds child to parent.children, returns parent

// Build this structure:
// <ul>
//   <li>Web Design</li>
//   <li>Development</li>
// </ul>

// Then log JSON.stringify(ul)

`,
      expected: `{"tag":"ul","text":"","children":[{"tag":"li","text":"Web Design","children":[]},{"tag":"li","text":"Development","children":[]}]}`,
      helperText: "createElement returns a plain object. appendChild mutates parent.children and returns parent.",
      successText: "Correct — createElement and appendChild logic understood. The same pattern is used with real browser DOM nodes."
    },

    // -----------------------------------------------------------------------
    // Task 3 — Event Listener Patterns  (LO17)
    // -----------------------------------------------------------------------
    {
      id: "4-3",
      moduleId: 4,
      badge: "Task 3",
      title: "Event Listener Patterns",
      instruction: instructionBlock({
        goal: `NovaBuild's existing HTML has inline onclick attributes on several buttons. Select the answer that correctly explains why addEventListener is preferred and what would happen if a NovaBuild developer mixed both approaches on the same element.`
      }),
      competences: ["addEventListener", "onclick", "Event handling", "Best practices"],
      kind: "mcq",
      initialCode: "",
      snippet: `<!-- Approach A — inline attribute -->
<button onclick="submitForm()">Submit</button>

<!-- Approach B — addEventListener -->
<button id="submit-btn">Submit</button>
<script>
  document.getElementById("submit-btn")
    .addEventListener("click", submitForm);
</script>`,
      options: [
        "Approach A is preferred because it keeps HTML and JS together for easier maintenance",
        "Approach B is preferred: addEventListener separates concerns, allows multiple listeners on the same event, and keeps HTML clean — inline onclick is overwritten if you also call addEventListener",
        "Both approaches are identical — onclick and addEventListener are aliases for the same browser API",
        "Approach B only works in Chrome; Approach A is the cross-browser standard"
      ],
      correctOption:
        "Approach B is preferred: addEventListener separates concerns, allows multiple listeners on the same event, and keeps HTML clean — inline onclick is overwritten if you also call addEventListener",
      helperText: "Think about what happens when you set element.onclick = fn and then call addEventListener('click', fn2).",
      successText: "Correct — addEventListener is the standard. Inline onclick attributes cannot be stacked and mix concerns."
    },

    // -----------------------------------------------------------------------
    // Task 4 — Event Object Usage  (LO17)
    // -----------------------------------------------------------------------
    {
      id: "4-4",
      moduleId: 4,
      badge: "Task 4",
      title: "Event Object and preventDefault",
      instruction: instructionBlock({
        goal: `Simulate two event-driven behaviours in Node.js. Write a function handleSubmit(event) that calls event.preventDefault() and logs the message from event.target.value. Write a function handleFilter(event) that logs the current input value from event.target.value in uppercase. Then call each function with a simulated event object and log the results.`,
        expectedOutput: "Form submitted: Contact NovaBuild\nFilter: DESIGN"
      }),
      competences: ["event.preventDefault", "event.target", "Event handlers", "Form events"],
      kind: "output",
      initialCode: `// Simulate event objects in Node.js (no browser needed).
// Write handleSubmit(event) — call event.preventDefault(), log:
//   "Form submitted: " + event.target.value
//
// Write handleFilter(event) — log event.target.value in uppercase:
//   "Filter: DESIGN"

// Test with simulated event objects:
const submitEvent = {
  preventDefault: () => {},
  target: { value: "Contact NovaBuild" }
};

const filterEvent = {
  target: { value: "design" }
};

// Call both handlers and log the results

`,
      expected: "Form submitted: Contact NovaBuild\nFilter: DESIGN",
      helperText: "Access event.target.value inside each handler. Call event.preventDefault() where required.",
      successText: "Correct — event object patterns understood. The same logic applies directly in browser event listeners."
    },

    // -----------------------------------------------------------------------
    // Task 5 — Required Field Validation  (LO18)
    // -----------------------------------------------------------------------
    {
      id: "4-5",
      moduleId: 4,
      badge: "Task 5",
      title: "Required Field Validation",
      instruction: instructionBlock({
        goal: `NovaBuild contact forms accept empty submissions. Write a function validateRequired(value) that returns null if the trimmed value is non-empty, or the string "This field is required." if it is empty or only whitespace. Test it with the three sample values and log the results.`,
        expectedOutput: "null\nThis field is required.\nThis field is required."
      }),
      competences: ["Form validation", "String trimming", "Null returns", "Error messages"],
      kind: "output",
      initialCode: `// validateRequired(value) → null if valid, error string if empty/whitespace

// Test values:
//   validateRequired("Ahmed Al Rashidi")  → null
//   validateRequired("")                  → "This field is required."
//   validateRequired("   ")              → "This field is required."

`,
      expected: "null\nThis field is required.\nThis field is required.",
      helperText: "Use String.trim() to remove whitespace before checking if the result is empty.",
      successText: "Correct — required field validation function works. Whitespace-only inputs are correctly rejected."
    },

    // -----------------------------------------------------------------------
    // Task 6 — Email and Phone Validation  (LO18)
    // -----------------------------------------------------------------------
    {
      id: "4-6",
      moduleId: 4,
      badge: "Task 6",
      title: "Email and Phone Validation",
      instruction: instructionBlock({
        goal: `Write two validation functions. validateEmail(str) must return true only if the string matches a basic email pattern (contains @ and a dot after the @). validatePhone(str) must return true only if the string contains exactly 9 digits (no spaces or dashes). Log the results of all six test calls.`,
        expectedOutput: "true\nfalse\nfalse\ntrue\nfalse\nfalse"
      }),
      competences: ["Regex validation", "Email format", "Phone format", "Client-side rules"],
      kind: "output",
      initialCode: `// validateEmail(str) — basic email check (must have @ and a dot after @)
// validatePhone(str) — exactly 9 digits, digits only

// Test calls:
//   validateEmail("ahmed@novabuild.ae")   → true
//   validateEmail("not-an-email")         → false
//   validateEmail("missing@dot")          → false
//   validatePhone("501234567")            → true
//   validatePhone("50-123-4567")          → false
//   validatePhone("50123456")             → false  (only 8 digits)

`,
      expected: "true\nfalse\nfalse\ntrue\nfalse\nfalse",
      helperText: "For email, use /^[^@]+@[^@]+\\.[^@]+$/.test(str). For phone, use /^\\d{9}$/.test(str).",
      successText: "Correct — email and phone validation functions work. Format-specific rules prevent malformed data reaching the server."
    },

    // -----------------------------------------------------------------------
    // Task 7 — localStorage Save and Load  (LO19)
    // -----------------------------------------------------------------------
    {
      id: "4-7",
      moduleId: 4,
      badge: "Task 7",
      title: "localStorage Save and Load",
      instruction: instructionBlock({
        goal: `NovaBuild project data is lost on every page refresh. Using the mocked localStorage provided in the starter code, write two functions: saveProject(project) that loads the existing projects array, pushes the new project, and saves it back using JSON.stringify. loadProjects() that retrieves and parses the stored array (returning an empty array if nothing is stored). Test with two saves and log the count and first project name.`,
        expectedOutput: "Saved: 2\nFirst project: Nova Portfolio"
      }),
      competences: ["localStorage", "JSON.stringify", "JSON.parse", "Data persistence"],
      kind: "output",
      initialCode: `// Mocked localStorage (works in Node.js like the browser API)
const _store = {};
const localStorage = {
  setItem: (key, value) => { _store[key] = String(value); },
  getItem: (key) => (_store[key] !== undefined ? _store[key] : null),
  removeItem: (key) => { delete _store[key]; }
};

// Write saveProject(project) and loadProjects() using the mock above.
// saveProject pushes to the stored array and saves it back.
// loadProjects returns the parsed array (or [] if nothing stored).

// Test:
// saveProject({ name: "Nova Portfolio", status: "active" });
// saveProject({ name: "Nova E-Commerce", status: "pending" });
// console.log("Saved:", loadProjects().length);
// console.log("First project:", loadProjects()[0].name);

`,
      expected: "Saved: 2\nFirst project: Nova Portfolio",
      helperText: "Use JSON.parse(localStorage.getItem('projects') || '[]') to load safely, then JSON.stringify to save back.",
      successText: "Correct — localStorage persistence works. Project data survives page reloads."
    },

    // -----------------------------------------------------------------------
    // Task 8 — JSON Stringify / Parse Cycle  (LO19)
    // -----------------------------------------------------------------------
    {
      id: "4-8",
      moduleId: 4,
      badge: "Task 8",
      title: "JSON Stringify and Parse Cycle",
      instruction: instructionBlock({
        goal: `Demonstrate a complete localStorage round-trip. Serialize the project object to JSON, store it, retrieve it, parse it back into an object, then log two of its properties to confirm the data survived the cycle correctly.`,
        expectedOutput: "Nova CMS\nactive"
      }),
      competences: ["JSON.stringify", "JSON.parse", "Serialisation", "Data integrity"],
      kind: "output",
      initialCode: `const _store = {};
const localStorage = {
  setItem: (key, value) => { _store[key] = String(value); },
  getItem: (key) => (_store[key] !== undefined ? _store[key] : null),
};

const project = { name: "Nova CMS", status: "active", budget: 18000 };

// 1. Stringify and store the project object under the key "current-project"
// 2. Retrieve it from storage
// 3. Parse it back into an object
// 4. Log project.name, then project.status

`,
      expected: "Nova CMS\nactive",
      helperText: "JSON.stringify converts the object to a string; JSON.parse converts it back. Check the retrieved value before parsing.",
      successText: "Correct — the object survived the full stringify → store → retrieve → parse round-trip intact."
    },

    // -----------------------------------------------------------------------
    // Task 9 — Debug: Fix Five Bugs  (LO20)
    // -----------------------------------------------------------------------
    {
      id: "4-9",
      moduleId: 4,
      badge: "Task 9",
      title: "Debug: Fix Five Bugs",
      instruction: instructionBlock({
        goal: `The NovaBuild project tracker below has five intentional bugs. Find and fix all of them so the program logs the correct output. Each bug is marked with a BUG comment. Add a brief inline comment on each fixed line explaining what was wrong.`,
        expectedOutput: "Projects loaded: 2\nTotal budget: 23000\nnova-portfolio\nnova-e-commerce"
      }),
      competences: ["Debugging", "Bug identification", "Code review", "JSON.parse"],
      kind: "fix",
      initialCode: `const _store = {};
const localStorage = {
  setItem: (key, val) => { _store[key] = String(val); },
  getItem: (key) => (_store[key] !== undefined ? _store[key] : null),
};

const projects = [
  { name: "Nova Portfolio",  budget: 8000  },
  { name: "Nova E-Commerce", budget: 15000 },
];

// BUG 1: Should use JSON.stringify to serialise before storing
localStorage.setItem("projects", projects);

// BUG 2: Missing JSON.parse — retrieved value is a string, not an array
const loaded = localStorage.getItem("projects");
console.log("Projects loaded:", loaded.length);

// BUG 3: Wrong property name — should be .budget not .cost
const total = loaded.reduce((sum, p) => sum + p.cost, 0);
console.log("Total budget:", total);

// BUG 4: Should use .toLowerCase() not .toUpperCase()
const slugs = loaded.map(p => p.name.toUpperCase().replace(/\\s+/g, "-"));

// BUG 5: Missing console.log call — slugs are never printed
slugs;
`,
      expected: "Projects loaded: 2\nTotal budget: 23000\nnova-portfolio\nnova-e-commerce",
      helperText: "Bug 1: JSON.stringify. Bug 2: JSON.parse. Bug 3: .budget. Bug 4: .toLowerCase(). Bug 5: console.log(slugs).",
      successText: "Correct — all five bugs fixed. The project tracker now loads, totals, and formats data correctly."
    },

    // -----------------------------------------------------------------------
    // Task 10 — DevTools Debugging Concept  (LO20)
    // -----------------------------------------------------------------------
    {
      id: "4-10",
      moduleId: 4,
      badge: "Task 10",
      title: "Browser DevTools Knowledge Check",
      instruction: instructionBlock({
        goal: `A NovaBuild client site has a bug: a fetch call is failing silently and the project list is not loading. Select the correct DevTools workflow to diagnose this issue.`
      }),
      competences: ["Browser DevTools", "Network tab", "Console tab", "Debugging workflow"],
      kind: "mcq",
      initialCode: "",
      snippet: `async function loadProjects() {
  const response = await fetch("/api/projects");
  const data = await response.json();
  renderList(data);
}

loadProjects();
// The project list does not appear. No visible error on screen.`,
      options: [
        "Open DevTools → Application tab → check localStorage to see if projects are cached there",
        "Open DevTools → Console tab → look for any uncaught errors, then open the Network tab → find the /api/projects request → check the Status code and Response body",
        "Open DevTools → Elements tab → inspect the list element to see if it has hidden children",
        "Reload the page with cache disabled by pressing Shift+F5 — this always fixes fetch errors"
      ],
      correctOption:
        "Open DevTools → Console tab → look for any uncaught errors, then open the Network tab → find the /api/projects request → check the Status code and Response body",
      helperText: "A silently failing fetch needs two tabs: Console for JavaScript errors, Network for HTTP response details.",
      successText: "Correct — Console + Network is the standard workflow for diagnosing failed API requests. You are ready for the CU04 assessment."
    }
  ]
};
