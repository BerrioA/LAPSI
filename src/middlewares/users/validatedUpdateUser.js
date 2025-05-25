import { body } from "express-validator";
import { validationResultExpress } from "../express-validator.js";

// Validaciones para la actualización del usuario
export const validateUserUpdate = [
  body("name")
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("¡Hola! Tu nombre parece un poco corto. ")
    .isLength({ max: 30 })
    .withMessage("¡Hola! Tu nombre no puede tener más de 30 caracteres.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "Los números y símbolos están de vacaciones. Usa solo letras y espacios en tu nombre."
    )
    .escape(),

  body("middle_name")
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("¡Hola! Tu segundo nombre parece un poco corto. ")
    .isLength({ max: 30 })
    .withMessage(
      "¡Hola! Tu segundo nombre no puede tener más de 30 caracteres."
    )
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "Los números y símbolos están de vacaciones. Usa solo letras y espacios en tu segundo nombre."
    )
    .escape(),

  body("last_name")
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("¡Hola! Tu apellido parece un poco corto. ")
    .isLength({ max: 30 })
    .withMessage(
      "¡Hola! Tu primer apellido no puede tener más de 30 caracteres."
    )
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "Los números y símbolos están de vacaciones. Usa solo letras y espacios en tu apellido."
    )
    .escape(),

  body("second_last_name")
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("¡Hola! Tu segundo apellido parece un poco corto. ")
    .isLength({ max: 30 })
    .withMessage(
      "¡Hola! Tu segundo apellido no puede tener más de 30 caracteres."
    )
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage(
      "Los números y símbolos están de vacaciones. Usa solo letras y espacios en tu segundo apellido."
    )
    .escape(),

  body("type_document")
    .optional({ checkFalsy: true })
    .trim()
    .isIn(["CC", "TI"])
    .withMessage(
      "¡Ups! Parece que olvidaste de seleccionar un tipo de documento valido."
    )
    .escape(),

  body("document_number")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 7, max: 10 })
    .withMessage("El número de documento debe tener entre 7 y 10 dígitos")
    .isNumeric()
    .withMessage("El número de documento solo debe contener números")
    .escape(),

  body("cellphone")
    .optional({ checkFalsy: true })
    .trim()
    .matches(
      /^3(00|01|02|04|05|10|11|12|13|14|15|16|17|18|19|20|21|22|23|31|32|33|50|51)\d{7}$/
    )
    .withMessage("¡Ups! Parece que el número de celular no es válido.")
    .escape(),

  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .matches(/^[a-zA-Z0-9._%+-]+@cecar\.edu\.co$/)
    .withMessage("Por favor, utiliza tu correo institucional para continuar.")
    .normalizeEmail()
    .escape(),

  validationResultExpress,
];
