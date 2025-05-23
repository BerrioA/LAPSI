import { Room } from "../models/rooms.js";

const initialRooms = [
  {
    room_name: "Sala 1 - Sala de aplicación de pruebas",
    quotas: 13,
    description:
      "Es un espacio amplio de condiciones idóneas para la aplicación, cuenta con una mesa de trabajo,1 aire acondicionado, 13 sillas rotativas, ventanas insonorizadas e iluminación artificial y natural, para garantizar una evaluación acorde a las exigencias de control de las condiciones ambientales requeridas.",
  },
  {
    room_name: "Sala 2 - Sala de estudio",
    quotas: 30,
    description:
      "Es un espacio destinado para el estudio de las pruebas psicológicas, al igual que implementado para el desarrollo de otras actividades académicas afines a las competencias de medición, como: clases, asesoría de trabajos investigativos, juegos de roles, capacitaciones asociadas a las pruebas, entre otras actividades a fines. Su planta física se compone de un salón amplio, 30 sillas, 1 tablero acrílico, ventanas insonorizadas, luz artificial y natural, dos aires acondicionados y 12 computadores portátiles y un proyector de video como herramientas de apoyo para el proceso académico.",
  },
];

export const seedRooms = async () => {
  try {
    const count = await Room.count();
    if (count === 0) {
      await Room.bulkCreate(initialRooms);
      console.log("✔️ Salas iniciales insertadas correctamente");
    } else {
      console.log("ℹ️ Las salas ya existen, no se insertan duplicados.");
    }
  } catch (error) {
    console.error("❌ Error al insertar salas:", error);
  }
};
