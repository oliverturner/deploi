import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { parseOpts } from "../../src/utils.js";

describe("parseOpts", () => {
  it("should throw if no version is provided", () => {
    // @ts-ignore
    assert.throws(() => parseOpts({}), {
      message: "Missing version number: -v, --version <version>",
    });
  });

  it("should throw if the version is invalid", () => {
    assert.throws(() => parseOpts({ version: "invalid" }), {
      message: "Invalid version number: invalid",
    });
  });

  it("should return the version and tag", () => {
    assert.deepEqual(parseOpts({ version: "2.0.0" }), {
      version: "2.0.0",
      tag: "latest",
    });
    assert.deepEqual(parseOpts({ version: "2.0.0-alpha.1" }), {
      version: "2.0.0-alpha.1",
      tag: "pre-release",
    });
  });
});
