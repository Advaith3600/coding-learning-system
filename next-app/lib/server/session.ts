import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, verifyAuthToken, type AuthUser } from "@/lib/auth";

export async function getSessionUser(): Promise<AuthUser | null> {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAuthToken(token);
}
