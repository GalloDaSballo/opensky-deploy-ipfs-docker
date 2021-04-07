import { exec } from "child_process";
// from: https://github.com/infinitered/gluegun/blob/master/src/toolbox/system-tools.ts
/**
 * Executes a commandline program asynchronously.
 *
 * @param commandLine The command line to execute.
 * @param options Additional child_process options for node.
 * @returns Promise with result.
 */
async function run(commandLine, options = {}) {
  const trimmer = options && options.trim ? (s) => s.trim() : (s) => s;
  const { trim, ...nodeOptions } = options;

  return new Promise((resolve, reject) => {
    exec(commandLine, nodeOptions, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        return reject(error);
      }
      resolve(trimmer(stdout || ""));
    });
  });
}

const compileAndDeploy = async (authorAddress) => {
  console.log("Building your app");
  if (!authorAddress) {
    throw new Error("Please have an author address");
  }
  const compile = await run("yarn compile", {
    env: { ...process.env, REACT_APP_AUTHOR_ADDRESS: authorAddress },
  });
  console.log("compile", compile);
  console.log("Deploying it to IPFS");
  const deploy = await run("yarn deploy");
  console.log("deploy", deploy);
  // Cid
  // You could then have them use ENS SDK to set a domain they own to use the CID
  return deploy;
};

export default compileAndDeploy;
