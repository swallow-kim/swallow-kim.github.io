import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "browser-smoke.spec.mjs",
  reporter: "line",
  use: {
    baseURL: process.env.QA_BASE_URL ?? "http://127.0.0.1:4000",
    ...(process.env.QA_BROWSER_CHANNEL ? { channel: process.env.QA_BROWSER_CHANNEL } : {}),
  },
});
