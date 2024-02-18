import { spawn } from "node:child_process";

/**
 * @param {string} cmd
 * @param {string[]} args
 * @returns
 */
export function asyncSpawn(cmd, args) {
  return new Promise((resolve, reject) => {
    const cp = spawn(cmd, args);
    const stderr = [];
    const stdout = [];

    cp.on("error", (err) => {
      stderr.push(err.toString());
    });

    cp.stdout.on("data", (data) => {
      stdout.push(data.toString());
    });

    cp.stderr.on("data", (data) => {
      stderr.push(data.toString());
    });

    cp.on("close", () => {
      resolve({
        stdout: stdout.join(""),
        stderr: stderr.join(""),
      });
    });
  });
}
