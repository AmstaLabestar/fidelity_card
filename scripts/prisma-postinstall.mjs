import { execFileSync } from "node:child_process";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.log("[postinstall] Skipping `prisma generate` (DATABASE_URL not set).");
  process.exit(0);
}

const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
execFileSync(npxCommand, ["prisma", "generate"], { stdio: "inherit" });

