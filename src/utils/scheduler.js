import cron from "node-cron";
import moment from "moment/moment.js";

import { updateReservationsFinished } from "../services/bookingService.js";

export const setupScheduledTasks = () => {
  // Ejecutar cada 5 minutos ('*/1 * * * *')
  const task = cron.schedule("*/1 * * * *", async () => {
    console.log("\n=== " + moment().format("YYYY-MM-DD HH:mm:ss") + " ===");
    console.log(
      "Ejecutando verificación automática de reservas finalizadas..."
    );

    await updateReservationsFinished();
    console.log("=== Fin de verificación ===\n");
  });

  console.log("Sistema de verificación automática de reservas iniciado");
  return task; // Devuelve la tarea para que pueda ser detenida si es necesario
};
