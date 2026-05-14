#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node scripts/run_python.mjs <script.py> [...args]");
  process.exit(2);
}

const windowsPythonPaths = [
  "C:\\Program Files\\Python313\\python.exe",
  "C:\\Program Files\\Python312\\python.exe",
  "C:\\Program Files\\Python311\\python.exe",
  "C:\\Program Files\\LibreOffice\\program\\python.exe",
].filter(existsSync);

const candidates =
  process.platform === "win32"
    ? [
        ...(process.env.PYTHON ? [[process.env.PYTHON]] : []),
        ["python3"],
        ["python"],
        ...windowsPythonPaths.map((path) => [path]),
        ["py", "-3"],
      ]
    : [
        ...(process.env.PYTHON ? [[process.env.PYTHON]] : []),
        ["python3"],
        ["python"],
        ["py", "-3"],
      ];

const launchErrors = [];

for (const candidate of candidates) {
  const [command, ...prefixArgs] = candidate;
  const result = spawnSync(command, [...prefixArgs, ...args], {
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    if (result.error.code === "ENOENT" || result.error.code === "EACCES") {
      launchErrors.push(`${candidate.join(" ")}: ${result.error.message}`);
      continue;
    }

    console.error(result.error.message);
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}

console.error("Could not find a runnable Python 3 command.");
for (const error of launchErrors) {
  console.error(`- ${error}`);
}
process.exit(1);
