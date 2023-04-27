import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

import { programa1_sinais } from "./sinais/programa1.js";

rl.question("Identificador do Processo: ", function (processID) {
  rl.question("Sinal a ser enviado: ", function (signal) {
    console.log(
      `Programa1 Rodando... destination_PID:${processID}, signal:${signal}`
    );
    programa1_sinais(processID, signal);
  });
});
