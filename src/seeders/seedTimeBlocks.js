import { BookingTimeBlocks } from "../models/booking_time_blocks.js";
import { Room } from "../models/rooms.js";

// Bloques de tiempo base de 1 hora
const TIME_BLOCKS = [
  { start: "08:15", end: "09:00" },
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "11:45" },
  { start: "14:15", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" },
  { start: "17:00", end: "17:45" },
];

const DAYS_OF_WEEK = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

// Función para sembrar los bloques de tiempo por aula y día
export const seedTimeBlocks = async () => {
  try {
    const count = await BookingTimeBlocks.count();
    if (count > 0) {
      console.log(
        "ℹ️ Ya existen bloques de tiempo, no se insertan duplicados."
      );
      return;
    }

    const rooms = await Room.findAll();
    if (!rooms.length) {
      console.warn("⚠️ No hay aulas registradas.");
      return;
    }

    const allTimeBlocks = [];

    for (const room of rooms) {
      for (const day of DAYS_OF_WEEK) {
        const filteredBlocks = TIME_BLOCKS.filter(({ start }) => {
          const hour = parseInt(start.split(":")[0], 10);
          return day === "Martes" ? hour >= 14 : true;
        });

        // Bloques de 1 hora
        for (const { start, end } of filteredBlocks) {
          allTimeBlocks.push({
            day,
            start_time: start,
            end_time: end,
            duration: 1,
            quotas_available: room.quotas,
            roomId: room.id,
          });
        }

        // Bloques de 2 horas (encadenar bloques contiguos)
        for (let i = 0; i < filteredBlocks.length - 1; i++) {
          const current = filteredBlocks[i];
          const next = filteredBlocks[i + 1];

          // Solo crear bloques de 2 horas si el fin de uno es el inicio del otro
          if (current.end === next.start) {
            allTimeBlocks.push({
              day,
              start_time: current.start,
              end_time: next.end,
              duration: 2,
              quotas_available: room.quotas,
              roomId: room.id,
            });
          }
        }
      }
    }

    await BookingTimeBlocks.bulkCreate(allTimeBlocks);

    console.log(
      `✔️ Se insertaron ${allTimeBlocks.length} bloques de tiempo (1h y 2h) correctamente.`
    );
  } catch (error) {
    console.error("❌ Error al insertar bloques de tiempo:", error.message);
  }
};
