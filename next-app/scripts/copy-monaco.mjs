import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const src = path.join(projectRoot, "node_modules", "monaco-editor", "min", "vs");
const dest = path.join(projectRoot, "public", "monaco", "vs");

async function main() {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.rm(dest, { recursive: true, force: true });
  await fs.cp(src, dest, { recursive: true });
  console.log(
    `[postinstall] Copied Monaco assets to ${path.relative(projectRoot, dest)}`
  );
}

main().catch((err) => {
  console.error("[postinstall] Failed to copy Monaco assets:", err);
  process.exit(1);
});

