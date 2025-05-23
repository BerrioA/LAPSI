import moment from "moment";
import { Op } from "sequelize";
import { Room } from "../../models/rooms.js";
import { AvailableQuotas } from "../../models/available_quotas.js";
import { BookingTimeBlocks } from "../../models/booking_time_blocks.js";

// Controlador para obtener todas las salas
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return res.status(200).json(rooms);
  } catch (error) {
    console.error("Error al obtener salas:", error);

    return res.status(500).json({ error: "Error al obtener salas." });
  }
};

// Controlador para obtener todos los bloques de tiempo de toda la semana por sala
export const getAllTimeBlocksByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Validar que la sala existe
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    // Obtener todos los bloques de tiempo para esta sala
    const timeBlocks = await BookingTimeBlocks.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: { roomId },
      order: [
        ["day", "ASC"],
        ["start_time", "ASC"],
      ],
      include: { model: AvailableQuotas, attributes: ["occupied_quotas"] },
    });

    // Organizar por días
    const blocksByDay = {};
    const daysOrder = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

    // Inicializar cada día como un array vacío
    daysOrder.forEach((day) => {
      blocksByDay[day] = [];
    });

    // Agrupar bloques por día
    timeBlocks.forEach((block) => {
      blocksByDay[block.day].push(block);
    });

    return res.status(200).json({
      roomName: room.room_name,
      totalQuotas: room.quotas,
      schedule: blocksByDay,
    });
  } catch (error) {
    console.error("Error al obtener bloques de tiempo:", error);

    return res.status(500).json({
      error: "Error al obtener bloques de tiempo.",
    });
  }
};

// Controlador encargado de obtener los bloques de tiempo y devolver los cupos disponobles por sala y dia de reserva
export const getWeeklyQuotasStatus = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { date } = req.body;
    const baseDate = date ? moment(date) : moment();

    const weekStart = baseDate.clone().startOf("isoWeek").format("YYYY-MM-DD");
    const weekEnd = baseDate.clone().endOf("isoWeek").format("YYYY-MM-DD");

    // Validar que la sala existe
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    const blocks = await BookingTimeBlocks.findAll({
      where: { roomId },
      include: {
        model: AvailableQuotas,
        required: false,
        where: {
          date: {
            [Op.between]: [weekStart, weekEnd],
          },
        },
      },
      order: [["start_time", "ASC"]],
    });

    const response = blocks.map((block) => {
      // Suma total de ocupados para este bloque en la semana
      const totalOccupied = block.available_quotas.reduce((acc, quota) => {
        return acc + quota.occupied_quotas;
      }, 0);

      return {
        block_id: block.id,
        day: block.day,
        start_time: block.start_time,
        end_time: block.end_time,
        roomId: block.roomId,
        total_occupied_quotas: totalOccupied,
        total_quotas_available: room.quotas - totalOccupied,
      };
    });

    res.json(response);
  } catch (error) {
    console.error("Error al consultar los cupos semanales:", error);
    res.status(500).json({ error: "Error al obtener cupos semanales." });
  }
};
