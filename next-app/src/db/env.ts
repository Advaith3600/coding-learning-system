import "./load-env";

/** Default host/port for `docker-compose` `app-db` → host `5433:5432` (see repo `docker-compose.yml`). */
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = "5433";

/**
 * Resolves the Postgres URL for this app.
 * - If `APP_DATABASE_URL` is set, it is used as-is (must match the DB user password).
 * - Otherwise `APP_POSTGRES_PASSWORD` builds `postgres://app:<password>@127.0.0.1:5433/app`
 *   (override host/port with `APP_DATABASE_HOST` / `APP_DATABASE_PORT`).
 *
 * Passwords with special characters must be URL-encoded when building `APP_DATABASE_URL` manually;
 * the built-in fallback uses `encodeURIComponent`.
 */
export function resolveAppDatabaseUrl(): string {
  const explicit = process.env.APP_DATABASE_URL?.trim();
  if (explicit) return explicit;
  const pw = process.env.APP_POSTGRES_PASSWORD?.trim();
  if (pw) {
    const host = process.env.APP_DATABASE_HOST?.trim() || DEFAULT_HOST;
    const port = process.env.APP_DATABASE_PORT?.trim() || DEFAULT_PORT;
    return `postgres://app:${encodeURIComponent(pw)}@${host}:${port}/app`;
  }
  throw new Error(
    "Set APP_DATABASE_URL, or APP_POSTGRES_PASSWORD (defaults to host 127.0.0.1:5433 for local Docker app-db)."
  );
}
