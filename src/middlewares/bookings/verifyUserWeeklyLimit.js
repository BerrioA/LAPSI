import { Booking } from "../../models/booking.js";
import { Op } from "sequelize";
import { BookingTimeBlocks } from "../../models/booking_time_blocks.js";
import { User } from "../../models/users.js";
import moment from "moment";
import { AvailableQuotas } from "../../models/available_quotas.js";
import { Room } from "../../models/rooms.js";

//Middleware encargado de validar si un usuario tiene reservas pendientes y tiene horas disponibles
export const verifyUserWeeklyLimit = async (req, res, next) => {
  try {
    const { userId, bookingTimeBlockId, roomId, bookingDate } = req.body;
    const { startDate, endDate } = getDates(bookingDate);
    let totalHorasReservadas = 0;
    let totalQuotesOccupied = 0;
    let totalHours = 0;

    const validateRoom = await Room.findByPk(roomId);
    if (!validateRoom)
      return res.status(404).json({ error: "Sala no encontrada." });

    const validateUser = await User.findByPk(userId);
    if (!validateUser)
      return res.status(404).json({ error: "Usuario no encontrado." });

    const userBookings = await Booking.findAll({
      where: {
        userId,
        bookingDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    if (!userBookings)
      return res
        .status(404)
        .json({ error: "No se han encontrado reservas para este usuario." });

    userBookings.forEach((booking) => {
      totalHorasReservadas += booking.duration;
    });
    const limiteExcedido = totalHorasReservadas >= 1.5;

    if (limiteExcedido)
      return res.status(403).json({
        error: "Ups, ya has reservado el número de horas maximas por semana.",
      });

    //Validar cupos disponobles en la nueva tabla
    const cuposDisponibles = await AvailableQuotas.findAll({
      where: { date: bookingDate },
    });

    // Total de cupos ocupados
    cuposDisponibles.forEach((quotes) => {
      totalQuotesOccupied += quotes.occupied_quotas;
    });

    console.log(
      "TOTAL DE CUPOS OCUPADOS DEL ARRAY SUMADOS PARA ESTE BLOQUE:",
      totalQuotesOccupied
    );

    if (cuposDisponibles) {
      const timeBlock = await BookingTimeBlocks.findByPk(bookingTimeBlockId);

      if (!timeBlock) {
        return res
          .status(404)
          .json({ message: "Bloque de tiempo no encontrado" });
      }

      if (timeBlock && totalQuotesOccupied >= validateRoom.quotas) {
        return res
          .status(400)
          .json({ message: "No hay cupos disponibles para este horario" });
      }

      const minutes = (time) => {
        const [horas, minutos, segundos] = time.split(":").map(Number);
        return horas * 60 + minutos + segundos / 60;
      };
      const startMinutes = minutes(timeBlock.start_time);
      const endMinutes = minutes(timeBlock.end_time);
      const duration = (endMinutes - startMinutes) / 60;
      totalHours += duration;

      req.timeBlock = timeBlock;
      req.totalHours = totalHours;
      req.start_time = timeBlock.start_time;
      req.end_time = timeBlock.end_time;

      console.log("START TIME:", timeBlock.start_time);
      console.log("END TIME:", timeBlock.end_time);
    }

    // req.totalHorasReservadas = totalHorasReservadas;
    // req.horasDisponibles = horasDisponibles;

    // req.reservas = userBookings;

    next();
  } catch (error) {
    console.error("Error al verificar cantidad de horas reservadas:", error);

    return res.status({
      error: "Error al verificar cantidad de horas reservadas.",
    });
  }
};

const getDates = (date) => {
  const m = moment(date);

  const startWeek = m.clone().startOf("isoWeek");
  const endWeek = m.clone().endOf("isoWeek");

  return {
    startDate: startWeek.format("YYYY-MM-DD"),
    endDate: endWeek.format("YYYY-MM-DD"),
  };
};
