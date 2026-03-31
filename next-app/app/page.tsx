"use client";

import Editor from "@monaco-editor/react";
import { useMemo, useState } from "react";
import { loader } from "@monaco-editor/react";

loader.config({ paths: { vs: "/monaco/vs" } });

type ExecuteResponse = {
  stdout: string;
  stderr: string;
  status: { id: number; description?: string };
  correct: boolean;
};

type UiState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "correct" }
  | { kind: "wrong"; stdout: string }
  | { kind: "error"; stderr: string }
  | { kind: "failure" };

function Spinner() {
  return (
    <div
      className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300/30 border-t-zinc-200"
      aria-label="Loading"
    />
  );
}

export default function Page() {
  const initialCode = useMemo(() => "# Write your code here\n", []);
  const [code, setCode] = useState<string>(initialCode);
  const [ui, setUi] = useState<UiState>({ kind: "idle" });
  const [isRunning, setIsRunning] = useState(false);

  async function runCode() {
    setIsRunning(true);
    setUi({ kind: "loading" });
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });

      if (!res.ok) {
        setUi({ kind: "failure" });
        return;
      }

      const data = (await res.json()) as ExecuteResponse;

      const hasError = (data.stderr ?? "").trim().length > 0;
      if (hasError) {
        setUi({ kind: "error", stderr: data.stderr });
        return;
      }

      if (data.correct) {
        setUi({ kind: "correct" });
        return;
      }

      setUi({ kind: "wrong", stdout: data.stdout ?? "" });
    } catch {
      setUi({ kind: "failure" });
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm text-zinc-200">
          <span className="font-semibold">Challenge #1</span>
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-50">
          Python Hello World
        </h1>
        <p className="mt-2 text-zinc-300">
          Write a Python program that prints exactly:{" "}
          <span className="rounded bg-zinc-900 px-2 py-1 font-mono text-zinc-100">
            Hello, World!
          </span>
        </p>
      </header>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
        <div className="overflow-hidden rounded-lg border border-zinc-800">
          <Editor
            height="260px"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(v) => setCode(v ?? "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true
            }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={runCode}
            disabled={isRunning}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRunning ? (
              <>
                <Spinner />
                <span>Running...</span>
              </>
            ) : (
              "Run Code"
            )}
          </button>

          <div className="text-xs text-zinc-400">
            Output must match exactly (case + punctuation).
          </div>
        </div>

        {ui.kind === "loading" ? (
          <div className="mt-4 flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-200">
            <Spinner />
            <div className="text-sm">Running your code...</div>
          </div>
        ) : null}

        {ui.kind === "correct" ? (
          <div className="mt-4 rounded-lg border border-emerald-700/60 bg-emerald-950/40 px-4 py-3 text-emerald-100">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 h-5 w-5 rounded-full bg-emerald-500/20 ring-1 ring-emerald-400/40" />
              <div>
                <div className="text-sm font-semibold">
                  Correct! Your output matches the expected result.
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {ui.kind === "wrong" ? (
          <div className="mt-4 rounded-lg border border-yellow-700/60 bg-yellow-950/30 px-4 py-3 text-yellow-100">
            <div className="text-sm font-semibold">Wrong answer.</div>
            <div className="mt-2 text-xs text-yellow-200/80">Your stdout:</div>
            <pre className="mt-1 overflow-auto rounded bg-zinc-950 px-3 py-2 text-xs text-zinc-100">
              {ui.stdout.length ? ui.stdout : "(empty)"}
            </pre>
          </div>
        ) : null}

        {ui.kind === "error" ? (
          <div className="mt-4 rounded-lg border border-red-700/60 bg-red-950/30 px-4 py-3 text-red-100">
            <div className="text-sm font-semibold">Runtime/compile error</div>
            <div className="mt-2 text-xs text-red-200/80">stderr:</div>
            <pre className="mt-1 overflow-auto rounded bg-zinc-950 px-3 py-2 text-xs text-zinc-100">
              {ui.stderr.length ? ui.stderr : "(empty)"}
            </pre>
          </div>
        ) : null}

        {ui.kind === "failure" ? (
          <div className="mt-4 rounded-lg border border-red-700/60 bg-red-950/30 px-4 py-3 text-red-100">
            <div className="text-sm font-semibold">
              Request failed. Please try again.
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}

