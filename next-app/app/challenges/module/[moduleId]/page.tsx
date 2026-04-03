import { redirect } from "next/navigation";
import { getChallengeProgress } from "@/lib/completions";
import { getModule } from "@/lib/challenges/catalog";
import type { ModuleId } from "@/lib/challenges/types";
import { getSessionUser } from "@/lib/server/session";
import { ModuleChallengesClient } from "./ModuleChallengesClient";

type Props = { params: { moduleId: string } };

export default async function ModuleChallengesPage({ params }: Props) {
  const raw = params.moduleId;
  const moduleId = Number(Array.isArray(raw) ? raw[0] : raw) as ModuleId;
  if (!Number.isFinite(moduleId) || !getModule(moduleId)) {
    redirect("/challenges");
  }

  const user = await getSessionUser();
  if (!user) redirect("/login");

  const initialCompleted: Record<string, boolean> = {};
  let initialSolutions: Record<string, string> = {};

  if (user.role === "student") {
    const p = await getChallengeProgress(user.id);
    for (const id of p.challengeIds) initialCompleted[id] = true;
    initialSolutions = p.solutions;
  }

  return (
    <ModuleChallengesClient
      moduleId={moduleId}
      initialRole={user.role}
      initialCompleted={initialCompleted}
      initialSolutions={initialSolutions}
      ssrHydrated
    />
  );
}
