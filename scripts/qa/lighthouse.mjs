import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import lighthouse from "lighthouse";

const url = process.env.QA_URL;
const port = Number(process.env.CHROME_DEBUG_PORT);
const preset = process.env.QA_PRESET;
if (!url || !Number.isInteger(port)) {
  throw new Error("Set QA_URL and CHROME_DEBUG_PORT for the externally managed Chrome instance.");
}
if (preset && preset !== "desktop") {
  throw new Error("QA_PRESET must be desktop when set.");
}

const outputDir = process.env.QA_OUTPUT_DIR ?? "lighthouse-reports";
await mkdir(outputDir, { recursive: true });
const result = await lighthouse(url, {
  port,
  output: ["json", "html"],
  logLevel: "info",
  ...(preset ? { preset } : {}),
});
if (!result) throw new Error("Lighthouse returned no result");
const reports = Array.isArray(result.report) ? result.report : [result.report];
if (reports.length !== 2 || reports.some((report) => typeof report !== "string")) {
  throw new Error("Lighthouse did not return JSON and HTML reports");
}

const reportPaths = [
  path.join(outputDir, "lighthouse.json"),
  path.join(outputDir, "lighthouse.html"),
];
await Promise.all(reportPaths.map((reportPath, index) => writeFile(reportPath, reports[index], "utf8")));

const scores = Object.fromEntries(
  Object.entries(result.lhr.categories).map(([category, value]) => [category, Math.round((value.score ?? 0) * 100)]),
);
process.stdout.write(`${JSON.stringify({ url, finalUrl: result.lhr.finalUrl, preset: preset ?? "mobile", reportPaths, scores })}\n`);
