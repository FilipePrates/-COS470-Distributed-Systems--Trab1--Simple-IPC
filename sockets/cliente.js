import process from "node:process";
import { randomInt } from "node:crypto";
import { sleep } from "../utils.js";

// Implemente um programa Produtor-Consumidor com resposta com dois processos e sockets para
// fazer a comunica¸c˜ao. Utilize sockets to tipo TCP. Dessa forma, o programa consumidor deve
// fazer o papel de servidor (aguarda conex˜ao) e o programa produtor deve fazer o papel de cliente
// (inicia a conex˜ao).
// Novamente, o programa produtor deve gerar n´umeros inteiros aleat´orios e crescentes (conforme acima) e o programa consumidor deve receber o n´umero e verificar se o mesmo ´e primo.
// Diferentemente do exerc´ıcio acima, o programa consumidor deve enviar uma mensagem ao produtor informando se o n´umero recebido ´e ou n˜ao primo, e este ´ultimo deve imprimir o resultado
// no terminal. Implemente um protocolo bem simples, onde o produtor gera um n´umero, envia
// ao consumidor, e aguarda a resposta de forma bloqueante. O programa produtor deve se conectar ao programa consumidor, enviar o n´umero gerado, e aguardar o resultado. O programa
// consumidor aguarda a conex˜ao, recebe o n´umero gerado, determina se o mesmo ´e primo, envia
// o resultado ao produtor, e volta a esperar a chegada do pr´oximo n´umero (mantendo a conex˜ao
// aberta).
const WebSocket = require('ws');

export async function cliente_sockets(stop = 1000) {
  try {
    const ws = new WebSocket('ws://localhost:8080');
    let n = 1
    ws.on('open', () => {
        console.log(`Cliente: (PID:${process.pid}) Conectou através do Websocket`);
        for(let i = 0; i < stop; i++){
            const delta = randomInt(100)
            n = n + delta
            console.log(`Cliente: (PID:${process.pid}) gerou ${n}`)
            ws.send(n.toString())
            sleep(300)
        }
        console.log(`Cliente: (PID:${process.pid}) gerou: ${0}`)
        ws.send('0')
        process.exit()
    });
    ws.on('message', (data) => {
        console.log(`Cliente: (PID:${process.pid}) recebeu ${data}`);
        if(data == 0) process.exit()
    });


  } catch (e) {
    console.error(e);
  } finally {
    return;
  }
}
if(process.argv[2]) cliente_sockets(process.argv[2])
