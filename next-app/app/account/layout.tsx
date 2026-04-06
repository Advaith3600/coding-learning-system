import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { getSessionUser } from "@/lib/server/session";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const initialUser = {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email
  };

  return (
    <>
      <Navbar initialUser={initialUser} />
      {children}
    </>
  );
}
