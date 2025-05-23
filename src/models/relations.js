import { Room } from "./rooms.js";
import { Schedule } from "./schedules.js";
import { BookingTimeBlocks } from "./booking_time_blocks.js";
import { Booking } from "./booking.js";

// Configurar relaciones
export const setupRelations = () => {
  // Una sala tiene muchos horarios
  Room.hasMany(Schedule, { foreignKey: "roomId" });
  Schedule.belongsTo(Room, { foreignKey: "roomId" });

  // Una sala tiene muchos bloques de tiempo
  Room.hasMany(BookingTimeBlocks, { foreignKey: "roomId" });
  BookingTimeBlocks.belongsTo(Room, { foreignKey: "roomId" });

  // Un bloque de tiempo tiene muchas reservas
  BookingTimeBlocks.hasMany(Booking, { foreignKey: "bookingTimeBlockId" });
  Booking.belongsTo(BookingTimeBlocks, { foreignKey: "bookingTimeBlockId" });

  console.log("✅ Relaciones entre modelos configuradas correctamente");
};
