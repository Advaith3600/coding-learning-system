import { getAttemptsPerChallenge, getTotalAttempts } from "@/lib/attempts";
import { getCompletedChallengeIds } from "@/lib/completions";
import { CHALLENGES, MODULES } from "@/lib/challenges/catalog";
import { getLastLoginAt } from "@/lib/login-history";
import { listStudents } from "@/lib/users";

export type AdminStudentProgressRow = {
  id: string;
  username: string;
  email: string;
  completedChallengeIds: string[];
  completedCount: number;
  totalChallenges: number;
  percentComplete: number;
  totalAttempts: number;
  attemptsPerChallenge: { challengeId: string; attempts: number }[];
  lastLogin: string | null;
  rank: number;
};

export type AdminModuleStat = {
  moduleId: number;
  title: string;
  totalChallenges: number;
  studentsCompleted: number;
};

export async function getAdminDashboardPayload(): Promise<{
  students: AdminStudentProgressRow[];
  moduleStats: AdminModuleStat[];
}> {
  const totalChallenges = CHALLENGES.length;
  const students = await listStudents();

  const rows = await Promise.all(
    students.map(async (s) => {
      const completedIds = await getCompletedChallengeIds(s.id);
      const completedCount = completedIds.length;
      const percentComplete =
        totalChallenges === 0 ? 0 : Math.round((completedCount / totalChallenges) * 100);
      const attemptsPerChallenge = await getAttemptsPerChallenge(s.id);
      const totalAttempts = await getTotalAttempts(s.id);
      const last = await getLastLoginAt(s.id);

      return {
        id: s.id,
        username: s.username,
        email: s.email,
        completedChallengeIds: completedIds,
        completedCount,
        totalChallenges,
        percentComplete,
        totalAttempts,
        attemptsPerChallenge,
        lastLogin: last ? last.toISOString() : null
      };
    })
  );

  const sorted = [...rows].sort(
    (a, b) =>
      b.completedCount - a.completedCount || a.username.localeCompare(b.username)
  );

  const withRank = sorted.map((r, idx) => ({ ...r, rank: idx + 1 }));

  const moduleStats = MODULES.map((mod) => {
    const challengeIds = mod.challenges.map((c) => c.id);
    const studentsCompleted = withRank.filter((s) =>
      challengeIds.every((id) => s.completedChallengeIds.includes(id))
    ).length;
    return {
      moduleId: mod.id,
      title: mod.title,
      totalChallenges: challengeIds.length,
      studentsCompleted
    };
  });

  return { students: withRank, moduleStats };
}
