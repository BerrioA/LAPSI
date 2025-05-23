// Modelo para las reservas
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./users.js";
import { BookingTimeBlocks } from "./booking_time_blocks.js";
import { Room } from "./rooms.js";

export const Booking = sequelize.define("bookings", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // Área de estudio
  study_area: {
    type: DataTypes.STRING(17),
    allowNull: false,
    validate: {
      isIn: [
        [
          "Social",
          "Neuropsicológicas",
          "Clínica",
          "Proyectivas",
          "Organizacional",
          "Educativa",
          "Inteligencia",
          "Generales",
        ],
      ],
    },
  },
  // Área de prueba relacionada con el área de prueba
  area_test: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  // Cantidad de usuarios totales para la reserva
  user_quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  // Integrantes que comforman el grupo con el estudiantes
  partners: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],
  },
  // Tipo de actividad a realizar por el estudiante
  activity_type: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isIn: {
        args: [
          [
            "Estudio de prueba",
            "Practica de aplicación de prueba",
            "Aplicación de prueba a paciente",
            "Calificar prueba",
            "Otro",
          ],
        ],
        msg: "Tipo de actividad no válido.",
      },
    },
  },
  // Campo opcional si el usuario selecciona "Otro"
  other_activity: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isRequired(value) {
        if (this.activity_type === "Otro" && (!value || value.trim() === "")) {
          throw new Error(
            "Debes especificar la actividad si seleccionaste 'Otro'."
          );
        }
      },
    },
  },
  // Nombre del docente que asigno la actividad
  teachers_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  // Fecha y hora de la reserva
  bookingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  // Estado de la reserva
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "confirmada",
    validate: {
      isIn: [["confirmada", "cancelada", "aprobada", "finalizada"]],
    },
  },
  duration: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isNumeric: true,
      min: 0,
    },
  },
  // ID de la sala reservada
  roomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Room,
      key: "id",
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
  // ID del usuario que hace la reserva
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});


  // Un bloque de tiempo tiene muchas reservas
  BookingTimeBlocks.hasMany(Booking, { foreignKey: "bookingTimeBlockId" });
  Booking.belongsTo(BookingTimeBlocks, { foreignKey: "bookingTimeBlockId" });
