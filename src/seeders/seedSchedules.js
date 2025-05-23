import { Schedule } from "../models/schedules.js";
import { Room } from "../models/rooms.js";

const initialSchedules = [
  // Lunes - Mañana
  {
    day: "Lunes",
    start_time: "08:15",
    end_time: "11:45",
    schedule: "Mañana",
  },
  // Lunes - Tarde
  {
    day: "Lunes",
    start_time: "14:15",
    end_time: "17:45",
    schedule: "Tarde",
  },
  // Martes - Solo Tarde (según el requisito)
  {
    day: "Martes",
    start_time: "14:15",
    end_time: "17:45",
    schedule: "Tarde",
  },
  // Miércoles - Mañana
  {
    day: "Miercoles",
    start_time: "08:15",
    end_time: "11:45",
    schedule: "Mañana",
  },
  // Miércoles - Tarde
  {
    day: "Miercoles",
    start_time: "14:15",
    end_time: "17:45",
    schedule: "Tarde",
  },
  // Jueves - Mañana
  {
    day: "Jueves",
    start_time: "08:15",
    end_time: "11:45",
    schedule: "Mañana",
  },
  // Jueves - Tarde
  {
    day: "Jueves",
    start_time: "14:15",
    end_time: "17:45",
    schedule: "Tarde",
  },
  // Viernes - Mañana
  {
    day: "Viernes",
    start_time: "08:15",
    end_time: "11:45",
    schedule: "Mañana",
  },
  // Viernes - Tarde
  {
    day: "Viernes",
    start_time: "14:15",
    end_time: "17:45",
    schedule: "Tarde",
  },
];

// Función para sembrar los horarios por sala
export const seedSchedules = async () => {
  try {
    // Verificar si ya existen registros
    const count = await Schedule.count();
    if (count > 0) {
      console.log("ℹ️ Los horarios ya existen, no se insertan duplicados.");
      return;
    }

    // Obtener todas las salas
    const rooms = await Room.findAll();

    // Para cada sala, crear los horarios
    for (const room of rooms) {
      // Crear horarios para esta sala
      const schedulesForRoom = initialSchedules.map((schedule) => ({
        ...schedule,
        roomId: room.id,
      }));

      await Schedule.bulkCreate(schedulesForRoom);
    }

    console.log("✔️ Horarios iniciales insertados correctamente");
  } catch (error) {
    console.error("❌ Error al insertar horarios:", error);
  }
};
