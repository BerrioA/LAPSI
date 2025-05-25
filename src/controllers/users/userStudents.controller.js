import { Rol } from "../../models/roles.js";
import { User } from "../../models/users.js";

// Controlador encargador de mostrar todos los usuarios
export const getStudentUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Rol,
        where: { role: "Estudiante" },
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
