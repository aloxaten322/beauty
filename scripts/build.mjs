import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const node = process.execPath;
const environment = {
  ...process.env,
  BUILD_YEAR: String(new Date().getFullYear()),
};

const run = (script, args) => {
  const result = spawnSync(node, [resolve(projectRoot, script), ...args], {
    cwd: projectRoot,
    env: environment,
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run("node_modules/typescript/bin/tsc", ["-b"]);
run("node_modules/vite/bin/vite.js", ["build"]);
run("node_modules/vite/bin/vite.js", [
  "build",
  "--ssr",
  "src/entry-server.tsx",
  "--outDir",
  "node_modules/.cache/beauty-prerender",
]);
run("scripts/prerender-home.mjs", []);
