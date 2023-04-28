import { randomInt } from "node:crypto";

export async function produtor_pipes(stop = 1000) {
  try {
    let n = 1
    for(let i = 0; i < stop; i++){
        const delta = randomInt(100)
        n = n + delta
        pipeWrite.write(n)
    }
    pipeWrite.write("0\n")
    pipeWrite.end()
  } catch (e) {
    console.error(e);
  } finally {
    return;
  }
}

produtor_pipes(10)
