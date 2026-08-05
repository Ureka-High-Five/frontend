const { spawnSync } = require("node:child_process");

const project = process.argv[2];
const projectDirectories = {
  "@lead-me/service": "apps/service/",
  "@lead-me/admin": "apps/admin/",
};
const projectDirectory = projectDirectories[project];

if (!projectDirectory) {
  console.error(`Unknown workspace: ${project}`);
  process.exit(1);
}

const previousCommit = process.env.CACHED_COMMIT_REF;
const currentCommit = process.env.COMMIT_REF;

if (!previousCommit || !currentCommit) {
  console.log("Commit range is unavailable; the build will run.");
  process.exit(1);
}

const result = spawnSync(
  "git",
  ["diff", "--name-only", previousCommit, currentCommit],
  { encoding: "utf8" },
);

if (result.status !== 0) {
  console.log("Git diff failed; the build will run.");
  process.exit(1);
}

const globalFiles = new Set([
  ".nvmrc",
  "package.json",
  "package-lock.json",
  "scripts/netlify-ignore.cjs",
  "turbo.json",
  "tsconfig.base.json",
  ".eslintrc.cjs",
]);
const changedFiles = result.stdout.split(/\r?\n/).filter(Boolean);
const hasRelevantChanges = changedFiles.some(
  (file) =>
    file.startsWith(projectDirectory) ||
    file.startsWith("packages/") ||
    globalFiles.has(file),
);

if (hasRelevantChanges) {
  console.log(`${project} has relevant changes; the build will run.`);
  process.exit(1);
}

console.log(`${project} is unaffected; Netlify can skip this build.`);
process.exit(0);
