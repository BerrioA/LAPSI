import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { sequelize } from "../../config/db.js";
import { Rol } from "../../models/roles.js";
import { User } from "../../models/users.js";
import { SendVerificationCode } from "../../middleware/verificationEmail/Email.js";
import { Reservation } from "../../models/reservations.js";
import { VerificationCode } from "../../models/verificationCodes.js";

// Controlador encargador de mostrar todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Rol,
        attributes: ["role"],
      },
    });

    const usuario = users.map((user) => ({
      id: user.id,
      name: user.name,
      middle_name: user.middle_name,
      last_name: user.last_name,
      second_last_name: user.second_last_name,
      type_document: user.type_document,
      document_number: user.document_number,
      cellphone: user.cellphone,
      email: user.email,
      role: user.role.role,
    }));

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(
      `Parece que los usuarios están de vacaciones. Estamos trabajando para traerlos de vuelta. ${error}`
    );

    return res.status(500).json({
      error:
        "Parece que los usuarios están de vacaciones. Estamos trabajando para traerlos de vuelta.",
    });
  }
};

// // Controlador encargado de registrar los usuarios
// export const registerUsers = async (req, res) => {
//   const t = await sequelize.transaction();
//   try {
//     const {
//       name,
//       middle_name,
//       last_name,
//       second_last_name,
//       type_document,
//       document_number,
//       cellphone,
//       email,
//       password,
//     } = req.body;

//     const user = await User.findOne({ where: { email } });
//     if (user)
//       return res.status(400).json({
//         error:
//           "Parece que ya nos conocemos... Este correo ya se encuentra registrado.",
//       });

//     const hashedPassword = bcrypt.hashSync(password, 10);

//     const code = Math.floor(100000 + Math.random() * 900000).toString();

//     const secretCode = CryptoJS.AES.encrypt(
//       code,
//       process.env.SECRET_ENCRIPT
//     ).toString();

//     // Datos a enviar encriptados en el correo electrónico
//     const data = {
//       email,
//       expiresIn: new Date(Date.now() + 25 * 60 * 1000), // 25 minutos
//       secretCode,
//     };

//     const encryptedCode = JSON.stringify(data);

//     const encryptedDates = CryptoJS.AES.encrypt(
//       encryptedCode,
//       process.env.SECRET_ENCRIPT
//     ).toString();

//     // Codificar el código para la URL
//     const encodedCode = encodeURIComponent(encryptedDates);

//     const newUser = await User.create(
//       {
//         name,
//         last_name,
//         middle_name,
//         second_last_name,
//         type_document,
//         document_number,
//         cellphone,
//         email,
//         password: hashedPassword,
//       },
//       { transaction: t }
//     );

//     await VerificationCode.create(
//       {
//         verificationCode: secretCode,
//         userId: newUser.id,
//       },
//       { transaction: t }
//     );

//     // Generando el URL de restauración de verificacion de cuenta
//     const verifyAccountUrl = `${process.env.FRONTEND_URL}/verify-account/${encodedCode}`;

//     // Enviar el url de verificacion de cuenta
//     SendUrlVerifyAccount(newUser.email, verifyAccountUrl);

//     jwt.sign(
//       {
//         email: newUser.email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );

//     await t.commit();

//     return res.status(200).json({
//       message: "¡Bienvenido! Tu cuenta ha sido creada exitosamente.",
//     });
//   } catch (error) {
//     console.error(
//       `¡Vaya! Parece que el registro decidió tomarse un descanso. ¿Podrías intentarlo más tarde?. ${error}`
//     );

//     return res.status(500).json({
//       error:
//         "¡Vaya! Parece que el registro decidió tomarse un descanso. ¿Podrías intentarlo más tarde?",
//     });
//   }
// };

// Controlador encargado de actualizar los datos de un usuario
export const updateUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findByPk(idUser);

    if (!user)
      return res.status(400).json({
        error:
          "¡Lo sentimos! No hemos podido encontrar al usuario que intentas actualizar.",
      });

    const { name, last_name, cellphone, email } = req.body;

    //Validación encargada de verificar que el usuario si envie un campo para actualizar y no un objeto vacio
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error:
          "Lo sentimos, no hemos detectado datos para actualizar. Asegúrate de completar los campos necesarios.",
      });
    }

    if (name && name !== user.name) user.name = name;
    if (last_name && last_name !== user.last_name) user.last_name = last_name;
    if (cellphone && cellphone !== user.cellphone) user.cellphone = cellphone;
    if (email && email !== user.email) user.email = email;

    await user.update({ name, last_name, cellphone, email });

    return res.status(200).json({
      message:
        "¡Misión cumplida! Los datos han sido actualizados sin problemas.",
    });
  } catch (error) {
    console.error(
      `No pudimos actualizar los datos. Estamos resolviendo el problema lo antes posible. ${error}`
    );

    return res.status(500).json({
      error:
        "No pudimos actualizar los datos. Estamos resolviendo el problema lo antes posible.",
    });
  }
};

// Controlador encargado de eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findByPk(idUser);

    if (!user)
      return res.status(400).json({
        error:
          "¡Lo sentimos! No hemos podido encontrar al usuario que intentas eliminar.",
      });

    await user.destroy();

    return res.status(200).json({
      message: "¡Genial! La eliminación del usuario se ha realizado con éxito.",
    });
  } catch (error) {
    console.error(
      `Lo sentimos, no hemos podido eliminar el usuario en este momento. ${error}`
    );

    return res.status(500).json({
      error:
        "Lo sentimos, no hemos podido eliminar el usuario en este momento.",
    });
  }
};

// Controlador encargado de mostrar un usuario por ID
export const getUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findByPk(idUser, {
      attributes: [
        "id",
        "name",
        "last_name",
        "cellphone",
        "email",
        "rol",
        "isVerified",
      ],
      include: [
        {
          model: Reservation,
          as: "reservations",
          attributes: [
            "id",
            "date",
            "time",
            "status",
            "study_area",
            "area_test",
            "partners",
            "teachers_name",
            "activity_type",
            "other_activity",
            "duration",
          ],
        },
      ],
    });

    if (!user)
      return res.status(400).json({
        error: "¡Lo sentimos! No hemos podido encontrar el usuario.",
      });

    return res.status(200).json(user);
  } catch (error) {
    console.error(
      `Lo sentimos, no hemos podido encontraar el usuario en este momento. ${error}`
    );

    return res.status(500).json({
      error:
        "Lo sentimos, no hemos podido encontraar el usuario en este momento.",
    });
  }
};
