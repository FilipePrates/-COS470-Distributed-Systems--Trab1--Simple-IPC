process.stdin.resume();
import process from "node:process";

import { isPrime } from "../utils.js";

export async function consumidor_pipes(number) {
    console.log(isPrime(number))
}

if(process.argv[2]) consumidor_pipes(process.argv[2])
