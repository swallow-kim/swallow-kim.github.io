import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const commandVersion = (command, args) =>
  execFileSync(command, args, { encoding: "utf8" }).trim();

export const npmInvocation = ({ platform = process.platform, env = process.env, execPath = process.execPath } = {}) => {
  if (env.npm_execpath) return { command: execPath, args: [env.npm_execpath, "--version"] };
  if (platform === "win32") {
    return { command: env.ComSpec ?? "cmd.exe", args: ["/d", "/s", "/c", "npm.cmd --version"] };
  }
  return { command: "npm", args: ["--version"] };
};

export const bundlerInvocation = () => ({
  command: "ruby",
  args: ["-S", "bundle", "--version"],
});

export const runDoctor = () => {
  const npm = npmInvocation();
  const bundler = bundlerInvocation();
  const report = {
    node: process.version,
    npm: commandVersion(npm.command, npm.args),
    ruby: commandVersion("ruby", ["--version"]),
    bundler: commandVersion(bundler.command, bundler.args),
  };

  if (!report.ruby.startsWith("ruby 3.3.4")) {
    throw new Error(`Expected Ruby 3.3.4, received: ${report.ruby}`);
  }
  if (Number.parseInt(process.versions.node, 10) < 20) {
    throw new Error(`Expected Node 20 or newer, received: ${report.node}`);
  }

  return report;
};

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  process.stdout.write(`${JSON.stringify(runDoctor(), null, 2)}\n`);
}
