import { expect, test } from "@playwright/test";
import axe from "axe-core";

const routes = [
  "/",
  "/about/",
  "/notes/",
  "/posts/01-why-mobile-antenna-design-is-hard/",
  "/posts/02-the-ground-is-not-just-ground/",
  "/posts/03-ground-and-chassis-mode/",
  "/posts/04-j-and-m-controlling-the-coupling-mechanism/",
];
const viewports = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1280", width: 1280, height: 900 },
];

for (const viewport of viewports) {
  test(`primary routes reflow at ${viewport.name}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      const errors = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page).toHaveTitle(/\S/);
      await page.evaluate(() => document.fonts.ready);
      const geometry = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1Count: document.querySelectorAll("h1").length,
      }));
      expect(geometry.h1Count, route).toBe(1);
      expect(geometry.scrollWidth, route).toBeLessThanOrEqual(geometry.clientWidth);
      expect(errors, route).toEqual([]);
      page.removeAllListeners("console");
      page.removeAllListeners("pageerror");
    }
  });
}

test("primary pages have no serious automated accessibility violations", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const route of ["/", "/notes/", "/about/", routes[3]]) {
    await page.goto(route);
    await page.addScriptTag({ content: axe.source });
    const result = await page.evaluate(() => globalThis.axe.run(document, {
      resultTypes: ["violations"],
    }));
    const serious = result.violations.filter(({ impact }) => impact === "critical" || impact === "serious");
    expect(serious, route).toEqual([]);
  }
});
