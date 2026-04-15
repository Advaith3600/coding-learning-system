import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_3: ModuleDefinition = {
  id: 3,
  title: "JavaScript Fundamentals",
  description:
    "Automate NovaBuild Web Studio's internal reporting using JavaScript. These 10 tasks cover variables, control flow, loops, modular functions, arrays, objects, functional programming with map/filter/reduce, and ES6 module patterns.",

  challenges: [
    // -----------------------------------------------------------------------
    // Task 1 — Project Variables  (LO11)
    // -----------------------------------------------------------------------
    {
      id: "3-1",
      moduleId: 3,
      badge: "Task 1",
      title: "Project Variables",
      instruction: instructionBlock({
        goal: `NovaBuild needs a JavaScript program to log project details. Declare four variables using const or let: projectName (string "NovaBuild CMS"), isActive (boolean true), budget (number 15000), and hoursUsed (number 47). Then log each variable on its own line using console.log. Use const for values that will not change and let for values that might.`,
        expectedOutput: "NovaBuild CMS\ntrue\n15000\n47"
      }),
      competences: ["Variables", "const vs let", "Data types", "console.log"],
      kind: "output",
      initialCode: `// Declare and log four project variables.
// Use const for fixed values, let for mutable ones.

`,
      expected: "NovaBuild CMS\ntrue\n15000\n47",
      helperText: "Declare projectName, isActive, budget, and hoursUsed, then log each with console.log.",
      successText: "Correct — variables declared and logged. Each type (string, boolean, number) is correct."
    },

    // -----------------------------------------------------------------------
    // Task 2 — Budget Status Control Flow  (LO11)
    // -----------------------------------------------------------------------
    {
      id: "3-2",
      moduleId: 3,
      badge: "Task 2",
      title: "Budget Status Control Flow",
      instruction: instructionBlock({
        goal: `NovaBuild project managers need to know whether each project is on track financially. Write a function called getProjectStatus(budget, spent) that calculates the percentage spent and returns the correct status string: "over-budget" if spent >= budget, "at-risk" if spent >= 90% of budget, or "on-track" otherwise. Call it three times and log each result.`,
        expectedOutput: "over-budget\nat-risk\non-track"
      }),
      competences: ["Control flow", "if/else if", "Return values", "Percentage calculation"],
      kind: "output",
      initialCode: `// Write getProjectStatus(budget, spent) using if/else if/else.
// Then call it with these three test cases and log each result:
//   getProjectStatus(10000, 11000)  → "over-budget"
//   getProjectStatus(10000, 9200)   → "at-risk"
//   getProjectStatus(10000, 5000)   → "on-track"

`,
      expected: "over-budget\nat-risk\non-track",
      helperText: "Calculate (spent / budget) * 100. Return the matching status string for each threshold.",
      successText: "Correct — control flow logic handles all three budget thresholds correctly."
    },

    // -----------------------------------------------------------------------
    // Task 3 — Count Project Statuses with a Loop  (LO11)
    // -----------------------------------------------------------------------
    {
      id: "3-3",
      moduleId: 3,
      badge: "Task 3",
      title: "Count Project Statuses with a Loop",
      instruction: instructionBlock({
        goal: `NovaBuild's weekly report is produced manually by counting rows in a spreadsheet. Automate it with JavaScript. Given the statuses array below, use a for...of loop to count how many projects are "active", "pending", and "completed". Log the counts in the format shown. Do not use filter or reduce — use a loop and an if statement inside it.`,
        expectedOutput: "Active: 3\nPending: 2\nCompleted: 1"
      }),
      competences: ["for...of loop", "Conditional statements", "Object counters", "Automation"],
      kind: "output",
      initialCode: `const statuses = ["active", "pending", "active", "completed", "active", "pending"];

// Use a for...of loop to count each status.
// Log the result as:
// Active: 3
// Pending: 2
// Completed: 1

`,
      expected: "Active: 3\nPending: 2\nCompleted: 1",
      helperText: "Initialise a counts object with three keys, loop over statuses, increment the right key, then log each count.",
      successText: "Correct — the weekly status report is now automated. No more manual spreadsheet counting."
    },

    // -----------------------------------------------------------------------
    // Task 4 — Pure Calculator Functions  (LO12)
    // -----------------------------------------------------------------------
    {
      id: "3-4",
      moduleId: 3,
      badge: "Task 4",
      title: "Pure Calculator Functions",
      instruction: instructionBlock({
        goal: `Write three pure functions for NovaBuild's project cost calculator. calcHourlyCost(hours, ratePerHour) returns hours multiplied by ratePerHour. applyDiscount(amount, discountPercent) returns the amount reduced by the given percentage. calcFinalBudget(hours, rate, discountPercent) calls the first two functions and returns the discounted total. Each function must use return and produce no side effects. Call each with the test values below and log the results.`,
        expectedOutput: "12000\n10800\n10800"
      }),
      competences: ["Pure functions", "Return values", "Function composition", "No side effects"],
      kind: "output",
      initialCode: `// Write three pure functions:
//   calcHourlyCost(hours, ratePerHour)
//   applyDiscount(amount, discountPercent)
//   calcFinalBudget(hours, rate, discountPercent)
//
// Test calls (log each result):
//   calcHourlyCost(80, 150)         → 12000
//   applyDiscount(12000, 10)        → 10800
//   calcFinalBudget(80, 150, 10)    → 10800

`,
      expected: "12000\n10800\n10800",
      helperText: "calcFinalBudget should call calcHourlyCost and applyDiscount rather than duplicating the logic.",
      successText: "Correct — three pure functions defined. Each can be called independently with any valid input."
    },

    // -----------------------------------------------------------------------
    // Task 5 — Bug Fix: Missing Return Statement  (LO12)
    // -----------------------------------------------------------------------
    {
      id: "3-5",
      moduleId: 3,
      badge: "Task 5",
      title: "Bug Fix: Missing Return Statement",
      instruction: instructionBlock({
        goal: `A NovaBuild developer wrote these two functions but they are not working correctly. Find and fix both bugs so the program logs the correct output. Hint: one function is missing a return statement; the other is using the wrong variable name inside the function body.`,
        expectedOutput: "Project: Alpha — Status: active\nProject: Beta — Status: completed"
      }),
      competences: ["Debugging", "Return statements", "Variable scope", "Function correctness"],
      kind: "fix",
      initialCode: `function formatStatus(name, status) {
  const message = \`Project: \${name} — Status: \${status}\`;
  // BUG: missing return
}

function getDefaultStatus(projectName) {
  const status = "active";
  // BUG: wrong variable used — should return status
  return projectNme;
}

console.log(formatStatus("Alpha", getDefaultStatus("Alpha")));
console.log(formatStatus("Beta", "completed"));
`,
      expected: "Project: Alpha — Status: active\nProject: Beta — Status: completed",
      helperText: "formatStatus is missing a return keyword. getDefaultStatus has a typo in the variable name it returns.",
      successText: "Correct — both bugs fixed. Functions now return the correct values."
    },

    // -----------------------------------------------------------------------
    // Task 6 — Array Methods: filter and find  (LO13)
    // -----------------------------------------------------------------------
    {
      id: "3-6",
      moduleId: 3,
      badge: "Task 6",
      title: "Array Methods: filter and find",
      instruction: instructionBlock({
        goal: `NovaBuild has no way to search its project database. Use built-in array methods — not for loops — to answer two queries. First, use filter to get all projects with status "active" and log how many there are. Second, use find to locate the first project with a budget over 20000 and log its name. The projects array is provided in the starter code.`,
        expectedOutput: "Active projects: 2\nFirst high-budget project: Nova E-Commerce"
      }),
      competences: ["Array.filter", "Array.find", "Functional methods", "Data querying"],
      kind: "output",
      initialCode: `const projects = [
  { name: "Nova Portfolio", status: "active",    budget: 8000  },
  { name: "Nova E-Commerce", status: "active",   budget: 25000 },
  { name: "Nova Blog",      status: "completed", budget: 5000  },
  { name: "Nova Dashboard", status: "pending",   budget: 15000 },
  { name: "Nova CMS",       status: "completed", budget: 30000 },
];

// Use filter to find active projects, log the count:
// "Active projects: 2"

// Use find to locate the first project with budget > 20000, log its name:
// "First high-budget project: Nova E-Commerce"

`,
      expected: "Active projects: 2\nFirst high-budget project: Nova E-Commerce",
      helperText: "Use projects.filter(...).length for the count, and projects.find(...).name for the project name.",
      successText: "Correct — filter and find queries work. The studio can now search its project database without manual scrolling."
    },

    // -----------------------------------------------------------------------
    // Task 7 — Array reduce for Totals  (LO13)
    // -----------------------------------------------------------------------
    {
      id: "3-7",
      moduleId: 3,
      badge: "Task 7",
      title: "Array reduce for Totals",
      instruction: instructionBlock({
        goal: `NovaBuild's finance team needs to know the total budget across all active projects. Use the reduce method (not a for loop) on the projects array to sum the budget of all active projects. Log the total as shown.`,
        expectedOutput: "Total active budget: 33000"
      }),
      competences: ["Array.reduce", "Accumulator pattern", "Conditional reduce", "Data aggregation"],
      kind: "output",
      initialCode: `const projects = [
  { name: "Nova Portfolio", status: "active",    budget: 8000  },
  { name: "Nova E-Commerce", status: "active",   budget: 25000 },
  { name: "Nova Blog",      status: "completed", budget: 5000  },
  { name: "Nova Dashboard", status: "pending",   budget: 15000 },
];

// Use reduce to sum the budget of active projects only.
// Log: "Total active budget: 33000"

`,
      expected: "Total active budget: 33000",
      helperText: "In the reduce callback, only add the budget to the accumulator when project.status === 'active'.",
      successText: "Correct — reduce calculates the total active budget in one expression. No manual loop needed."
    },

    // -----------------------------------------------------------------------
    // Task 8 — map with Arrow Functions  (LO14)
    // -----------------------------------------------------------------------
    {
      id: "3-8",
      moduleId: 3,
      badge: "Task 8",
      title: "map with Arrow Functions",
      instruction: instructionBlock({
        goal: `NovaBuild needs a formatted list of project summaries for its weekly report. Use the map method with an arrow function (no function keyword) to transform each project object into a summary string: "Alpha — active — AED 8000". Log each summary on its own line. Do not mutate the original array.`,
        expectedOutput: "Nova Portfolio — active — AED 8000\nNova E-Commerce — active — AED 25000\nNova Blog — completed — AED 5000"
      }),
      competences: ["Array.map", "Arrow functions", "Template literals", "Data transformation"],
      kind: "output",
      initialCode: `const projects = [
  { name: "Nova Portfolio",  status: "active",    budget: 8000  },
  { name: "Nova E-Commerce", status: "active",    budget: 25000 },
  { name: "Nova Blog",       status: "completed", budget: 5000  },
];

// Use map with an arrow function to produce summary strings.
// Format: "Name — status — AED budget"
// Log each summary string (one per line).

`,
      expected: "Nova Portfolio — active — AED 8000\nNova E-Commerce — active — AED 25000\nNova Blog — completed — AED 5000",
      helperText: "Use projects.map(p => `${p.name} — ${p.status} — AED ${p.budget}`), then loop or forEach to log each line.",
      successText: "Correct — map transforms the array without mutating it. Arrow function syntax is clean and consistent."
    },

    // -----------------------------------------------------------------------
    // Task 9 — summariseByCategory  (LO14)
    // -----------------------------------------------------------------------
    {
      id: "3-9",
      moduleId: 3,
      badge: "Task 9",
      title: "Summarise Projects by Category",
      instruction: instructionBlock({
        goal: `NovaBuild wants to count how many projects belong to each service category. Write a function called summariseByCategory(projects) that uses reduce (not a manual loop) to return an object where each key is a category and each value is the count of projects in that category. Call it with the projects array and log the result using JSON.stringify.`,
        expectedOutput: `{"design":2,"development":3,"branding":1}`
      }),
      competences: ["Array.reduce", "Object accumulator", "Functional programming", "Data grouping"],
      kind: "output",
      initialCode: `const projects = [
  { name: "Nova Portfolio",  category: "design"       },
  { name: "Nova E-Commerce", category: "development"  },
  { name: "Nova Blog",       category: "development"  },
  { name: "Nova Brand Kit",  category: "branding"     },
  { name: "Nova CMS",        category: "development"  },
  { name: "Nova Landing",    category: "design"       },
];

// Write summariseByCategory(projects) using reduce.
// It must return: { design: 2, development: 3, branding: 1 }

// Then log the result:
// console.log(JSON.stringify(summariseByCategory(projects)));

`,
      expected: `{"design":2,"development":3,"branding":1}`,
      helperText: "In the reduce callback, initialise the category key to 0 if it doesn't exist, then increment it.",
      successText: "Correct — summariseByCategory uses reduce to produce a category count object in a single pass."
    },

    // -----------------------------------------------------------------------
    // Task 10 — ES6 Modules Concept  (LO15)
    // -----------------------------------------------------------------------
    {
      id: "3-10",
      moduleId: 3,
      badge: "Task 10",
      title: "ES6 Modules Knowledge Check",
      instruction: instructionBlock({
        goal: `NovaBuild is migrating from inline scripts to ES6 modules. Select the answer that correctly describes the difference between named exports and default exports, and when to use each.`
      }),
      competences: ["ES6 modules", "Named exports", "Default exports", "import/export"],
      kind: "mcq",
      initialCode: "",
      snippet: `// utils.js
export const formatCurrency = (amount) => \`AED \${amount.toFixed(2)}\`;
export const formatDate = (date) => new Date(date).toLocaleDateString("en-AE");
export default function generateReport(projects) {
  return projects.map(p => formatCurrency(p.budget));
}

// main.js
import generateReport, { formatCurrency, formatDate } from "./utils.js";`,
      options: [
        "Named exports use export default; default exports use export const — the terms are interchangeable",
        "A file can have many named exports but only one default export; named exports are imported with curly braces, default exports are imported without them",
        "Default exports are faster than named exports because the bundler optimises them differently",
        "Named exports must be functions; default exports must be objects or classes"
      ],
      correctOption:
        "A file can have many named exports but only one default export; named exports are imported with curly braces, default exports are imported without them",
      helperText: "Look at how generateReport is imported vs how formatCurrency and formatDate are imported.",
      successText: "Correct — named exports allow multiple exports per file; default exports provide a module's primary value. You are ready for the CU03 assessment."
    }
  ]
};
