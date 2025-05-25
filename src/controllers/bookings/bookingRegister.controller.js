import { sequelize } from "../../config/db.js";
import { Booking } from "../../models/booking.js";
import { AvailableQuotas } from "../../models/available_quotas.js";

// Controlador encargado de registrar una reserva
export const registerBooking = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      activity_type,
      other_activity,
      study_area,
      area_test,
      user_quantity,
      partners,
      teachers_name,
      bookingDate,
      roomId,
      bookingTimeBlockId,
    } = req.body;

    await Booking.create(
      {
        userId: req.uid,
        activity_type,
        other_activity,
        study_area,
        area_test,
        user_quantity,
        partners,
        teachers_name,
        bookingDate,
        duration: req.totalHours,
        roomId,
        bookingTimeBlockId,
      },
      { transaction }
    );

    await AvailableQuotas.create(
      {
        date: bookingDate,
        occupied_quotas: user_quantity,
        start_time: req.start_time,
        end_time: req.end_time,
        bookingTimeBlockId,
      },
      { transaction }
    );

    await transaction.commit();

    return res
      .status(201)
      .json({ message: "Reserva registrada exitosamente." });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear reserva:", error);

    return res.status(500).json({ error: "Error al crear reserva." });
  }
};
