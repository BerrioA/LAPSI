// Controlador para cerrar la sesión del usuario
export const logout = async (req, res) => {
  try {
    if (!req.cookies?.refreshToken) {
      return res.status(200).json({ message: "No hay sesión activa." });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Sesión cerrada correctamente." });
  } catch (error) {
    console.error("Error al intentar cerrar sesión:", error);

    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
