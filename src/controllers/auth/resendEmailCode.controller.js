import { User } from "../../models/users.js";

// Controlador encargado de reenviar el código de verificación del correo electrónico
export const resendEmailCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    const now = new Date();

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await user.update({
      verificationCode,
      lastResendTime: now,
      resendCount: user.resendCount + 1,
    });

    ResendValidationCode(user.email, user.verificationCode);

    return res.status(200).json({
      message: "Código de verificación reenviado con éxito.",
    });
  } catch (error) {
    console.error("Error al reenviar el código de verificación:", error);

    return res.status(500).json({
      message:
        "Error interno del servidor al intentar reenviar el código de verificación.",
    });
  }
};
