import app from "./src/app.js";
import { sequelize } from "./src/config/db.js";
import { setupRelations } from "./src/models/relations.js";
import { seedAll } from "./src/seeders/seedAll.js";
import { setupScheduledTasks } from "./src/utils/scheduler.js";

async function main() {
  try {
    // await sequelize.authenticate();
    // console.log(
    //   "✅ La conexión con la base de datos se ha realizado con éxito."
    // );

    // await sequelize.sync({ force: true });
    // setupRelations();
    // await seedAll();

    // Iniciar la verificación automática al arrancar el servidor
    setupScheduledTasks();

    // await sequelize.sync({ alter: true });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(
        `✅ Servidor LAPSI corriendo en el puerto: ${PORT} \nDocumentación LAPSI proximamente disponible en: http://localhost:${PORT}/api/lapsi/v1/documentation`
      );
    });
  } catch (error) {
    console.log(
      "❌ Error al intentar establecer la conexión con la base de datos LAPSI.",
      error
    );
  }
}
main();
