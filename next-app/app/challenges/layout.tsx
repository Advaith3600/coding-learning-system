import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { getSessionUser } from "@/lib/server/session";

export default async function ChallengesLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  const initialUser = user
    ? { id: user.id, username: user.username, role: user.role }
    : null;

  return (
    <>
      <Navbar initialUser={initialUser} />
      {children}
    </>
  );
}
