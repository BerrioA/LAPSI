import {
  Url_Verification_Template,
  Welcome_Template,
} from "../utils/emailTemplate.js";
import { transporter } from "./transportEmail.js";

// Servicio encargado de enviar la url de verificación al correo
export const SendUrlVerifyAccount = async (email, verifyAccountUrl) => {
  try {
    await transporter.sendMail({
      from: '"LAPSI" <emaildev1214@gmail.com>',
      to: email,
      subject: "Código de verificación para tu cuenta en LAPSI 🔐",
      text: "Estimado/a profesional, gracias por unirte a LAPSI, tu plataforma especializada para profesionales de la psicología.",
      html: Url_Verification_Template.replace(
        "{verificationCode}",
        verifyAccountUrl
      ).replace("{cabecera}", "Código de verificación"),
      // html body
    });

    return {
      success: true,
      message:
        "Hemos enviado el código de verificación a tu correo. Por favor, revisa tu bandeja de entrada.",
    };
  } catch (error) {
    console.log(
      `No se ha podido enviar el código de verificación. Estamos trabajando para resolver este problema. ${error}`
    );

    return {
      success: false,
      message:
        "No se ha podido enviar el código de verificación. Estamos trabajando para resolver este problema.",
    };
  }
};

// Servicio encargado de reenviar el codigo de verificación al correo
export const ResendValidationCode = async (email, verificationCode) => {
  try {
    await transporter.sendMail({
      from: '"LAPSI" <emaildev1214@gmail.com>',
      to: email,
      subject: "Hemos generado tu nuevo código de verificación. 🎯",
      text: "Usa este código de verificación para completar el proceso.",
      html: Code_Template.replace(
        "{verificationCode}",
        verificationCode
      ).replace("{cabecera}", "Hemos generado tu nuevo código de validación."),
    });

    return {
      success: true,
      message:
        "Hemos enviado el código de validación a tu correo. Por favor, revisa tu bandeja de entrada.",
    };
  } catch (error) {
    console.log(
      `No se ha podido enviar el código de validación. Estamos trabajando para resolver este problema. ${error}`
    );

    return {
      success: false,
      message:
        "No se ha podido enviar el código de validación. Estamos trabajando para resolver este problema.",
    };
  }
};

// Servicio encargado de enviar un mensaje de bienvenida y confirmación de registro
export const WelcomeEmail = async (email, name, last_name) => {
  try {
    await transporter.sendMail({
      from: '"LAPSI" <emaildev1214@gmail.com>',
      to: email,
      subject: "¡Bienvenido a LAPSI! Su cuenta ha sido verificada con éxito ✅",
      text: "Bienvenido, tu cuenta ha sido verificada en NESEO.",
      html: Welcome_Template.replace("{name}", name).replace(
        "{lastname}",
        last_name
      ),
    });

    return {
      success: true,
      message:
        "Hemos enviado el código de verificación a tu correo. Por favor, revisa tu bandeja de entrada.",
    };
  } catch (error) {
    console.log(
      `No se ha podido enviar el código de verificación. Estamos trabajando para resolver este problema. ${error}`
    );

    return {
      success: false,
      message:
        "Hemos enviado el código de verificación a tu correo. Por favor, revisa tu bandeja de entrada.",
    };
  }
};
