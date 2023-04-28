import readline from "readline";
import { spawn, fork } from "node:child_process";
import { programa1_sinais } from "./sinais/programa1.js";
import { programa2_sinais } from "./sinais/programa2.js";
import { consumidor_pipes } from "./pipes/consumidor.js";
import { servidor_sockets } from "./sockets/servidor.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  `PID: ${process.pid}\n`,
  "Coe monitor, quer executar qual parte do Projeto?"
);
console.log(
  "\n",
  "1 - Sinais. Programa1 pede um PID e signal para ser enviado\n",
  "2 - Sinais. Programa2 escuta sinais\n",
  "3 - Sinais. Programa1 se comunicando com Programa2\n",
  "4 - Pipes. Produtor gera potenciais primos, consumidor recebe e testa\n",
  "5 - Sockets. Através de TCP simular cliente-servidor com websockets.\n"
);
let menu = function () {
  rl.question("Qual vai? (1/2/3/4/5): ", function (fun) {
    switch (fun) {
      case "1":
        rl.question(
          "Identificador do Processo destino: ",
          function (processID) {
            let loop = function () {
              rl.question(
                "Sinal a ser enviado (SIGINT/SIGTERM/SIGPIPE): ",
                function (signal) {
                  console.log(
                    `Programa1: (PID:${process.pid}) destination_PID:${processID}, signal:${signal}...`
                  );
                  programa1_sinais(processID, signal, process.pid).then(() => {
                    loop();
                  });
                }
              );
            };
            loop();
          }
        );
        break;
      case "2":
        rl.question(
          "busy ou blocking wait? (block/busy): ",
          function (waitType) {
            console.log(
              `Programa2: (PID:${process.pid}) wait_type:${waitType}...`
            );
            programa2_sinais(waitType);
          }
        );
        break;
      case "3":
        const program2 = spawn("node", ["./sinais/programa2.js", "blocking"]);
        program2.stdout.on("data", (data) => {
          console.log(`Programa2: ${data}`);
        });
        program2.on("exit", function () {
          process.exit();
        });
        talk(program2.pid, process.pid);
        break;
      case "4":
        rl.question("Gerar quantos potenciais primos?: ", function (num) {
          const child = spawn("node", ["./pipes/produtor.js", num]);
          child.stdout.on("data", async (data) => {
            console.log(`${data}`);
            let payload = `${data}`.split(" ");
            consumidor_pipes(payload[payload.length - 1]);
          });
        });
        break;
      case "5":
        rl.question("Gerar quantos potenciais primos?: ", function (num) {
          const child = spawn("node", ["./sockets/cliente.js", num]);
          child.stdout.on("data", async (data) => {
            console.log(`${data}`);
            let payload = `${data}`.split(" ");
            servidor_sockets(payload[payload.length - 1]);
          });
        });
        break;
      default:
        console.log("respeita as opções pf");
        menu();
    }
  });
};
menu();

// o Terceiro signal não usado na cone
let talk = function (child_pid, process_pid) {
  setTimeout(() => {
    console.log(
      `Programa1: (PID:${process.pid}) Enviando SIGINT para ${child_pid}`
    );
    programa1_sinais(child_pid, "SIGINT", process_pid).then(() => {
      console.log(
        `Programa1: (PID:${process_pid}) Enviando SIGTERM para ${child_pid}`
      );
      programa1_sinais(child_pid, "SIGTERM", process_pid).then(() => {
        console.log(
          `Programa1: (PID:${process_pid}) Enviando SIGINT para ${child_pid}`
        );
        programa1_sinais(child_pid, "SIGINT", process_pid).then(() => {
          console.log(
            `Programa1: (PID:${process_pid}) Enviando SIGPIPE para ${child_pid}`
          );
          programa1_sinais(child_pid, "SIGPIPE", process_pid);
        });
      });
    });
  }, 1000);
};
