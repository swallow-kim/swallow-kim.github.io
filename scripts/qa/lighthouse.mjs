import { mkdir } from "node:fs/promises";
import lighthouse from "lighthouse";

const url = process.env.QA_URL;
const port = Number(process.env.CHROME_DEBUG_PORT);
if (!url || !Number.isInteger(port)) {
  throw new Error("Set QA_URL and CHROME_DEBUG_PORT for the externally managed Chrome instance.");
}

const outputDir = process.env.QA_OUTPUT_DIR ?? "lighthouse-reports";
await mkdir(outputDir, { recursive: true });
const result = await lighthouse(url, { port, output: ["json", "html"], logLevel: "info" });
if (!result) throw new Error("Lighthouse returned no result");
process.stdout.write(`${JSON.stringify({ url, finalUrl: result.lhr.finalUrl, outputDir })}\n`);
