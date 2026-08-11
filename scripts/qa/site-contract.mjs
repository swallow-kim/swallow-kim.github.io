import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ORIGIN = "https://swallow-kim.github.io";
const CURRENT_ROUTES = [
  "/",
  "/about/",
  "/notes/",
  "/posts/01-why-mobile-antenna-design-is-hard/",
  "/posts/02-the-ground-is-not-just-ground/",
  "/posts/03-ground-and-chassis-mode/",
  "/posts/04-j-and-m-controlling-the-coupling-mechanism/",
];
const FINAL_ROUTES = ["/404.html"];
const PRIVATE_MARKERS = [
  "05-when-the-ground-is-too-small",
  "06-metal-chassis-obstacle-or-radiator",
  "07-mimo-antennas-as-a-multi-mode-design-problem",
  "08-when-antenna-modes-meet-noise-modes",
  "09-beyond-s11-practical-mobile-antenna-design-checklist",
  "Mobile Antenna Design Notes #5",
  "Mobile Antenna Design Notes #6",
  "Mobile Antenna Design Notes #7",
  "Mobile Antenna Design Notes #8",
  "Mobile Antenna Design Notes #9",
];
const REQUIRED_CHAPTER_FIGURES = [
  "fig1_2",
  "fig2_1",
  "fig2_2",
  "fig3_1",
  "fig3_2",
  "fig3_3",
  "fig4_1",
  "fig4_2",
  "fig4_4",
].flatMap((stem) => [`${stem}.png`, `${stem}.svg`]);

const routeFile = (site, route) =>
  route === "/"
    ? path.join(site, "index.html")
    : route.endsWith(".html")
      ? path.join(site, route.slice(1))
      : path.join(site, route.slice(1), "index.html");

const exists = async (file) => {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
};

const walk = async (root) => {
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else files.push(target);
  }
  return files;
};

const count = (text, pattern) => [...text.matchAll(pattern)].length;
const hasMeta = (html, key, value) => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.some((tag) => {
    const keyed = new RegExp(`(?:name|property)=["']${key}["']`, "i").test(tag);
    const content = /content=["'][^"']+["']/i.test(tag);
    return keyed && (!value || new RegExp(`content=["']${value}["']`, "i").test(tag)) && content;
  });
};

export async function validateSite({ site, stage = "baseline" }) {
  const errors = [];
  const strict = stage === "final" || stage === "fixture";
  const requiredRoutes = strict ? [...CURRENT_ROUTES, ...FINAL_ROUTES] : CURRENT_ROUTES;

  for (const route of requiredRoutes) {
    if (!(await exists(routeFile(site, route)))) errors.push(`missing route: ${route}`);
  }

  const files = await walk(site);
  const textFiles = files.filter((file) => /\.(?:html|xml)$/i.test(file));
  for (const file of textFiles) {
    const relative = path.relative(site, file).replaceAll("\\", "/");
    const text = await readFile(file, "utf8");
    if (/href=["'][^"']*\.md(?:[?#"'])/i.test(text)) errors.push(`${relative}: .md link`);
    if (strict && /data-proofer-ignore/i.test(text)) errors.push(`${relative}: baseline proofer exemption remains`);
    for (const tag of text.match(/<img\b[^>]*>/gi) ?? []) {
      const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
      const baselineImage = stage === "baseline" && src === "/figures/fig1_1.png";
      if (!/\balt=["'][^"']*["']/i.test(tag) && !baselineImage) {
        errors.push(`${relative}: image missing alt: ${src ?? "unknown source"}`);
      }
    }

    const isPrivateArtifact = PRIVATE_MARKERS.some((marker) => relative.includes(marker));
    if (strict || (relative.endsWith(".html") && !isPrivateArtifact)) {
      for (const marker of PRIVATE_MARKERS) {
        if (text.includes(marker)) errors.push(`${relative}: forbidden private content: ${marker}`);
      }
    }
  }

  if (!(await exists(path.join(site, "figures", "fig1_1.png")))) {
    errors.push("missing baseline figure: /figures/fig1_1.png");
  }
  for (const figure of REQUIRED_CHAPTER_FIGURES) {
    if (!(await exists(path.join(site, "figures", figure)))) {
      errors.push(`missing chapter figure: /figures/${figure}`);
    }
  }

  const h1Routes = strict ? requiredRoutes : ["/about/"];
  for (const route of h1Routes) {
    const file = routeFile(site, route);
    if (!(await exists(file))) continue;
    const html = await readFile(file, "utf8");
    const h1Count = count(html, /<h1\b[^>]*>/gi);
    if (h1Count !== 1) errors.push(`${route}: expected one H1, found ${h1Count}`);
    if (!/<title\b[^>]*>[^<]+<\/title>/i.test(html)) errors.push(`${route}: missing title`);
    if (!hasMeta(html, "description")) errors.push(`${route}: missing description meta`);
    if (!hasMeta(html, "viewport")) errors.push(`${route}: missing viewport meta`);
    const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]
      ?? html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1];
    if (!canonical?.startsWith(ORIGIN)) errors.push(`${route}: bad or missing canonical`);
  }

  for (const xmlName of ["feed.xml", "sitemap.xml"]) {
    const file = path.join(site, xmlName);
    if (!(await exists(file))) {
      errors.push(`missing ${xmlName}`);
      continue;
    }
    const xml = await readFile(file, "utf8");
    if (!xml.includes(ORIGIN)) errors.push(`${xmlName}: missing production origin`);
    if (/\.md(?:<|[?#])/i.test(xml)) errors.push(`${xmlName}: .md leakage`);
    if (strict) {
      for (const marker of PRIVATE_MARKERS) {
        if (xml.includes(marker)) errors.push(`${xmlName}: forbidden private content: ${marker}`);
      }
    }
  }

  return { errors, filesChecked: textFiles.length, requiredRoutes, stage };
}

const parseArgs = (args) => {
  const options = { site: "_site", stage: "baseline" };
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--site") options.site = args[++index];
    else if (args[index] === "--stage") options.stage = args[++index];
    else throw new Error(`Unknown argument: ${args[index]}`);
  }
  if (!options.site || !["baseline", "final", "fixture"].includes(options.stage)) {
    throw new Error("Usage: site-contract.mjs [--site DIR] [--stage baseline|final|fixture]");
  }
  return options;
};

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const result = await validateSite(parseArgs(process.argv.slice(2)));
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (result.errors.length > 0) process.exitCode = 1;
}
