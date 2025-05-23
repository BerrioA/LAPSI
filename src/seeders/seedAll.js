import { seedRooms } from "./seedRooms.js";
import { seedSchedules } from "./seedSchedules.js";
import { seedTimeBlocks } from "./seedTimeBlocks.js";

export const seedAll = async () => {
  try {
    await seedRooms();
    await seedSchedules();
    await seedTimeBlocks();

    console.log("✅ Datos iniciales insertados correctamente.");
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
  }
};
