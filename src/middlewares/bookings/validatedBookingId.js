import { param } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

// Validación del Identificador de la reserva
export const validationIdBooking = [
  param("bookingId")
    .trim()
    .exists()
    .withMessage(
      "Nos hace falta el ID de la reserva para avanzar. ¡Solo un pequeño detalle más!"
    )
    .isUUID()
    .withMessage(
      "¡Tranquilo! Solo necesitamos que el ID esté en formato UUID valido. ¡Vuelve a intentarlo!"
    )
    .escape(),

  validationResultExpress,
];
