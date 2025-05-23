import { sequelize } from "../../config/db.js";
import { AvailableQuotas } from "../../models/available_quotas.js";
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

// Controlador encargado de actualizar una reserva
export const updateBooking = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { bookingId } = req.params;
    const {
      userId,
      activity_type,
      other_activity,
      study_area,
      area_test,
      user_quantity,
      partners,
      teachers_name,
      bookingTimeBlockId,
      bookingDate,
    } = req.body;

    const booking = await Booking.findByPk(bookingId);

    if (!booking)
      return res.status(404).json({
        error: "No se ha encontrado la reserva que desea actualizar.",
      });

    if (user_quantity && user_quantity !== req.timeBlock.quotas_available) {
      await req.timeBlock.update(
        { quotas_available: req.timeBlock.quotas_available - user_quantity },
        { transaction }
      );
    }

    if (userId && userId !== booking.userId) booking.userId = userId;

    if (activity_type && activity_type !== booking.activity_type)
      booking.activity_type = activity_type;

    if (other_activity && other_activity !== booking.other_activity)
      booking.other_activity = other_activity;

    if (study_area && study_area !== booking.study_area)
      booking.study_area = study_area;

    if (area_test && area_test !== booking.area_test)
      booking.area_test = area_test;

    if (user_quantity && user_quantity !== booking.user_quantity)
      booking.user_quantity = user_quantity;

    if (partners && partners !== booking.partners) booking.partners = partners;

    if (teachers_name && teachers_name !== booking.teachers_name)
      booking.teachers_name = teachers_name;

    if (bookingTimeBlockId && bookingTimeBlockId !== booking.bookingTimeBlockId)
      booking.bookingTimeBlockId = bookingTimeBlockId;

    if (bookingDate && bookingDate !== booking.bookingDate)
      booking.bookingDate = bookingDate;

    await booking.save({ transaction });

    await transaction.commit();

    return res
      .status(201)
      .json({ message: "Reserva actualizada exitosamente." });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al intentar actualizar la reserva:", error);

    return res
      .status(500)
      .json({ error: "Error al intentar actualizar la reserva." });
  }
};

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
