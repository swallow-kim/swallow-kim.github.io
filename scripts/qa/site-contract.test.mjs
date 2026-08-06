import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { validateSite } from "./site-contract.mjs";

const origin = "https://swallow-kim.github.io";
const routes = [
  "/",
  "/about/",
  "/references/",
  "/notes/",
  "/404.html",
  "/posts/01-why-mobile-antenna-design-is-hard/",
  "/posts/02-the-ground-is-not-just-ground/",
  "/posts/03-ground-and-chassis-mode/",
  "/posts/04-j-and-m-controlling-the-coupling-mechanism/",
];

const routeFile = (root, route) =>
  route === "/" ? path.join(root, "index.html")
    : route.endsWith(".html") ? path.join(root, route.slice(1))
      : path.join(root, route.slice(1), "index.html");

const html = (route) => `<!doctype html><html lang="en"><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="RF field notes">
<title>RF Field Notes</title><link rel="canonical" href="${origin}${route}">
</head><body><h1>RF Field Notes</h1><a href="/about/">About</a></body></html>`;

const makeSite = async () => {
  const root = await mkdtemp(path.join(tmpdir(), "rf-contract-"));
  for (const route of routes) {
    const file = routeFile(root, route);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html(route));
  }
  await writeFile(path.join(root, "feed.xml"), `<feed><id>${origin}/</id></feed>`);
  await writeFile(path.join(root, "sitemap.xml"), `<urlset><loc>${origin}/</loc></urlset>`);
  await mkdir(path.join(root, "figures"));
  await writeFile(path.join(root, "figures", "fig1_1.png"), "fixture");
  return root;
};

const withSite = async (mutation, assertion) => {
  const root = await makeSite();
  try {
    await mutation(root);
    const result = await validateSite({ site: root, stage: "fixture" });
    assertion(result);
  } finally {
    await rm(root, { force: true, recursive: true });
  }
};

test("accepts a complete fixture", async () => {
  await withSite(async () => {}, ({ errors }) => assert.deepEqual(errors, []));
});

test("rejects a missing route", async () => {
  await withSite((root) => rm(routeFile(root, "/about/")), ({ errors }) =>
    assert(errors.some((error) => error.includes("missing route: /about/"))));
});

test("rejects forbidden private content", async () => {
  await withSite((root) => writeFile(routeFile(root, "/"), `${html("/")}05-when-the-ground-is-too-small`), ({ errors }) =>
    assert(errors.some((error) => error.includes("forbidden private content"))));
});

test("rejects duplicate H1", async () => {
  await withSite((root) => writeFile(routeFile(root, "/"), html("/").replace("</body>", "<h1>Duplicate</h1></body>")), ({ errors }) =>
    assert(errors.some((error) => error.includes("expected one H1, found 2"))));
});

test("rejects Markdown source links", async () => {
  await withSite((root) => writeFile(routeFile(root, "/"), html("/").replace("</body>", '<a href="draft.md">Draft</a></body>')), ({ errors }) =>
    assert(errors.some((error) => error.includes(".md link"))));
});

test("rejects a bad canonical", async () => {
  await withSite((root) => writeFile(routeFile(root, "/"), html("/").replace(origin, "https://example.invalid")), ({ errors }) =>
    assert(errors.some((error) => error.includes("bad or missing canonical"))));
});

test("rejects incomplete metadata", async () => {
  await withSite((root) => writeFile(routeFile(root, "/"), html("/").replace(/<meta name="description"[^>]+>\n/, "")), ({ errors }) =>
    assert(errors.some((error) => error.includes("missing description meta"))));
});

test("rejects feed and sitemap leakage", async () => {
  await withSite(async (root) => {
    await writeFile(path.join(root, "feed.xml"), `<feed>${origin}/posts/05-when-the-ground-is-too-small/</feed>`);
    await writeFile(path.join(root, "sitemap.xml"), `<urlset>${origin}/draft.md</urlset>`);
  }, ({ errors }) => {
    assert(errors.some((error) => error.startsWith("feed.xml: forbidden")));
    assert(errors.some((error) => error.startsWith("sitemap.xml: .md")));
  });
});

test("rejects missing alt on any other image", async () => {
  await withSite((root) => writeFile(routeFile(root, "/"), html("/").replace("</body>", '<img src="/figures/other.png"></body>')), ({ errors }) =>
    assert(errors.some((error) => error.includes("image missing alt: /figures/other.png"))));
});

test("allows only the staged baseline figure while requiring its file", async () => {
  const root = await makeSite();
  try {
    await writeFile(routeFile(root, "/"), html("/").replace("</body>", '<img src="/figures/fig1_1.png"></body>'));
    const result = await validateSite({ site: root, stage: "baseline" });
    assert(!result.errors.some((error) => error.includes("image missing alt")));
  } finally {
    await rm(root, { force: true, recursive: true });
  }
});
