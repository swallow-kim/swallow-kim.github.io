import { execFileSync } from "node:child_process";

const commandVersion = (command, args) =>
  execFileSync(command, args, { encoding: "utf8" }).trim();

const report = {
  node: process.version,
  npm: commandVersion(process.platform === "win32" ? "npm.cmd" : "npm", ["--version"]),
  ruby: commandVersion("ruby", ["--version"]),
  bundler: commandVersion("bundle", ["--version"]),
};

if (!report.ruby.startsWith("ruby 3.3.4")) {
  throw new Error(`Expected Ruby 3.3.4, received: ${report.ruby}`);
}
if (Number.parseInt(process.versions.node, 10) < 20) {
  throw new Error(`Expected Node 20 or newer, received: ${report.node}`);
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
