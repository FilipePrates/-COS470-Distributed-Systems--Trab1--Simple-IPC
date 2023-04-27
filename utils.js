import child_process from "child_process";

export async function isProcessRunning(processName) {
  const cmd = await (() => {
    switch (process.platform) {
      case "win32":
        return `tasklist`;
      case "darwin":
        return `ps -ax | grep ${processName}`;
      case "linux":
        return `ps -A`;
      default:
        return false;
    }
  })();
  console.log("cmd", cmd);
  if (!cmd) {
    return false;
  }

  return new Promise((resolve, reject) => {
    child_process.exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err);
      resolve(stdout.toLowerCase().indexOf(processName.toLowerCase()) > -1);
    });
  });
}
