import assert from "node:assert/strict";
import { describe, it, after } from "node:test";
import { asyncSpawn } from "./helpers/async-spawn.js";

describe("cli", () => {
  /**
   * There's no --dry-run flag for `npm version`
   * Manually reset each package's version to 1.0.0
   */
  after(async () => {
    await asyncSpawn("npm", ["run", "reset"]);
    console.log("Resetting dev/* versions to 1.0.0... done");
  });

  it("should print the help", async () => {
    const { stdout, stderr } = await asyncSpawn("npx", [".", "--help"]);

    assert(stdout.includes("-v, --version <version>"));
    assert(stdout.includes("-h, --help"));
    assert(stderr === "");
  });

  it("should throw if no version is provided", async () => {
    const { stderr } = await asyncSpawn("npx", ["."]);
    assert(stderr.includes("Missing version number: -v, --version <version>"));
  });

  it("should throw if the version is invalid", async () => {
    const { stderr } = await asyncSpawn("npx", [".", "-v", "invalid"]);
    assert(stderr.includes("Invalid version number: invalid"));
  });

  it("should update the version and tag", async () => {
    const cpLatest = await asyncSpawn("npx", [".", "-v", "2.0.0"]);
    const matchesLatestVersion = cpLatest.stdout.match(/v2.0.0/g);
    const matchesLatestTag = cpLatest.stderr.match(/with tag latest/g);
    assert.equal(matchesLatestVersion.length, 3);
    assert.equal(matchesLatestTag.length, 3);

    const cpPre = await asyncSpawn("npx", [".", "-v", "2.0.0-alpha.1"]);
    const matchesPreVersion = cpPre.stdout.match(/v2.0.0-alpha.1/g);
    const matchesPreTag = cpPre.stderr.match(/with tag pre-release/g);
    assert.equal(matchesPreVersion.length, 3);
    assert.equal(matchesPreTag.length, 3);
  });
});
