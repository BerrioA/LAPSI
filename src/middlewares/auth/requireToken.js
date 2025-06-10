import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../../utils/tokenManager.js"; 

// Middleware encargado de solicitar el token para la validación
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) {
      return res.status(403).json({
        message:
          "El token debe enviarse en el encabezado de autorización con el formato Bearer.",
      });
    }

    token = token.split(" ")[1];

    const { uid, roleId } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
    req.roleId = roleId;

    next();
  } catch (error) {
    console.log(
      "Se he presentado un error en el token requerido:",
      error
    );

    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
