const fs = require("fs");
const http = require("http");

const SENTINEL_PATH = "/piston/.installed_node_php";
const host = process.env.PISTON_HOST || "piston";
const port = parseInt(process.env.PISTON_PORT || "2000", 10);

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? Buffer.from(JSON.stringify(body)) : null;
    const req = http.request(
      {
        host,
        port,
        path,
        method,
        headers: payload
          ? {
              "Content-Type": "application/json",
              "Content-Length": payload.length,
            }
          : undefined,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode || 0, data }));
      }
    );
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function waitForHealthy() {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    try {
      const r = await request("GET", "/api/v2/runtimes");
      if (r.status === 200) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error("Timed out waiting for piston /api/v2/runtimes");
}

function cmpSemver(a, b) {
  const pa = String(a).split(".").map((x) => parseInt(x, 10));
  const pb = String(b).split(".").map((x) => parseInt(x, 10));
  for (let i = 0; i < Math.max(pa.length, pb.length); i += 1) {
    const da = pa[i] || 0;
    const db = pb[i] || 0;
    if (da !== db) return da - db;
  }
  return 0;
}

async function getPackages() {
  const r = await request("GET", "/api/v2/packages");
  if (r.status !== 200) {
    throw new Error("Failed to list packages: HTTP " + r.status);
  }
  return JSON.parse(r.data);
}

function latestVersion(pkgs, language) {
  const versions = pkgs
    .filter((p) => p.language === language)
    .map((p) => p.language_version);
  if (versions.length === 0) return null;
  versions.sort(cmpSemver);
  return versions[versions.length - 1];
}

async function install(language, version) {
  const r = await request("POST", "/api/v2/packages", { language, version });
  if (r.status === 200) return;

  let msg = r.data;
  try {
    msg = JSON.parse(r.data)?.message ?? r.data;
  } catch {}

  if (r.status === 500 && String(msg).includes("Already installed")) return;

  throw new Error(
    "Install failed for " +
      language +
      "-" +
      version +
      ": HTTP " +
      r.status +
      " " +
      msg
  );
}

async function main() {
  fs.mkdirSync("/piston", { recursive: true });
  if (fs.existsSync(SENTINEL_PATH)) {
    console.log("[piston-setup] Runtimes already installed.");
    return;
  }

  console.log("[piston-setup] Installing runtimes via API: node (latest), php (latest)");
  await waitForHealthy();

  const pkgs = await getPackages();
  const nodeV = latestVersion(pkgs, "node");
  const phpV = latestVersion(pkgs, "php");
  if (!nodeV) throw new Error("No node packages available from piston package index");
  if (!phpV) throw new Error("No php packages available from piston package index");

  await install("node", nodeV);
  await install("php", phpV);
  fs.writeFileSync(SENTINEL_PATH, "node=" + nodeV + "\n" + "php=" + phpV + "\n");
  console.log("[piston-setup] Done.");
}

main().catch((e) => {
  console.error("[piston-setup]", e && e.stack ? e.stack : String(e));
  process.exit(1);
});
