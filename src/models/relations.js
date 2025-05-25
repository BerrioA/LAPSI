import { Room } from "./rooms.js";
import { Schedule } from "./schedules.js";
import { BookingTimeBlocks } from "./booking_time_blocks.js";
import { Booking } from "./booking.js";
import { User } from "./users.js";
import { VerificationCode } from "./verificationCodes.js";
import { Rol } from "./roles.js";
import { AvailableQuotas } from "./available_quotas.js";

// Un rol tiene muchos usuarios
Rol.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Rol, { foreignKey: "roleId" });

// Una sala tiene muchos horarios
Room.hasMany(Schedule, { foreignKey: "roomId" });
Schedule.belongsTo(Room, { foreignKey: "roomId" });

// Una sala tiene muchos bloques de tiempo
Room.hasMany(BookingTimeBlocks, { foreignKey: "roomId" });
BookingTimeBlocks.belongsTo(Room, { foreignKey: "roomId" });

// Un bloque de tiempo tiene muchas reservas
BookingTimeBlocks.hasMany(Booking, { foreignKey: "bookingTimeBlockId" });
Booking.belongsTo(BookingTimeBlocks, { foreignKey: "bookingTimeBlockId" });

// Un usuario tiene un codigo de verificacion
User.hasOne(VerificationCode, { foreignKey: "userId" });
VerificationCode.belongsTo(User, { foreignKey: "userId" });

// Un bloque de tiempo tiene muchos cupos disponibles por fecha
BookingTimeBlocks.hasMany(AvailableQuotas, {
  foreignKey: "bookingTimeBlockId",
});
AvailableQuotas.belongsTo(BookingTimeBlocks, {
  foreignKey: "bookingTimeBlockId",
});

// Un bloque de tiempo tiene muchas reservas
BookingTimeBlocks.hasMany(Booking, { foreignKey: "bookingTimeBlockId" });
Booking.belongsTo(BookingTimeBlocks, { foreignKey: "bookingTimeBlockId" });

console.log("✅ Relaciones entre modelos configuradas correctamente");
