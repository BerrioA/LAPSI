import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

//Modelo de salas
export const Room = sequelize.define("rooms", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre de la sala
  room_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // Cupos
  quotas: {
    type: DataTypes.INTEGER,
    allowNull: null,
    defaultValue: 0,
    validate: {
      isNumeric: true,
      min: 0,
    },
  },
  // Descripcion de la sala
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
