import { generateToken } from "../../utils/tokenManager.js";

// Controlador encargado de generar el refreshToken
export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid, req.roleId);

    return res.status(200).json({ token, expiresIn });
  } catch (error) {
    console.error("Error al generar el RefreshToken:", error);

    return res.status(500).json({
      message:
        "Se ha presentado un error en el servidor al intentar generar el RefreshToken.",
    });
  }
};
