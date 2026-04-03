import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAdminDashboardPayload } from "@/lib/admin-dashboard-data";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth";

async function requireAdmin() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  const user = await verifyAuthToken(token);
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { students, moduleStats } = await getAdminDashboardPayload();
  return NextResponse.json({ students, moduleStats });
}
