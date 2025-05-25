import { User } from "../../models/users.js";

// Controlador encargado de eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);

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
