import { randomInt } from "node:crypto";

export async function produtor_pipes(wait_type) {
  try {
    let start = 1
    for(let i = 0; i < n; i++){
        const delta = randomInt({min:1, max: 100})
        start = start + delta
        pipeWrite.write(message)
    }
    pipeWrite.write("0\n")
    pipeWrite.end()
  } catch (e) {
    console.error(e);
  } finally {
    return;
  }
}
