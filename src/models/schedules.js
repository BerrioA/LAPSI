import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Room } from "./rooms.js";

// Modelo de horarios
export const Schedule = sequelize.define("schedules", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Dias de horarios disponibles
  day: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
    },
  },
  // Hora inicio disponiblidad por dia
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      is: /^([01]\d|2[0-3]):[0-5]\d$/, //formato HH:mm de 00:00 a 23:59
    },
  },
  // Hora fin disponiblidad por dia
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      is: /^([01]\d|2[0-3]):[0-5]\d$/, //formato HH:mm de 00:00 a 23:59
    },
  },
  // Horairos disponiblidad por dia
  schedule: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [["Mañana", "Tarde"]],
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
