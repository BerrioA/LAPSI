import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Rol } from "./roles.js";

export const User = sequelize.define("users", {
  // Id identificador de los Usuarios
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  // Nombre del usuario
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  // Segundo nombre del usuario
  middle_name: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  // Apellido del usuario
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  // Segundo apellido del usuario
  second_last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  // Tipo de documento
  type_document: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      isIn: [["CC", "TI"]],
    },
  },
  // Número de documento
  document_number: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [7, 10],
    },
  },
  // Celular del usuario
  cellphone: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 10],
    },
  },
  // Correo del usuario
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  // Contraseña del usuario
  password: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  // Identificador del del rol
  roleId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Rol,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  // Estado del usuario
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Hook para asignar automáticamente el rol de Estudiante a nuevos usuarios
User.beforeCreate(async (user) => {
  if (!user.roleId) {
    try {
      // Buscar el rol de Estudiante
      const estudianteRol = await Rol.findOne({
        where: { role: "Estudiante" },
      });

      if (estudianteRol) {
        user.roleId = estudianteRol.id;
      } else {
        console.error("No se encontró el rol de Estudiante");
      }
    } catch (error) {
      console.error("Error al asignar rol por defecto:", error);
    }
  }
});
