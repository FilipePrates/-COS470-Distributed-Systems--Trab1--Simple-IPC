// O primeiro programa deve ser capaz de enviar um sinal a qualquer outro processo. Este
// programa recebe como parˆametros o n´umero do processo destino e o sinal que deve ser
// enviado. Seu programa deve verificar se o processo indicado pelo parˆametro existe, e
// retornar um erro em caso caso negativo. Caso positivo, seu programa deve enviar o sinal
// indicado.

import { isProcessRunning } from "../utils.js";

export async function programa1_sinais(destination_PID, signal) {
  try {
    const destinationExists = await isProcessRunning(destination_PID);
    if (!destinationExists) throw "Processo não encontrado.";
    await process.kill(destination_PID, signal);
  } catch (e) {
    console.error(e);
  } finally {
    return;
  }
}
