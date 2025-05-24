import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./users.js";

export const VerificationCode = sequelize.define("verification_codes", {
  // Id identificador de los codigos de verificacion
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  // Código de verificación
  verificationCode: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  // Fecha y hora de reenvio del código
  lastResendTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  // Cantidad de reenvios del código
  resendCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  // Identificador del usuario
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});
