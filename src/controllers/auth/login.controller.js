import bcryptjs from "bcryptjs";
import { User } from "../../models/users.js";
import {
  generateRefreshToken,
  generateToken,
} from "../../utils/tokenManager.js";

// Controlador encargado de hacer el loguin del usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(403).json({ message: "Credenciales incorrectas." });
    }

    if (user.isVerified !== true) {
      return res.status(403).json({
        message:
          "Vaya, parece que no haz verificado tu cuenta y no tienes acceso aún.",
      });
    }

    const matchPassword = await bcryptjs.compare(password, user.password);
    if (!matchPassword) {
      return res.status(403).json({ message: "Credenciales incorrectas." });
    }

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, user.roleId, res);

    return res.status(200).json({
      token,
      expiresIn,
    });
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);

    return res.status(500).json({
      message: "Error interno del servidor.",
    });
  }
};
