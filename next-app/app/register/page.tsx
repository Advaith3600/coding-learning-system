"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { setLoginWelcomeFlag } from "@/components/PostLoginWelcomeToast";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { user?: { role?: "admin" | "student" } | null }) => {
        if (d.user) router.replace("/challenges");
      })
      .catch(() => {});
  }, [router]);

  async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Registration failed.");
        return;
      }
      setLoginWelcomeFlag({ role: "student" });
      router.replace("/challenges");
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container-app flex flex-1 flex-col justify-center py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="card p-6">
          <div className="mb-5 flex justify-center">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-brand-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span className="text-xl font-bold tracking-tight text-fg">
                Web<span className="text-brand-accent"> Technologies</span>
              </span>
            </div>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-fg">Create account</h1>
          <p className="mt-1 text-base text-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-brand-accent hover:underline">
              Sign in
            </Link>
          </p>

          <form className="mt-6" onSubmit={onSubmitForm} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-muted">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input mt-1"
                  required
                  minLength={3}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input mt-1"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pr-12"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center rounded-r-lg text-sm font-semibold text-muted transition hover:text-fg"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input mt-1"
                  required
                />
              </div>
            </div>

            {error ? (
              <p className="mt-3 text-base text-danger" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-6 w-full">
              <div className="glow-wrap w-full">
                <div className="glow" aria-hidden="true" />
                <div className="border-ring" aria-hidden="true">
                  <div className="border-ring-inner" />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="btn btn-primary relative z-0 w-full rounded-full"
                >
                  {busy ? "Creating account…" : "Create account"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
