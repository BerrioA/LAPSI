import { Booking } from "../../models/booking.js";

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
