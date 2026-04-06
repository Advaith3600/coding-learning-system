import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { AUTH_COOKIE_NAME, verifyAuthToken, type AuthUser } from "@/lib/auth";
import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";

export type SessionUser = AuthUser & { email: string };

export async function getSessionUser(): Promise<SessionUser | null> {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  const jwtUser = await verifyAuthToken(token);
  if (!jwtUser) return null;
  const row = await db
    .select({ email: users.email })
    .from(users)
    .where(eq(users.id, jwtUser.id))
    .limit(1);
  if (!row[0]) return null;
  return { ...jwtUser, email: row[0].email };
}
