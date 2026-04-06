import type { Config } from "drizzle-kit";
import { resolveAppDatabaseUrl } from "./src/db/env";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: resolveAppDatabaseUrl()
  }
} satisfies Config;
