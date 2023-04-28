import child_process from "child_process";

export async function isProcessRunning(PID) {
  const cmd = (() => {
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
  return cmd ? new Promise((resolve, reject) => {
    child_process.exec(cmd, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout.toLowerCase().indexOf(PID) > -1);
    });
  }) : false;
}


export function isPrime(num) {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1
}

export function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}