import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { User } from "../../models/users.js";
import { sequelize } from "../../config/db.js";
import { VerificationCode } from "../../models/verificationCodes.js";
import { SendUrlVerifyAccount } from "../../services/emailServices.js";

// Controlador encargado de registrar los usuarios
export const registerUsers = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      name,
      middle_name,
      last_name,
      second_last_name,
      type_document,
      document_number,
      cellphone,
      email,
      password,
    } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { document_number }],
      },
    });

    if (user) {
      if (user.email === email) {
        return res.status(400).json({
          error:
            "Parece que ya nos conocemos... Este correo ya se encuentra registrado.",
        });
      }

      if (user.document_number === document_number) {
        return res.status(400).json({
          error: "Ups, este número de documento ya está registrado. ¿Eres tú?",
        });
      }
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const secretCode = CryptoJS.AES.encrypt(
      code,
      process.env.SECRET_ENCRIPT
    ).toString();

    // Datos a enviar encriptados en el correo electrónico
    const data = {
      email,
      expiresIn: new Date(Date.now() + 25 * 60 * 1000), // 25 minutos
      secretCode,
    };

    const encryptedCode = JSON.stringify(data);

    const encryptedDates = CryptoJS.AES.encrypt(
      encryptedCode,
      process.env.SECRET_ENCRIPT
    ).toString();

    // Codificar el código para la URL
    const encodedCode = encodeURIComponent(encryptedDates);

    const newUser = await User.create(
      {
        name,
        last_name,
        middle_name,
        second_last_name,
        type_document,
        document_number,
        cellphone,
        email,
        password: hashedPassword,
      },
      { transaction: t }
    );

    await VerificationCode.create(
      {
        verificationCode: secretCode,
        userId: newUser.id,
      },
      { transaction: t }
    );

    // Generando el URL de restauración de verificacion de cuenta
    const verifyAccountUrl = `${process.env.FRONTEND_URL}/verify-account/${encodedCode}`;

    // Enviar el url de verificacion de cuenta
    SendUrlVerifyAccount(newUser.email, verifyAccountUrl);

    jwt.sign(
      {
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    await t.commit();

    return res.status(200).json({
      message: "¡Bienvenido! Tu cuenta ha sido creada exitosamente.",
    });
  } catch (error) {
    await t.rollback();
    console.error(
      `¡Vaya! Parece que el registro decidió tomarse un descanso. ¿Podrías intentarlo más tarde?. ${error}`
    );

    return res.status(500).json({
      error:
        "¡Vaya! Parece que el registro decidió tomarse un descanso. ¿Podrías intentarlo más tarde?",
    });
  }
};
