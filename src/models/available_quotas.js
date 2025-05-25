import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { BookingTimeBlocks } from "./booking_time_blocks.js";

// Modelo de cupos disponibles por fecha y bloque de hora
export const AvailableQuotas = sequelize.define("available_quotas", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Fecha de reserva
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  // Cupos ocupados
  occupied_quotas: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      isNumeric: true,
      min: 0,
    },
  },
  // Hora inicio reserva
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      is: /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
    },
  },
  // Hora fin reserva
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      is: /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
    },
  },
  // ID del bloque de tiempo reservado
  bookingTimeBlockId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: BookingTimeBlocks,
      key: "id",
    },
  },
});

// // Un bloque de tiempo tiene muchos cupos disponibles por fecha
// BookingTimeBlocks.hasMany(AvailableQuotas, {
//   foreignKey: "bookingTimeBlockId",
// });
// AvailableQuotas.belongsTo(BookingTimeBlocks, {
//   foreignKey: "bookingTimeBlockId",
// });
