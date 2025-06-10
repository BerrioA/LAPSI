import { User } from "../../models/users.js";

// Controlador encargado de enviar el link para restablecer la contraseña
export const sendPasswordRecoveryUrl = async (req, res) => {
  try {
    const { email } = req.body;

    // Buscar el usuario por correo electrónico
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Generar un nuevo código de verificación
    const code = Math.floor(100000 + Math.random() * 900000);
    const encryptedCode = CryptoJS.AES.encrypt(
      code.toString(),
      process.env.SECRET_ENCRIPT
    ).toString();

    // Datos a enviar encriptados en el correo electrónico
    const data = {
      email,
      expiresIn: new Date(Date.now() + 15 * 60 * 1000), // 15 minutos
      encryptedCode,
    };

    const verificationCode = JSON.stringify(data);

    const secretCode = CryptoJS.AES.encrypt(
      verificationCode,
      process.env.SECRET_ENCRIPT
    ).toString();

    // Codificar el código para la URL
    const encodedCode = encodeURIComponent(secretCode);

    // Actualizar el usuario con el nuevo código de verificación y la fecha de expiración
    await existingUser.update({
      verificationCode: encryptedCode,
      lastResendTime: new Date(),
      resendCount: existingUser.resendCount + 1,
    });

    // Generando el URL de restauración de contraseña con el código codificado
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${encodedCode}`;

    // Enviar el url de restauración de cotraseña al correo electrónico
    SendUrlResetPassword(existingUser.email, resetPasswordUrl);

    res.status(200).json({
      message:
        "El código de restauración de cotraseña ha sido enviado al correo electrónico.",
    });
  } catch (error) {
    console.error(
      "Error al enviar el codigo de restablecimiento de contraseña:",
      error
    );

    return res.status(500).json({
      error:
        "Ha ocurrido un error al intentar enviar el codigo de restablecimiento de contraseña.",
    });
  }
};
