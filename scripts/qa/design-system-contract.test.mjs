import assert from "node:assert/strict";
import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { validateDesignSystem } from "./design-system-contract.mjs";

const projectRoot = path.resolve(import.meta.dirname, "../..");

const withProject = async (mutation, assertion) => {
  const root = await mkdtemp(path.join(tmpdir(), "rf-design-contract-"));
  try {
    for (const item of ["DESIGN.md", "_config.yml", "_config.qa.yml", "_layouts", "_includes", "_sass", "assets", "qa"]) {
      await cp(path.join(projectRoot, item), path.join(root, item), { recursive: true });
    }
    await mutation(root);
    assertion(await validateDesignSystem({ root }));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
};

test("accepts the repository design system", async () => {
  const result = await validateDesignSystem({ root: projectRoot });
  assert.deepEqual(result.errors, []);
});

test("rejects an orphan color", async () => {
  await withProject(async (root) => {
    const file = path.join(root, "_sass", "rf", "_base.scss");
    const orphan = ["#12", "3456"].join("");
    await writeFile(file, `${await readFile(file, "utf8")}\n.orphan { color: ${orphan}; }\n`);
  }, ({ errors }) => assert(errors.some((error) => error.includes("raw hex"))));
});

test("rejects a shadow", async () => {
  await withProject(async (root) => {
    const file = path.join(root, "_sass", "rf", "_base.scss");
    await writeFile(file, `${await readFile(file, "utf8")}\n.shadow { box-shadow: none; }\n`);
  }, ({ errors }) => assert(errors.some((error) => error.includes("box-shadow"))));
});

test("rejects a missing focus target", async () => {
  await withProject(async (root) => {
    const file = path.join(root, "_sass", "rf", "_base.scss");
    await writeFile(file, (await readFile(file, "utf8")).replace(":focus-visible", ":focus-never"));
  }, ({ errors }) => assert(errors.some((error) => error.includes("focus style"))));
});

test("rejects a 43px control", async () => {
  await withProject(async (root) => {
    const file = path.join(root, "_sass", "rf", "_tokens.scss");
    await writeFile(file, (await readFile(file, "utf8")).replace("44px", "43px"));
  }, ({ errors }) => assert(errors.some((error) => error.includes("44px control"))));
});

test("rejects malformed SCSS", async () => {
  await withProject(async (root) => {
    const file = path.join(root, "_sass", "rf", "_base.scss");
    await writeFile(file, `${await readFile(file, "utf8")}\n.malformed {\n`);
  }, ({ errors }) => assert(errors.some((error) => error.includes("unbalanced SCSS"))));
});

test("rejects malformed showcase front matter", async () => {
  await withProject(async (root) => {
    const file = path.join(root, "qa", "primitive-showcase.md");
    const source = await readFile(file, "utf8");
    await writeFile(file, source.replace("\n---\n\n", "\n\n"));
  }, ({ errors }) => assert(errors.some((error) => error.includes("malformed front matter"))));
});

test("rejects a remote font URL", async () => {
  await withProject(async (root) => {
    const file = path.join(root, "_sass", "rf", "_fonts.scss");
    await writeFile(file, (await readFile(file, "utf8")).replace('url("/assets/fonts/', 'url("https://fonts.example.invalid/'));
  }, ({ errors }) => assert(errors.some((error) => error.includes("remote font request"))));
});

test("rejects production showcase and JavaScript leakage", async () => {
  const site = await mkdtemp(path.join(tmpdir(), "rf-design-prod-"));
  const qaSite = await mkdtemp(path.join(tmpdir(), "rf-design-qa-"));
  try {
    await mkdir(path.join(site, "qa", "primitive-showcase"), { recursive: true });
    await writeFile(path.join(site, "qa", "primitive-showcase", "index.html"), '<script src="/assets/app.js"></script>');
    await mkdir(path.join(qaSite, "qa", "primitive-showcase"), { recursive: true });
    await writeFile(path.join(qaSite, "qa", "primitive-showcase", "index.html"), "<!doctype html><title>QA</title>");
    const { errors } = await validateDesignSystem({ root: projectRoot, site, qaSite });
    assert(errors.some((error) => error.includes("production showcase leak")));
    assert(errors.some((error) => error.includes("production JavaScript leak")));
  } finally {
    await rm(site, { recursive: true, force: true });
    await rm(qaSite, { recursive: true, force: true });
  }
});
