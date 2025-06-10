import CryptoJS from "crypto-js";
import { User } from "../../models/users.js";
import { VerificationCode } from "../../models/verificationCodes.js";
import { sequelize } from "../../config/db.js";

// Controlador encargado de verificar la cuenta de usuario
export const verifyAccount = async (req, res) => {
  let email, expiresIn, secretCode;
  let decryptedVerificationCode;
  let decryptedVerificationCodeUser;
  const t = await sequelize.transaction();
  try {
    let decryptedCode;

    const decodedCode = decodeURIComponent(req.params.code);

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

    try {
      const parsedData = JSON.parse(decryptedCode);
      email = parsedData.email;
      expiresIn = parsedData.expiresIn;
      secretCode = parsedData.secretCode;

      if (!email || !expiresIn || !secretCode) {
        throw new Error("Datos incompletos");
      }
    } catch (error) {
      return res.status(400).json({
        error: "El formato del código de verificación es inválido.",
      });
    }

    if (Date.now() > expiresIn) {
      return res.status(400).json({
        error: "El código de verificación ha expirado.",
      });
    }

    // Desencriptar el código de verificación interno
    try {
      const decryptionCode = CryptoJS.AES.decrypt(
        secretCode,
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
      include: { model: VerificationCode },
    });

    if (!user) {
      return res.status(404).json({
        error: "No se encontró el usuario asociado a este código.",
      });
    }
    if (!user.verification_code.verificationCode) {
      return res.status(404).json({
        error: "Este usuario no tiene un código de verificación asociado.",
      });
    }

    // Verificar que el usuario tenga un código de verificación activo
    const userCode = user.verification_code.verificationCode;
    if (userCode === null) {
      return res.status(400).json({
        error: "Este código ya ha expirado.",
      });
    }

    // Desencriptar el código almacenado en la base de datos
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
        error: "Error al procesar la solicitud de verificación de usuario.",
      });
    }

    if (decryptedVerificationCodeUser !== decryptedVerificationCode) {
      return res.status(400).json({
        error: "Código de verificación inválido.",
      });
    }

    await user.update(
      {
        isVerified: true,
      },
      { transaction: t }
    );

    await VerificationCode.update(
      {
        verificationCode: null,
        lastResendTime: null,
        resendCount: 0,
      },
      { where: { verificationCode: user.verification_code.verificationCode } },
      { transaction: t }
    );

    await t.commit();

    return res.status(200).json({
      message: "Tu cuenta ha sido verificada con exito.",
    });
  } catch (error) {
    await t.rollback();
    console.error("Error al procesar la verificacion de la cuenta:", error);

    return res.status(500).json({
      error: "Ha ocurrido un error al procesar la verificación de la cuenta.",
    });
  }
};
