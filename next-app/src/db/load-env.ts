import { config } from "dotenv";
import path from "node:path";

/**
 * Loads env for CLI scripts (`tsx src/db/seed.ts`, migrate, drizzle-kit) and DB client.
 * Order: repo `.env` → `next-app/.env` → `next-app/.env.local` (last file wins for conflicts).
 *
 * After loading, we **restore** any variable that was already set on `process.env` before dotenv ran.
 * That keeps Docker Compose / CI / shell exports (e.g. `APP_DATABASE_URL=...@app-db:5432/...`)
 * from being overwritten by an empty or host-only `APP_DATABASE_URL` in `.env.local`.
 */
const cwd = process.cwd();

const injected = { ...process.env };

config({ path: path.join(cwd, "..", ".env") });
config({ path: path.join(cwd, ".env") });
config({ path: path.join(cwd, ".env.local"), override: true });

for (const [key, value] of Object.entries(injected)) {
  if (value !== undefined) {
    process.env[key] = value;
  }
}
