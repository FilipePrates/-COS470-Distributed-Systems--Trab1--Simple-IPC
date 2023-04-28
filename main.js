import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

import { programa1_sinais } from "./sinais/programa1.js";
import { programa2_sinais } from "./sinais/programa2.js";

console.log("Coe monitor, quer executar qual parte do Projeto?");
console.log(
  `PID: ${process.pid}\n`,
  "1 - Sinais. Programa1 pede um PID e signal para ser enviado\n",
  "2 - Sinais. Programa2 escuta sinais\n",
  "3 - Sinais. Programa1 se comunicando com Programa2\n"
);
let menu = function () {
  rl.question("Qual vai? (1/2/3/4/5/6/7): ", function (fun) {
    switch (fun) {
      case "1":
        rl.question("Identificador do Processo destino: ",
          function (processID) {
            let loop = function (){
              rl.question("Sinal a ser enviado (SIGINT/SIGTERM/SIGPIPE): ", function (signal) {
                console.log(
                  `Programa 1 Rodando... destination_PID:${processID}, signal:${signal}...`
                );
                programa1_sinais(processID, signal).then(()=>{loop()});
              });
            }
            loop()
          }
        )
        break;
      case "2":
        rl.question(
          "busy ou blocking wait? (block/busy): ",
          function (waitType) {
            console.log(
              `Programa 2 Rodando... wait_type:${waitType}...`
            );
            programa2_sinais(waitType);
          }
        );
        break;
      case "3":
        rl.question(
          "Identificador do Processo destino: ",
          function (processID) {
            rl.question("Sinal a ser enviado: ", function (signal) {
              console.log(
                `Programa1 Rodando... destination_PID:${processID}, signal:${signal}`
              );
              programa1_sinais(processID, signal);
            });
          }
        );
        break;
      default:
        console.log("respeita as opções pf");
        menu();
    }
  });
};

menu();
