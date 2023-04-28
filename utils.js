import child_process from "child_process";

export async function isProcessRunning(PID) {
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

  if (!cmd) {
    return false;
  }

  return new Promise((resolve, reject) => {
    child_process.exec(cmd, (err, stdout, stderr) => {
      if (err) reject(err);
      resolve(stdout.toLowerCase().indexOf(PID) > -1);
    });
  });
}


export function isPrime(num) {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1
}