// O segundo programa deve ser capaz de receber alguns sinais espec´ıficos. Para isto, vocˆe
// precisa definir signal handlers. Seu programa deve capturar e reagir a trˆes sinais diferentes
// (de sua escolha), ou mais, imprimindo no terminal uma mensagem diferente para cada
// sinal. Al´em disso, um dos sinais sendo capturados deve terminar a execu¸c˜ao do programa,
// ou seja, sua signal handler deve terminar o processo. Repare que ap´os estipular as signal
// handlers seu programa fica aguardando a chegada de sinais. Vocˆe deve implementar duas
// formas de esperar, busy wait e blocking wait (passado como parˆametro para o programa).
// Descubra como implementar cada um destas formas de fazer um processo esperar!
import process from "node:process";

export async function programa2_sinais(wait_type) {
  try {
    process.stdin.resume();
    switch(wait_type){
      case 'busy':
        let received = false
        while(!received){
          // 🥲
          process.on("SIGINT", () => {
            console.log("Recebido sinal 'SIGINT'.");
          });
          process.on("SIGTERM", () => {
            console.log("Recebido sinal 'SIGTERM'.");
          });
          process.on("SIGPIPE", () => {
            console.log("Hora de testar os Pipes??");
            process.exit()
          });
        }
      case 'blocking':
        process.on("SIGINT", () => {
          console.log("Recebido sinal 'SIGINT'.");
        });
        process.on("SIGTERM", () => {
          console.log("Recebido sinal 'SIGTERM'.");
        });
        process.on("SIGPIPE", () => {
          console.log("Hora de testar os Pipes??");
          process.exit()
        });
    }

  } catch (e) {
    console.error(e);
  } finally {
    return;
  }
}
if(process.argv[2]) programa2_sinais(process.argv[2]);

