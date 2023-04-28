import process from "node:process";
import { randomInt } from "node:crypto";
import { sleep } from "../utils.js";

// O programa produtor deve gerar n´umeros inteiros aleat´orios e crescentes, da seguinte forma: Ni = Ni−1+∆,
// onde N0 = 1 e ∆ ´e um valor aleat´orio entre 1 e 100. 

// Usando o log e o pipe process.stdout.on() com o processo Pai

export async function produtor_pipes(stop = 1000) {
  try {
    let n = 1
    for(let i = 0; i < stop; i++){
        const delta = randomInt(100)
        n = n + delta
        console.log(`Produtor (PID:${process.pid}) gerou ${n}`)
        sleep(300)
    }
    console.log(`Produtor (PID:${process.pid}) gerou: ${0}`)
    process.exit()
  } catch (e) {
    console.error(e);
  } finally {
    return;
  }
}
if(process.argv[2]) produtor_pipes(process.argv[2])
