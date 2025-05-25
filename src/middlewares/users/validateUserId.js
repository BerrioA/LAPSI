import { param } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

// Validación del Identificador del usuario
export const validateUserId = [
  param("userId")
    .trim()
    .exists()
    .withMessage(
      "Nos hace falta el ID del usuario para avanzar. ¡Solo un pequeño detalle más!"
    )
    .isUUID()
    .withMessage(
      "¡Tranquilo! Solo necesitamos que el ID del usuario esté en formato UUID valido. ¡Vuelve a intentarlo!"
    )
    .escape(),

  validationResultExpress,
];
