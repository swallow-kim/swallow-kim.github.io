import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { bundlerInvocation, npmInvocation } from "./doctor.mjs";

test("npm version probe completes through the platform launcher", () => {
  const invocation = npmInvocation();
  const result = spawnSync(invocation.command, invocation.args, { encoding: "utf8" });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout.trim(), /^\d+\.\d+\.\d+$/);
});

test("doctor never launches a Windows command shim directly", () => {
  const env = { ComSpec: "C:\\Windows\\System32\\cmd.exe" };
  assert.deepEqual(
    npmInvocation({ platform: "win32", env }),
    {
      command: "C:\\Windows\\System32\\cmd.exe",
      args: ["/d", "/s", "/c", "npm.cmd --version"],
    },
  );
  assert.deepEqual(
    bundlerInvocation(),
    {
      command: "ruby",
      args: ["-S", "bundle", "--version"],
    },
  );
});
