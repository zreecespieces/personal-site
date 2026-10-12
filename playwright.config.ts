import { defineConfig } from "@playwright/test";
import { existsSync, mkdirSync, realpathSync, statSync, symlinkSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

// All browser profiles, screenshots, traces, and reports stay on mounted NVME.
// Validate real paths/devices before creating directories; never silently fall back.
const nvme = realpathSync("/Volumes/NVME");
if (statSync(nvme).dev === statSync("/").dev || statSync(nvme).dev === statSync(dirname(nvme)).dev)
  throw new Error("QA requires the mounted NVME drive.");
const artifactRoot = resolve(process.env.PLAYWRIGHT_ARTIFACT_DIR || join(nvme, "personal-site-qa"));
function mediaDirectory(path: string) {
  let ancestor = path;
  while (!existsSync(ancestor)) ancestor = dirname(ancestor);
  const realAncestor = realpathSync(ancestor);
  const within = relative(nvme, realAncestor);
  if (within.startsWith("..") || statSync(realAncestor).dev !== statSync(nvme).dev) {
    throw new Error(`QA storage must resolve to mounted NVME: ${path}`);
  }
  mkdirSync(path, { recursive: true });
  if (statSync(realpathSync(path)).dev !== statSync(nvme).dev)
    throw new Error(`Invalid QA device: ${path}`);
  return path;
}
mediaDirectory(artifactRoot);
const temporaryDirectory = mediaDirectory(join(artifactRoot, "tmp"));
for (const key of ["TMPDIR", "TMP", "TEMP"]) process.env[key] = temporaryDirectory;
const run = (process.env.PLAYWRIGHT_RUN_ID ||= new Date().toISOString().replaceAll(/[:.]/g, "-"));
// Next's optimizer downloads media too, outside the browser's temporary profile.
// An existing internal cache must be copied and verified before replacing it.
const imageCache = resolve(".next/cache/images");
if (!existsSync(imageCache)) {
  mkdirSync(dirname(imageCache), { recursive: true });
  symlinkSync(mediaDirectory(join(artifactRoot, "image-cache")), imageCache, "dir");
}
mediaDirectory(imageCache);

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000, toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  fullyParallel: false,
  workers: 1,
  outputDir: mediaDirectory(join(artifactRoot, "runs", run, "results")),
  snapshotPathTemplate: `${mediaDirectory(join(artifactRoot, "snapshots"))}/{testFilePath}/{arg}{ext}`,
  reporter: [
    ["list"],
    [
      "html",
      { open: "never", outputFolder: mediaDirectory(join(artifactRoot, "runs", run, "report")) },
    ],
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100",
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command:
      process.env.PLAYWRIGHT_SERVER_COMMAND || "npm run dev -- --hostname 127.0.0.1 --port 3100",
    url: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3100",
    // Production verification must not silently reuse another app on the same port.
    reuseExistingServer: !process.env.CI && !process.env.PLAYWRIGHT_PRODUCTION,
    timeout: 120_000,
  },
});
