import { Rol } from "../../models/roles.js";

const validateRole = async (roleId) => {
  try {
    const role = await Rol.findByPk(roleId, { attributes: ["role"] });

    if (!role) {
      return "Rol no encontrado";
    }

    switch (role.role) {
      case "Admin":
        return "Admin";

      case "Moderador":
        return "Moderador";

      case "Estudiante":
        return "Estudiante";

      default:
        return "Rol no existente";
    }
  } catch (error) {
    console.error(
      "Se ha presentado un error al intentar validar el rol del usuario.",
      error
    );

    return res.status(500).json({
      error:
        "Se ha presentado un error al intentar validar el rol del usuario.",
    });
  }
};

//Middleware encargado de validar el rol administrador
export const verifyAdmin = async (req, res, next) => {
  try {
    const roleAdmin = await validateRole(req.roleId);

    if (roleAdmin === "Admin") {
      return next();
    }

    return res.status(403).json({
      message: "Acceso denegado, solo Administrador.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);

    return res.status(500).json({
      error: "Error al validar el rol Administrador.",
    });
  }
};

// Middleware encargado de validar el rol estudiante
export const verifyStudent = async (req, res, next) => {
  try {
    const roleStudent = await validateRole(req.roleId);

    if (roleStudent === "Estudiante") {
      return next();
    }

    return res.status(400).json({
      message: "Acceso denegado, solo Estudiante.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);

    return res.status(500).json({
      error: "Error al validar el rol estudiante.",
    });
  }
};

// Middleware encargado de validar el rol moderador
export const verifyModerator = async (req, res, next) => {
  try {
    const roleStudent = await validateRole(req.roleId);

    if (roleStudent === "Moderador") {
      return next();
    }

    return res.status(400).json({
      message: "Acceso denegado, solo Moderador.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);

    return res.status(500).json({
      error: "Error al validar el rol Moderador.",
    });
  }
};

// Middleware encargado de validar el rol de administrador o moderador
export const verifyAdminMod = async (req, res, next) => {
  try {
    const role = await validateRole(req.roleId);

    if (role === "Admin" || role === "Moderador") {
      return next();
    }

    return res.status(400).json({
      message: "Acceso denegado, no tiene permisos para acceder a esta ruta.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);
    return res.status(500).json({
      error: "Error al validar el rol del usuario.",
    });
  }
};

// Middleware encargado de validar el rol de administrador, moderador o estudiante
export const verifyAllUsers = async (req, res, next) => {
  try {
    const role = await validateRole(req.roleId);

    if (role === "Admin" || role === "Moderador" || role === "Estudiante") {
      return next();
    }

    return res.status(400).json({
      message: "Acceso denegado, no tiene permisos para acceder a esta ruta.",
    });
  } catch (error) {
    console.error("Error al validar el rol:", error);
    return res.status(500).json({
      error: "Error al validar el rol del usuario.",
    });
  }
};
