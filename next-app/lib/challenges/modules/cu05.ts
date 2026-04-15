import type { ModuleDefinition } from "../types";
import { instructionBlock } from "../instruction";

export const MODULE_5: ModuleDefinition = {
  id: 5,
  title: "Modern JavaScript (ES6+)",
  description:
    "Modernise NovaBuild Web Studio's codebase by applying ES6 features, closure patterns, modern array methods, and algorithmic thinking. These 9 tasks cover const/let, template literals, destructuring, spread, closures, memoisation, map/filter/reduce method chaining, Big-O notation, and reusable pure utility functions.",

  challenges: [
    // -----------------------------------------------------------------------
    // Task 1 — ES6 Refactor: var → const/let  (LO21)
    // -----------------------------------------------------------------------
    {
      id: "5-1",
      moduleId: 5,
      badge: "Task 1",
      title: "ES6 Refactor: var → const and let",
      instruction: instructionBlock({
        goal: `A large section of NovaBuild's legacy codebase still uses var. Refactor the starter code: replace every var with const if the variable is never reassigned, or let if it is. Do not change any logic or values. The program must log the same output as before.`,
        expectedOutput: "NovaBuild Web Studio\n3\n25000\ntrue"
      }),
      competences: ["const vs let", "ES6 syntax", "Variable scoping", "Legacy refactoring"],
      kind: "fix",
      initialCode: `// LEGACY CODE — refactor all var declarations to const or let.
// Do not change any values or logic.

var studioName = "NovaBuild Web Studio";
console.log(studioName);

var projectCount = 0;
projectCount = projectCount + 1;
projectCount = projectCount + 1;
projectCount = projectCount + 1;
console.log(projectCount);

var maxBudget = 25000;
console.log(maxBudget);

var isOpen = true;
console.log(isOpen);
`,
      expected: "NovaBuild Web Studio\n3\n25000\ntrue",
      helperText: "Use const for studioName, maxBudget, and isOpen. Use let for projectCount (it is reassigned).",
      successText: "Correct — all var declarations replaced. const prevents accidental reassignment; let signals intentional mutation."
    },

    // -----------------------------------------------------------------------
    // Task 2 — Template Literals and Destructuring  (LO21)
    // -----------------------------------------------------------------------
    {
      id: "5-2",
      moduleId: 5,
      badge: "Task 2",
      title: "Template Literals and Destructuring",
      instruction: instructionBlock({
        goal: `Rewrite the two legacy patterns using modern ES6 syntax. First, replace the string concatenation in formatProject with a template literal. Second, rewrite the property assignments in getProjectMeta using object destructuring to extract name, budget, and status in a single line. The output must remain identical.`,
        expectedOutput: "Project: Nova CMS | Budget: AED 18000 | Status: active\nName: Nova CMS | Budget: 18000"
      }),
      competences: ["Template literals", "Destructuring", "ES6 syntax", "Code readability"],
      kind: "fix",
      initialCode: `const project = { name: "Nova CMS", budget: 18000, status: "active", category: "development" };

// TASK A: Rewrite using a template literal (replace + concatenation)
function formatProject(p) {
  return "Project: " + p.name + " | Budget: AED " + p.budget + " | Status: " + p.status;
}
console.log(formatProject(project));

// TASK B: Rewrite using object destructuring (one line to extract name, budget, status)
function getProjectMeta(p) {
  const name = p.name;
  const budget = p.budget;
  const status = p.status;
  return \`Name: \${name} | Budget: \${budget}\`;
}
console.log(getProjectMeta(project));
`,
      expected: "Project: Nova CMS | Budget: AED 18000 | Status: active\nName: Nova CMS | Budget: 18000",
      helperText: "Use backtick strings for task A. Use const { name, budget, status } = p; for task B.",
      successText: "Correct — template literals and destructuring make the code more readable and less error-prone."
    },

    // -----------------------------------------------------------------------
    // Task 3 — Counter Factory Closure  (LO22)
    // -----------------------------------------------------------------------
    {
      id: "5-3",
      moduleId: 5,
      badge: "Task 3",
      title: "Counter Factory Closure",
      instruction: instructionBlock({
        goal: `Several NovaBuild utility scripts use global counter variables, causing naming conflicts when multiple scripts load together. Fix this using a closure. Write a makeCounter() factory function that returns an object with four methods: increment(), decrement(), reset(), and value(). Each counter instance must have its own private count variable — incrementing one counter must not affect another.`,
        expectedOutput: "2\n1\n0\n10"
      }),
      competences: ["Closures", "Factory functions", "Private state", "Encapsulation"],
      kind: "output",
      initialCode: `// makeCounter() returns { increment, decrement, reset, value }
// Each instance has its own private count starting at 0.

// Test:
// const counterA = makeCounter();
// const counterB = makeCounter();
// counterA.increment();
// counterA.increment();
// counterB.increment();
// console.log(counterA.value()); // 2
// console.log(counterB.value()); // 1
// counterA.reset();
// console.log(counterA.value()); // 0
// counterB.increment(); counterB.increment(); ... (9 more)
// console.log(counterB.value()); // 10

`,
      expected: "2\n1\n0\n10",
      helperText: "Declare let count = 0 inside makeCounter. The returned methods close over this private variable.",
      successText: "Correct — each counter has independent private state. The closure pattern replaces unsafe global variables."
    },

    // -----------------------------------------------------------------------
    // Task 4 — Memoisation Closure  (LO22)
    // -----------------------------------------------------------------------
    {
      id: "5-4",
      moduleId: 5,
      badge: "Task 4",
      title: "Memoisation Closure",
      instruction: instructionBlock({
        goal: `NovaBuild's reporting tool calls an expensive calculation function repeatedly with the same inputs. Write a memoize(fn) function that wraps any function and caches its results. On the first call with a given argument it computes the result normally; on subsequent calls with the same argument it returns the cached value without calling fn again. Log "computed" when the real function runs and "cached" when the cache is used.`,
        expectedOutput: "computed\n5050\ncached\n5050"
      }),
      competences: ["Memoisation", "Closures", "Cache patterns", "Performance optimisation"],
      kind: "output",
      initialCode: `// memoize(fn) returns a wrapped function that caches results by argument.

function expensiveSum(n) {
  console.log("computed");
  let total = 0;
  for (let i = 1; i <= n; i++) total += i;
  return total;
}

// const memoSum = memoize(expensiveSum);
// console.log(memoSum(100));  → logs "computed" then 5050
// console.log(memoSum(100));  → logs "cached" then 5050

`,
      expected: "computed\n5050\ncached\n5050",
      helperText: "Store results in a cache object keyed by the argument. Return cache[arg] if it exists; otherwise compute, store, and return.",
      successText: "Correct — memoisation eliminates redundant computation. The closure keeps the cache private to each memoized function."
    },

    // -----------------------------------------------------------------------
    // Task 5 — Replace for-loops with map/filter/reduce  (LO23)
    // -----------------------------------------------------------------------
    {
      id: "5-5",
      moduleId: 5,
      badge: "Task 5",
      title: "Replace for-loops with map, filter, reduce",
      instruction: instructionBlock({
        goal: `NovaBuild's legacy data processing code uses manual for-loops. Rewrite the three marked loop blocks using the correct array method: the first block builds a new array — use map. The second block selects items — use filter. The third block accumulates a total — use reduce. The output must remain identical. No for or while loops may remain in the three rewritten sections.`,
        expectedOutput: "NOVA PORTFOLIO,NOVA E-COMMERCE,NOVA CMS,NOVA BLOG\n3\n48000"
      }),
      competences: ["Array.map", "Array.filter", "Array.reduce", "Functional refactoring"],
      kind: "fix",
      initialCode: `const projects = [
  { name: "Nova Portfolio",  status: "active",    budget: 8000  },
  { name: "Nova E-Commerce", status: "active",    budget: 25000 },
  { name: "Nova CMS",        status: "active",    budget: 15000 },
  { name: "Nova Blog",       status: "completed", budget: 5000  },
];

// LEGACY BLOCK 1: Build array of uppercase names → rewrite with map
const names = [];
for (let i = 0; i < projects.length; i++) {
  names.push(projects[i].name.toUpperCase());
}
console.log(names.join(","));

// LEGACY BLOCK 2: Count active projects → rewrite with filter
let activeCount = 0;
for (let i = 0; i < projects.length; i++) {
  if (projects[i].status === "active") activeCount++;
}
console.log(activeCount);

// LEGACY BLOCK 3: Sum active budgets → rewrite with reduce
let total = 0;
for (let i = 0; i < projects.length; i++) {
  if (projects[i].status === "active") total += projects[i].budget;
}
console.log(total);
`,
      expected: "NOVA PORTFOLIO,NOVA E-COMMERCE,NOVA CMS,NOVA BLOG\n3\n48000",
      helperText: "Block 1: projects.map(p => p.name.toUpperCase()). Block 2: projects.filter(...).length. Block 3: projects.reduce(...).",
      successText: "Correct — all three for-loops replaced with the appropriate array method. Code is shorter and expresses intent more clearly."
    },

    // -----------------------------------------------------------------------
    // Task 6 — Method Chaining  (LO23)
    // -----------------------------------------------------------------------
    {
      id: "5-6",
      moduleId: 5,
      badge: "Task 6",
      title: "Method Chaining",
      instruction: instructionBlock({
        goal: `NovaBuild's lead developer wants a single-expression pipeline: filter active projects, map their budgets to numbers, then reduce to the total — all chained together without any intermediate variables. Write one chained expression using filter, map, and reduce and log the result.`,
        expectedOutput: "48000"
      }),
      competences: ["Method chaining", "filter().map().reduce()", "Functional pipelines", "No intermediate variables"],
      kind: "output",
      initialCode: `const projects = [
  { name: "Nova Portfolio",  status: "active",    budget: 8000  },
  { name: "Nova E-Commerce", status: "active",    budget: 25000 },
  { name: "Nova CMS",        status: "active",    budget: 15000 },
  { name: "Nova Blog",       status: "completed", budget: 5000  },
];

// Write ONE chained expression:
// projects.filter(...).map(...).reduce(...)
// Log the total active budget: 48000

`,
      expected: "48000",
      helperText: "Chain: filter(p => p.status === 'active').map(p => p.budget).reduce((sum, b) => sum + b, 0).",
      successText: "Correct — the entire pipeline is one expression. No intermediate variables, no loops."
    },

    // -----------------------------------------------------------------------
    // Task 7 — Big-O Analysis  (LO24)
    // -----------------------------------------------------------------------
    {
      id: "5-7",
      moduleId: 5,
      badge: "Task 7",
      title: "Big-O Complexity Analysis",
      instruction: instructionBlock({
        goal: `NovaBuild's utility functions have never had their algorithmic complexity documented. Select the answer that correctly identifies the Big-O complexity of the function below and explains why.`
      }),
      competences: ["Big-O notation", "Algorithmic complexity", "O(n²)", "Nested loops"],
      kind: "mcq",
      initialCode: "",
      snippet: `function findDuplicateClients(clients) {
  const duplicates = [];
  for (let i = 0; i < clients.length; i++) {
    for (let j = i + 1; j < clients.length; j++) {
      if (clients[i].email === clients[j].email) {
        duplicates.push(clients[i]);
      }
    }
  }
  return duplicates;
}`,
      options: [
        "O(1) — the function always checks the same number of pairs regardless of input size",
        "O(n) — it loops through clients once and the inner loop is a constant cost operation",
        "O(n²) — for each of the n clients, the inner loop runs up to n times, so the total comparisons grow proportionally to n squared",
        "O(log n) — the inner loop starts at i+1 which halves the search space each time"
      ],
      correctOption:
        "O(n²) — for each of the n clients, the inner loop runs up to n times, so the total comparisons grow proportionally to n squared",
      helperText: "Count how many times the comparison runs relative to the size of the clients array.",
      successText: "Correct — nested loops over the same input produce O(n²) complexity. For large client lists, a Map-based O(n) approach would be better."
    },

    // -----------------------------------------------------------------------
    // Task 8 — Pure Utility Functions  (LO25)
    // -----------------------------------------------------------------------
    {
      id: "5-8",
      moduleId: 5,
      badge: "Task 8",
      title: "Pure Utility Functions",
      instruction: instructionBlock({
        goal: `Build three pure utility functions for NovaBuild's shared library. clamp(value, min, max) returns value clamped between min and max. chunk(array, size) splits an array into sub-arrays of the given size. groupBy(array, key) groups objects by the value of a property key, returning an object whose values are arrays of matching items. Each function must be pure (no side effects) and handle the edge cases in the test calls.`,
        expectedOutput: "5\n10\n0\n[[1,2],[3,4],[5]]\nactive: 2\ncompleted: 1"
      }),
      competences: ["Pure functions", "Utility library", "clamp", "groupBy", "chunk"],
      kind: "output",
      initialCode: `// Write three pure utility functions:
//
// clamp(value, min, max) → number clamped to [min, max]
// chunk(array, size)     → array split into sub-arrays of given size
// groupBy(array, key)    → object where keys are property values, values are arrays of matching items

// Test: clamp
console.log(clamp(5, 0, 10));    // 5
console.log(clamp(15, 0, 10));   // 10
console.log(clamp(-3, 0, 10));   // 0

// Test: chunk
console.log(JSON.stringify(chunk([1, 2, 3, 4, 5], 2)));  // [[1,2],[3,4],[5]]

// Test: groupBy
const items = [
  { name: "Nova Portfolio",  status: "active"    },
  { name: "Nova Blog",       status: "completed" },
  { name: "Nova CMS",        status: "active"    },
];
const grouped = groupBy(items, "status");
console.log("active:", grouped.active.length);      // active: 2
console.log("completed:", grouped.completed.length); // completed: 1
`,
      expected: "5\n10\n0\n[[1,2],[3,4],[5]]\nactive: 2\ncompleted: 1",
      helperText: "clamp: Math.min(max, Math.max(min, value)). chunk: slice in a while loop. groupBy: reduce into an object of arrays.",
      successText: "Correct — three reusable pure utilities implemented. The NovaBuild shared library now covers clamping, chunking, and grouping."
    },

    // -----------------------------------------------------------------------
    // Task 9 — Edge Cases in Utility Functions  (LO25)
    // -----------------------------------------------------------------------
    {
      id: "5-9",
      moduleId: 5,
      badge: "Task 9",
      title: "Edge Cases in Utility Functions",
      instruction: instructionBlock({
        goal: `The NovaBuild utility library has two functions with missing edge-case guards. Fix them so they handle the failing cases without throwing errors. Each bug is marked with a BUG comment. After fixing, the four test calls must log the expected output exactly.`,
        expectedOutput: "0\n100\n[]\nno data"
      }),
      competences: ["Edge cases", "Defensive programming", "Empty arrays", "Null handling"],
      kind: "fix",
      initialCode: `// BUG 1: sumBudgets crashes on an empty array.
// reduce with no initial value throws when the array is empty.
function sumBudgets(projects) {
  return projects.reduce((sum, p) => sum + p.budget);
}
console.log(sumBudgets([]));                    // should log: 0
console.log(sumBudgets([{ budget: 100 }]));     // should log: 100

// BUG 2: getFirstProjectName throws when items is an empty array.
function getFirstProjectName(items) {
  // BUG: no guard — items[0].name throws a TypeError when items is []
  return items[0].name;
}
console.log(getFirstProjectName([]));           // should log: no data
console.log(getFirstProjectName([{ name: "Nova CMS" }])); // should log: Nova CMS
`,
      expected: "0\n100\nno data\nNova CMS",
      helperText: "For reduce, add 0 as the initial value (second argument). For getFirstProjectName, return 'no data' early if items.length === 0.",
      successText: "Correct — both edge cases handled. Defensive programming prevents runtime errors in production. You are ready for the CU05 assessment."
    }
  ]
};
