process.stdin.resume();

import process from "node:process";
import { isPrime } from "../utils.js";

// O programa consumidor deve receber o
// n´umero e verificar se o mesmo ´e primo, imprimindo o resultado no terminal.

// precisa tirar o type = "module" do package_json pro require('ws') funcionar.... Javascript e node.js não foi a escolha certa, tarde demais para mudar
// const wss = new WebSocket.Server({ port: 8080 });

export async function servidor_sockets(number) {
    wss.on('connection', (ws) => {
        console.log(`Servidor: (PID:${process.pid}) Conectou através do Websocket`);
        ws.on('message', (data) => {
            console.log(`Servidor: (PID:${process.pid} recebeu ${data}`);
            ws.send(`Servidor: (PID:${process.pid} recebeu ${parseInt(data, 20)}`);
           
        });
    });
    console.log(`Servidor (PID:${process.pid}) recebeu ${number} É primo? ${isPrime(number)}`)
    if(number == 0) {
        ws.send('0')
        process.exit()
    } 
}
if(process.argv[2]) servidor_sockets(process.argv[2])
