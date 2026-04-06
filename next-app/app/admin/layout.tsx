import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { getSessionUser } from "@/lib/server/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  const initialUser = user
    ? { id: user.id, username: user.username, role: user.role, email: user.email }
    : null;

  return (
    <>
      <Navbar initialUser={initialUser} />
      {children}
    </>
  );
}
