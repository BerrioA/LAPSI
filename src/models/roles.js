import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Rol = sequelize.define("roles", {
  // Id identificador de los roles
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre del rol
  role: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
});

// Hook para insertar roles después de sincronizar la tabla
Rol.afterSync(async () => {
  const roles = ["Admin", "Estudiante"];
  await Rol.bulkCreate(
    roles.map((rol) => ({ role: rol })),
    { ignoreDuplicates: true }
  );
});
