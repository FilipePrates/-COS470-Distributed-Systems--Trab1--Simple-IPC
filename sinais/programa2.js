// O segundo programa deve ser capaz de receber alguns sinais espec´ıficos. Para isto, vocˆe
// precisa definir signal handlers. Seu programa deve capturar e reagir a trˆes sinais diferentes
// (de sua escolha), ou mais, imprimindo no terminal uma mensagem diferente para cada
// sinal. Al´em disso, um dos sinais sendo capturados deve terminar a execu¸c˜ao do programa,
// ou seja, sua signal handler deve terminar o processo. Repare que ap´os estipular as signal
// handlers seu programa fica aguardando a chegada de sinais. Vocˆe deve implementar duas
// formas de esperar, busy wait e blocking wait (passado como parˆametro para o programa).
// Descubra como implementar cada um destas formas de fazer um processo esperar!
import process from "node:process";
import readline from "readline";

export async function programa2_sinais(wait_type) {
  try {
    console.log(wait_type);
    // Como eu tou no Windows, preciso escutar os eventos com o readline e passar esse evento para o programa2.
    if (process.platform === "win32") {
      var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.on("DASD", function () {
        console.log("sigInt");
        process.emit("SIGINT");
      });
    }
    process.on("SIGINT", () => {
      console.log("Recebido sinal 'SIGINT'.");
      process.exit();
    });
    process.on("PONG", () => {
      console.log("Recebido sinal 'PONG'.");
    });
    process.on("SIGKILL", () => {
      console.log("Recebido sinal 'SIGKILL'. Terminando o processo.");
      process.exit();
    });
  } catch (e) {
    console.error(e);
  } finally {
    return;
  }
}
