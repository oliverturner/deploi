#!/usr/bin/env node

import { exec } from "child_process";
import { Command } from "commander";

import { onExec, parseOpts } from "./utils.js";

const program = new Command();
program.option(
  "-v, --version <version>",
  "Package release version: e.g. 2.0.0-alpha.1"
);
program.parse();

try {
  const { version, tag } = parseOpts(program.opts());
  exec(`npm version ${version} -ws -q`, onExec);
  exec(`npm publish --tag ${tag} -ws -json`, onExec);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
