import { Booking } from "../../models/booking.js";

// Controlador encargado de obtener todas las reservas
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error al inntentar obtener las reservas:", error);

    return res
      .status(500)
      .json({ error: "Error al inntentar obtener las reservas." });
  }
};