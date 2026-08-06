import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const routes = [
  "/",
  "/about/",
  "/references/",
  "/posts/01-why-mobile-antenna-design-is-hard/",
  "/posts/02-the-ground-is-not-just-ground/",
  "/posts/03-ground-and-chassis-mode/",
  "/posts/04-j-and-m-controlling-the-coupling-mechanism/",
];

for (const route of routes) {
  test(`${route} responds and has a title`, async ({ page }) => {
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/\S/);
    expect(errors).toEqual([]);
    if (route === "/" && process.env.QA_SCREENSHOT_DIR) {
      await mkdir(process.env.QA_SCREENSHOT_DIR, { recursive: true });
      await page.screenshot({ fullPage: true, path: path.join(process.env.QA_SCREENSHOT_DIR, "baseline-home.png") });
    }
  });
}
