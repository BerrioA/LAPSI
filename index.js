import app from "./src/app.js";
// import { sequelize } from "./database/db.js";

async function main() {
  try {
    //  await sequelize.authenticate();
    //  console.log(
    //    "✅ La conexión con la base de datos se ha realizado con éxito."
    //  );

    // Sincronizar base de datos (eliminar y recrear todas las tablas)
    //  await sequelize.sync({ force: true });

    //Este comando permite realizar cambios en la base de datos sin perder algunos campos de registro dentro de esta misma
    // await sequelize.sync({ alter: true });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log("✅ Servidor LAPSI corriendo en el puerto:", PORT);
      console.log(
        `Documentación LAPSI proximamente disponible en: http://localhost:${PORT}/api/lapsi/v1/documentation`
      );
    });
  } catch (error) {
    console.log(
      "❌ Error al intentar establecer la conexión con la base de datos LAPSI."
    );

    console.log(error);
  }
}
main();
