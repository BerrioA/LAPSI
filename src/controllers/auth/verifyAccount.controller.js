import { User } from "../../models/users.js";
import { VerificationCode } from "../../models/verificationCodes.js";
import { WelcomeEmail } from "../../services/emailServices.js"; 

// Controlador encargado de verificar la dirección de correo
export const verifyAccount = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await User.findOne({
      include: {
        model: VerificationCode,
        where: { verificationCode: code },
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ error: "Código de verificación no válido o expirado." });

    await user.update({
      isVerified: true,
    });

    await VerificationCode.update(
      { verificationCode: null, resendCount: 0 },
      { where: { verificationCode: code } }
    );

    await WelcomeEmail(user.email, user.name, user.last_name);

    return res.status(200).json({
      message: "¡Perfecto! tu cuenta ha sido verificada con éxito.",
    });
  } catch (error) {
    console.error(
      `Lo sentimos, no hemos podido verificar la dirección de correo en este momento. Estamos en ello para solucionarlo pronto. ${error}`
    );

    return res.status(500).json({
      error:
        "Lo sentimos, no hemos podido verificar la dirección de correo en este momento. Estamos en ello para solucionarlo pronto.",
    });
  }
};
