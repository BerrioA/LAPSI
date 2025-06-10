import { User } from "../../models/users.js";

// Controlador encargado de mostraer la información de perfil de usuario
export const profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.uid);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    return res.status(200).json({
      uid: user.id,
      name: user.name,
      last_name: user.last_name,
      role: user.roleId,
      email: user.email,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);

    return res.status(500).json({
      message: "Error interno del servidor al obtener el perfil.",
    });
  }
};
