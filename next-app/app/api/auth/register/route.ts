import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME, signAuthToken } from "@/lib/auth";
import { createStudent } from "@/lib/users";

const MIN_PASSWORD_LENGTH = 8;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const username = (body as { username?: unknown })?.username;
  const email = (body as { email?: unknown })?.email;
  const password = (body as { password?: unknown })?.password;

  if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (username.trim().length < 3) {
    return NextResponse.json({ error: "Username must be at least 3 characters." }, { status: 400 });
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
      { status: 400 }
    );
  }

  const result = await createStudent({ username: username.trim(), email, password });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  const token = await signAuthToken({
    id: result.user.id,
    username: result.user.username,
    role: result.user.role
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24
  });
  return res;
}
