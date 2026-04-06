import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { getSessionUser } from "@/lib/server/session";
import { updateUserEmail } from "@/lib/users";

export async function GET() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  const user = await getSessionUser();
  return NextResponse.json({ user });
}

export async function PATCH(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const email = (body as { email?: unknown })?.email;
  if (typeof email !== "string") {
    return NextResponse.json({ error: "Missing email." }, { status: 400 });
  }

  const updated = await updateUserEmail(user.id, email);
  if (!updated.ok) {
    return NextResponse.json({ error: updated.error }, { status: 400 });
  }

  return NextResponse.json({
    user: {
      id: updated.user.id,
      username: updated.user.username,
      role: updated.user.role,
      email: updated.user.email
    }
  });
}
