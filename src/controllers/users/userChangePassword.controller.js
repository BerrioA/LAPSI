import bcrypt from "bcryptjs";
import { User } from "../../models/users.js";

// Controlador encargado de actualizar la contraseña de un usuario
export const changePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.uid);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const { currentPassword, newPassword } = req.body;

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña actual incorrecta." });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    await user.update({ password: hashedPassword });

    return res.status(200).json({
      message: "Contraseña actualizada correctamente.",
    });
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);

    return res.status(500).json({
      error: "Ha ocurrido un error al actualizar la contraseña.",
    });
  }
};
