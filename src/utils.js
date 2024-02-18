import { prerelease, clean } from "semver";

/**
 * @param {Error | null} error
 * @param {string | Buffer} stdout
 * @param {string | Buffer} stderr
 */
export function onExec(error, stdout, stderr) {
  if (error) {
    console.error(`error: ${error.message}`);
    return process.exit(1);
  }

  if (stderr) {
    return console.warn(`stderr:\n${stderr}`);
  }

  console.log(`stdout:\n${stdout}`);
}

/**
 * Validate the version and whether to tag it as a pre-release
 *
 * @param {{version: string}} opts
 * @returns {{version: string, tag: string}}
 */
export function parseOpts(opts) {
  if (!opts.version) {
    throw new Error("Missing version number: -v, --version <version>");
  }

  const version = clean(opts.version);
  if (!version) {
    throw new Error(`Invalid version number: ${opts.version}`);
  }

  const tag = prerelease(version) ? "pre-release" : "latest";
  if (!tag) {
    throw new Error(`Couldn't derive tag from ${version}`);
  }

  return { version, tag };
}
