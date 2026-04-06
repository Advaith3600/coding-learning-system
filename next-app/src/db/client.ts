import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { resolveAppDatabaseUrl } from "./env";

const url = resolveAppDatabaseUrl();
const sql = postgres(url, { max: 10 });
export const db = drizzle(sql, { schema });
