import { User } from "../../models/users.js";

// Controlador encargado de actualizar los datos de un usuario
export const updateUser = async (req, res) => {
  try {
    const uid = req.uid
    console.log(uid);
    const {
      name,
      middle_name,
      last_name,
      second_last_name,
      type_document,
      document_number,
      cellphone,
      email,
    } = req.body;

    const user = await User.findByPk(uid);

    

    if (!user)
      return res.status(400).json({
        error:
          "¡Lo sentimos! No hemos podido encontrar al usuario que intentas actualizar.",
      });

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error:
          "Vaya, no hemos detectado datos para actualizar. Asegúrate de ingresar los campos que deseas modificar.",
      });
    }

    if (name && name !== user.name) user.name = name;
    if (middle_name && middle_name !== user.middle_name)
      user.middle_name = middle_name;
    if (last_name && last_name !== user.last_name) user.last_name = last_name;
    if (second_last_name && second_last_name !== user.second_last_name)
      user.second_last_name = second_last_name;
    if (type_document && type_document !== user.type_document)
      user.type_document = type_document;
    if (document_number && document_number !== user.document_number)
      user.document_number = document_number;
    if (cellphone && cellphone !== user.cellphone) user.cellphone = cellphone;
    if (email && email !== user.email) user.email = email;

    await user.update({
      name,
      middle_name,
      last_name,
      second_last_name,
      type_document,
      document_number,
      cellphone,
      email,
    });

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
