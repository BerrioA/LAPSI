import { Booking } from "../../models/booking.js";
import { User } from "../../models/users.js";
import { Room } from "../../models/rooms.js";
import { BookingTimeBlocks } from "../../models/booking_time_blocks.js";

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      attributes: {
        exclude: [ "updatedAt", "bookingTimeBlockId", "roomId"],
      },
      include: [
        {
          model: Room,
          attributes: ["room_name"],
        },
        {
          model: BookingTimeBlocks,
          attributes: ["start_time", "end_time"],
        },
        {
          model: User,
          attributes: ["name", "middle_name", "last_name", "second_last_name"],
        },
      ],
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error al intentar obtener las reservas:", error);
    return res
      .status(500)
      .json({ error: "Error al intentar obtener las reservas." });
  }
};

// Controlador encargado de obtener todas las reservas de cada usuario
export const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.uid },
      attributes: {
        exclude: [ "updatedAt", "bookingTimeBlockId", "roomId"],
      },
      include: [
        {
          model: Room,
          attributes: ["room_name"],
        },
        {
          model: BookingTimeBlocks,
          attributes: ["start_time", "end_time"],
        },
        {
          model: User,
          attributes: ["name", "middle_name", "last_name", "second_last_name"],
        },
      ],
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error al inntentar obtener las reservas:", error);

    return res
      .status(500)
      .json({ error: "Error al inntentar obtener las reservas." });
  }
};
