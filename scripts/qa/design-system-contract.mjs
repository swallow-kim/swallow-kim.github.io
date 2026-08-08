import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TOKENS = [0xF6F3EC, 0xFFFEFB, 0x17191C, 0x5F6368, 0xD8D4CB, 0x145DA0]
  .map((value) => `#${value.toString(16).padStart(6, "0").toUpperCase()}`);
const FONT_FILES = [
  "assets/fonts/source-serif-4/source-serif-4-latin-400-normal.woff2",
  "assets/fonts/source-serif-4/source-serif-4-latin-600-normal.woff2",
  "assets/fonts/ibm-plex-mono/ibm-plex-mono-latin-400-normal.woff2",
  "assets/fonts/ibm-plex-mono/ibm-plex-mono-latin-500-normal.woff2",
];

const exists = async (file) => {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
};

const walk = async (root) => {
  if (!(await exists(root)) && !(await stat(root).catch(() => null))?.isDirectory()) return [];
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    else files.push(target);
  }
  return files;
};

export async function validateDesignSystem({ root = ".", site, qaSite } = {}) {
  const errors = [];
  const designFile = path.join(root, "DESIGN.md");
  if (!(await exists(designFile))) errors.push("missing DESIGN.md");
  else {
    const design = await readFile(designFile, "utf8");
    for (let section = 0; section <= 8; section += 1) {
      if (!new RegExp(`^## ${section}\\.`, "m").test(design)) errors.push(`DESIGN.md missing section ${section}`);
    }
    for (const token of TOKENS) if (!design.includes(token)) errors.push(`DESIGN.md missing token ${token}`);
    if (!/No accepted debt/i.test(design)) errors.push("DESIGN.md must state no accepted debt");
  }

  const config = await readFile(path.join(root, "_config.yml"), "utf8");
  if (/^theme:\s*minima\s*$/m.test(config)) errors.push("Minima theme remains configured");
  if (!/^\s*-\s+qa\s*$/m.test(config)) errors.push("production config must exclude QA showcase sources");

  const qaConfigFile = path.join(root, "_config.qa.yml");
  if (!(await exists(qaConfigFile))) errors.push("missing QA build config");
  else if (!/^destination:\s*_site_qa\s*$/m.test(await readFile(qaConfigFile, "utf8"))) errors.push("QA config has wrong destination");

  const showcaseFile = path.join(root, "qa", "primitive-showcase.md");
  if (!(await exists(showcaseFile))) errors.push("missing QA primitive showcase source");
  else {
    const showcase = await readFile(showcaseFile, "utf8");
    if (!/^---\s*$[\s\S]*?^---\s*$/m.test(showcase)) errors.push("QA showcase has malformed front matter");
    if (!/^permalink:\s*\/qa\/primitive-showcase\/\s*$/m.test(showcase)) errors.push("QA showcase permalink missing");
    if (!/^sitemap:\s*false\s*$/m.test(showcase)) errors.push("QA showcase must be excluded from sitemap");
  }

  const tokenFile = path.join(root, "_sass", "rf", "_tokens.scss");
  if (!(await exists(tokenFile))) errors.push("missing SCSS token file");
  else {
    const tokens = await readFile(tokenFile, "utf8");
    for (const token of TOKENS) if (!tokens.includes(token)) errors.push(`SCSS token file missing ${token}`);
    if (!/--control-min:\s*44px\s*;/.test(tokens)) errors.push("SCSS token file must define a 44px control");
  }

  const sourceFiles = (await walk(root)).filter((file) => {
    const relative = path.relative(root, file).replaceAll("\\", "/");
    return /^(?:_layouts|_includes|_sass|assets\/css)\/.*\.(?:html|scss|css)$/i.test(relative);
  });
  const sourceText = await Promise.all(sourceFiles.map(async (file) => [file, await readFile(file, "utf8")]));
  const combined = sourceText.map(([, text]) => text).join("\n");
  for (const landmark of ["<header", "<nav", "<main", "<footer"]) {
    if (!combined.includes(landmark)) errors.push(`missing semantic landmark ${landmark}`);
  }
  if (!/class=["'][^"']*skip-link/.test(combined)) errors.push("missing skip link");
  if (!/^\s*:focus-visible\s*\{/m.test(combined)) errors.push("missing visible focus style");
  if (!/min-(?:height|block-size):\s*(?:var\([^)]*control[^)]*\)|44px)/.test(combined)) errors.push("missing 44px control contract");
  if (!/prefers-reduced-motion:\s*reduce/.test(combined)) errors.push("missing reduced-motion override");
  if (/https?:\/\/[^"')\s]+\.(?:woff2?|ttf|otf)/i.test(combined)) errors.push("remote font request in source");

  for (const [file, text] of sourceText) {
    const relative = path.relative(root, file).replaceAll("\\", "/");
    if (relative !== "_sass/rf/_tokens.scss" && /#[0-9a-f]{3,8}\b/i.test(text)) errors.push(`${relative}: raw hex outside token file`);
    if (/box-shadow\s*:/i.test(text)) errors.push(`${relative}: box-shadow forbidden`);
    if (/border-radius\s*:/i.test(text)) errors.push(`${relative}: rectangular border-radius forbidden`);
    const braces = [...text].reduce((count, character) => count + (character === "{" ? 1 : character === "}" ? -1 : 0), 0);
    if (braces !== 0) errors.push(`${relative}: unbalanced SCSS or template braces`);
  }

  for (const font of FONT_FILES) {
    const file = path.join(root, font);
    if (!(await exists(file))) errors.push(`missing local font ${font}`);
    else if ((await stat(file)).size < 1000) errors.push(`invalid local font ${font}`);
  }
  for (const license of [
    "assets/fonts/source-serif-4/LICENSE.txt",
    "assets/fonts/ibm-plex-mono/LICENSE.txt",
  ]) if (!(await exists(path.join(root, license)))) errors.push(`missing font license ${license}`);

  if (site) {
    const prodFiles = await walk(site);
    for (const file of prodFiles) {
      const relative = path.relative(site, file).replaceAll("\\", "/");
      if (/primitive-showcase/i.test(relative)) errors.push(`production showcase leak: ${relative}`);
     if (/\.html$/i.test(file)) {
       const html = await readFile(file, "utf8");
        if (/<script(?![\s>]*type=["']application\/ld\+json["'])|(?:src|href)=["'][^"']*\.js(?:[?"'])/i.test(html)) errors.push(`${relative}: production JavaScript leak`);
       if (/https?:\/\/[^"')\s]+\.(?:woff2?|ttf|otf)/i.test(html)) errors.push(`${relative}: remote font request`);
     }
    }
  }
  if (qaSite && !(await exists(path.join(qaSite, "qa", "primitive-showcase", "index.html")))) {
    errors.push("QA showcase route missing");
  }
  return { errors, filesChecked: sourceFiles.length };
}

const parseArgs = (args) => {
  const options = { root: "." };
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--root") options.root = args[++index];
    else if (args[index] === "--site") options.site = args[++index];
    else if (args[index] === "--qa-site") options.qaSite = args[++index];
    else throw new Error(`Unknown argument: ${args[index]}`);
  }
  return options;
};

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const result = await validateDesignSystem(parseArgs(process.argv.slice(2)));
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (result.errors.length > 0) process.exitCode = 1;
}
