import { Booking } from "../../models/booking.js";

// Controlador encargado de eliminar una reserva
export const deleteBooking = async (req, res) => {
  try {
    const { userId } = req.body;
    const { bookingId } = req.params;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada." });
    }

    if (booking.userId !== userId) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para eliminar esta reserva." });
    }

    await booking.destroy();

    return res.status(200).json({ message: "Reserva eliminada exitosamente." });
  } catch (error) {
    console.error("Error al intentar eliminar reserva:", error);
    return res
      .status(500)
      .json({ error: "Error al intentar eliminar reserva." });
  }
};
