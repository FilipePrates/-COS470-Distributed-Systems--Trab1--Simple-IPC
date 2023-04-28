process.stdin.resume();
import process from "node:process";
import { isPrime } from "../utils.js";

// O programa consumidor deve receber o
// n´umero e verificar se o mesmo ´e primo, imprimindo o resultado no terminal.

export async function consumidor_pipes(number) {
    console.log(`Consumidor (PID:${process.pid}) recebeu ${number} É primo? ${isPrime(number)}`)
    if(number == 0) process.exit()
}
if(process.argv[2]) consumidor_pipes(process.argv[2])
