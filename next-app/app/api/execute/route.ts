import { NextResponse } from "next/server";

type Judge0SubmissionResponse = {
  token: string;
};

type Judge0Status = {
  id: number;
  description?: string;
};

type Judge0SubmissionResult = {
  token: string;
  status: Judge0Status;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
};

function toBase64Utf8(input: string) {
  return Buffer.from(input, "utf8").toString("base64");
}

function fromBase64Utf8(input: string | null) {
  if (!input) return "";
  return Buffer.from(input, "base64").toString("utf8");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  const judge0BaseUrl = process.env.JUDGE0_API_URL;
  if (!judge0BaseUrl) {
    return NextResponse.json(
      { error: "JUDGE0_API_URL is not configured on the server." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const code = (body as { code?: unknown })?.code;
  if (typeof code !== "string" || code.trim().length === 0) {
    return NextResponse.json({ error: "Missing code." }, { status: 400 });
  }

  const submitRes = await fetch(
    `${judge0BaseUrl}/submissions?wait=false&base64_encoded=true`,
    {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language_id: 71,
      source_code: toBase64Utf8(code)
    })
    }
  );

  if (!submitRes.ok) {
    const text = await submitRes.text().catch(() => "");
    return NextResponse.json(
      { error: "Failed to submit to Judge0.", details: text },
      { status: 502 }
    );
  }

  const submitJson = (await submitRes.json()) as Judge0SubmissionResponse;
  const token = submitJson?.token;
  if (!token) {
    return NextResponse.json(
      { error: "Judge0 did not return a token." },
      { status: 502 }
    );
  }

  let result: Judge0SubmissionResult | null = null;
  for (let attempt = 0; attempt < 60; attempt++) {
    const pollRes = await fetch(
      `${judge0BaseUrl}/submissions/${token}?base64_encoded=true`,
      { method: "GET" }
    );

    if (!pollRes.ok) {
      const text = await pollRes.text().catch(() => "");
      return NextResponse.json(
        { error: "Failed to poll Judge0.", details: text },
        { status: 502 }
      );
    }

    result = (await pollRes.json()) as Judge0SubmissionResult;
    if (result?.status?.id && result.status.id > 2) break;

    await sleep(1500);
  }

  if (!result) {
    return NextResponse.json(
      { error: "No result returned from Judge0." },
      { status: 502 }
    );
  }

  const stdout = fromBase64Utf8(result.stdout);
  const stderr =
    fromBase64Utf8(result.stderr) || fromBase64Utf8(result.compile_output);
  const status = result.status;

  const correct = stdout.trim() === "Hello, World!";

  return NextResponse.json({
    stdout,
    stderr,
    status,
    correct
  });
}

