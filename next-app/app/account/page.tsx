"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { user?: { email?: string } | null }) => {
        const e = d.user?.email;
        if (typeof e === "string") {
          setEmail(e);
          setInitialEmail(e);
        }
      })
      .catch(() => {});
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; user?: { email?: string } };
      if (!res.ok) {
        setError(data.error ?? "Could not update email.");
        return;
      }
      if (typeof data.user?.email === "string") {
        setInitialEmail(data.user.email);
        setEmail(data.user.email);
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  const loaded = initialEmail !== null;
  const noChanges = loaded && email.trim() === initialEmail.trim();

  return (
    <main className="container-app py-10">
      <h1 className="text-2xl font-semibold tracking-tight text-fg">Account</h1>
      <p className="mt-2 text-base text-muted">Update your email address. It must be unique across all accounts.</p>

      <div className="card mt-6 max-w-md p-6">
        <form onSubmit={onSubmit} noValidate>
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

          {error ? (
            <p className="mt-3 text-base text-danger" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy || !loaded || noChanges}
            className="btn btn-primary mt-6"
          >
            {busy ? "Saving…" : "Save email"}
          </button>
        </form>
      </div>
    </main>
  );
}
