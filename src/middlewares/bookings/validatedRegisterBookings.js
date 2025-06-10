import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

const allowedActivities = [
  "Estudio de prueba",
  "Practica de aplicación de prueba",
  "Aplicación de prueba a paciente",
  "Calificar prueba",
  "Otro",
];

// Middleware encargado de validar los registros de una reserva
export const validatedRegisterBooking = [
  body("activity_type")
    .trim()
    .notEmpty()
    .withMessage(
      "¡Hola! El tipo de actividad a realizar parece que no la has ingresado."
    )
    .isString()
    .custom((value) => allowedActivities.includes(value))
    .withMessage(
      "El tipo de actividad ingresado no es válido. Por favor selecciona uno de los permitidos."
    )
    .escape(),

  body("other_activity").custom((value, { req }) => {
    if (req.body.activity_type === "Otro") {
      if (!value || typeof value !== "string" || value.trim() === "") {
        throw new Error(
          "Por favor, describa la otra tipo de actividad que desea realizar."
        );
      }

      if (value.length < 10) {
        throw new Error(
          "¡Hola! La descripción de la otra actividad a realizar parece un poco corta. "
        );
      }

      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
        throw new Error(
          "La descripción de la otra actividad a realizar solo puede contener letras y espacios."
        );
      }
    }
    return true;
  }),

  body("study_area")
    .trim()
    .notEmpty()
    .withMessage("El área de estudio es clave para avanzar. ¡Solo falta eso!")
    .isString()
    .matches(/^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ0-9\s]{3,}$/)
    .withMessage(
      "Los símbolos están de vacaciones. Usa solo letras, números y espacios en el área de estudio."
    )
    .escape(),

  body("area_test")
    .trim()
    .notEmpty()
    .withMessage("El área de prueba es clave para avanzar. ¡Solo falta eso!")
    .isString()
    .matches(/^[\p{L}\p{M}\d\s:–(),.-]{10,}$/u)
    .withMessage(
      "Los símbolos están de vacaciones. Usa solo letras, números y espacios en el área de prueba."
    )
    .escape(),

  body("user_quantity")
    .trim()
    .notEmpty()
    .withMessage(
      "La cantidad de cupos a reservar es clave para avanzar. ¡Solo falta eso!"
    )
    .isNumeric(),

  body("partners")
    .optional()
    .isArray()
    .withMessage(
      "¡Ups! Necesitamos al menos un integrante en el campo 'acompañantes'. Por favor, agrega uno."
    )
    .escape(),

  body("partners.*.name")
    .trim()
    .optional()
    .isString()
    .withMessage(
      "El nombre de cada integrante debe ser texto. Por favor, revisa este campo."
    )
    .trim()
    .notEmpty()
    .withMessage(
      "El nombre de cada integrante es obligatorio. No puede estar vacío."
    )
    .escape(),

  body("partners.*.last_name")
    .trim()
    .optional()
    .isString()
    .withMessage(
      "El apellido de cada integrante debe ser texto. Por favor, revisa este campo."
    )
    .trim()
    .notEmpty()
    .withMessage(
      "El apellido de cada integrante es obligatorio. No puede estar vacío."
    )
    .escape(),

  body("teachers_name")
    .trim()
    .notEmpty()
    .withMessage(
      "El nombre del docente es clave para continuar. ¡Solo falta eso!"
    )
    .isString()
    .isLength({ min: 3 })
    .withMessage("¡Hola! El nombre del docente parece un poco corto. ")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/)
    .withMessage(
      "Los números y símbolos están de vacaciones. Usa solo letras y espacios en el nombre del docente."
    )
    .escape(),

  body("bookingDate")
    .trim()
    .notEmpty()
    .withMessage("El día de reserva es clave para avanzar. ¡Solo falta eso!")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("El formato de fecha no es válido. Debe ser 'YYYY-MM-DD'.")
    .custom((value) => {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error("La fecha proporcionada no es válida.");
      }
      return true;
    })
    .escape(),

  body("duration")
    .optional()
    .isFloat()
    .withMessage("La duración debe ser un número decimal válido.")
    .custom((value) => {
      const allowedDurations = [0.45, 0.9, 1, 1.45, 2];
      return allowedDurations.includes(parseFloat(value));
    })
    .withMessage(
      "La duración debe ser una de las siguientes: 0.45, 0.9, 1, 1.45 o 2."
    )
    .escape(),

  body("status").trim().optional().escape(),

  validationResultExpress,
];
