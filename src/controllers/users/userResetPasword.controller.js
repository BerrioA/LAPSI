import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { User } from "../../models/users.js";

// Controlador encargado de restablecer la contraseña de un usuario
export const resetPassword = async (req, res) => {
  try {
    const decodedCode = decodeURIComponent(req.params.verificationCode);
    const { newPassword } = req.body;

    // Desencriptar el código de verificación de la URL
    let decryptedCode;
    try {
      const bytes = CryptoJS.AES.decrypt(
        decodedCode,
        process.env.SECRET_ENCRIPT
      );
      decryptedCode = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedCode) {
        throw new Error("Código inválido");
      }
    } catch (error) {
      return res.status(400).json({
        error: "Código de verificación inválido o ha expirado.",
      });
    }

    let email, expiresIn, encryptedCode;
    try {
      const parsedData = JSON.parse(decryptedCode);
      email = parsedData.email;
      expiresIn = parsedData.expiresIn;
      encryptedCode = parsedData.encryptedCode;

      if (!email || !expiresIn || !encryptedCode) {
        throw new Error("Datos incompletos");
      }
    } catch (error) {
      return res.status(400).json({
        error: "El formato del código de verificación es inválido.",
      });
    }

    // Validar si el código ya ha expirado
    if (Date.now() > expiresIn) {
      return res.status(400).json({
        error: "El código de verificación ha expirado.",
      });
    }

    // Desencriptar el código de verificación interno
    let decryptedVerificationCode;
    try {
      const decryptionCode = CryptoJS.AES.decrypt(
        encryptedCode,
        process.env.SECRET_ENCRIPT
      );
      decryptedVerificationCode = decryptionCode.toString(CryptoJS.enc.Utf8);

      if (!decryptedVerificationCode) {
        throw new Error("Código interno inválido");
      }
    } catch (error) {
      return res.status(400).json({
        error: "Código de verificación corrupto.",
      });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        error: "No se encontró el usuario asociado a este código.",
      });
    }

    // Verificar que el usuario tenga un código de verificación activo
    const userCode = user.verificationCode;
    if (userCode === null) {
      return res.status(400).json({
        error: "Este código ya ha sido utilizado y ha expirado.",
      });
    }

    // Desencriptar el código almacenado en la base de datos
    let decryptedVerificationCodeUser;
    try {
      const decryptionCodeUser = CryptoJS.AES.decrypt(
        userCode,
        process.env.SECRET_ENCRIPT
      );
      decryptedVerificationCodeUser = decryptionCodeUser.toString(
        CryptoJS.enc.Utf8
      );

      if (!decryptedVerificationCodeUser) {
        throw new Error("Código de usuario inválido");
      }
    } catch (error) {
      return res.status(400).json({
        error: "Error al procesar la solicitud de restablecimiento.",
      });
    }

    if (decryptedVerificationCodeUser !== decryptedVerificationCode) {
      return res.status(400).json({
        error: "Código de verificación inválido.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await user.update({
      password: hashedPassword,
      verificationCode: null,
      lastResendTime: null,
      resendCount: 0,
    });

    return res.status(200).json({
      message: "Contraseña restablecida con éxito.",
    });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);

    return res.status(500).json({
      error: "Ha ocurrido un error al restablecer la contraseña.",
    });
  }
};
