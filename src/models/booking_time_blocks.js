import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Room } from "./rooms.js";

// Modelo de bloques de hora por reserva
export const BookingTimeBlocks = sequelize.define("booking_time_blocks", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Dia con bloque de tiempo para reservas
  day: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
    },
  },
  // Hora inicio reserva
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      is: /^([01]\d|2[0-3]):[0-5]\d$/,
    },
  },
  // Hora fin reserva
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      is: /^([01]\d|2[0-3]):[0-5]\d$/,
    },
  },
  // Id de la sala
  roomId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: Room,
      key: "id",
    },
  },
});
