import { sequelize } from "../../config/db.js";
import { Booking } from "../../models/booking.js";
import { BookingTimeBlocks } from "../../models/booking_time_blocks.js";

// Controlador encargado de actualizar una reserva
export const updateBooking = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { bookingId } = req.params;
    const {
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

// Controlador encargado de actualizar una reserva en su estado a cancelada
export const updateBookingState = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    // Validar que el estado enviado sea permitido
    if (!["cancelada", "aprobada"].includes(status)) {
      return res.status(400).json({
        error: "Estado no válido. Solo se permite 'cancelada' o 'aprobada'.",
      });
    }

    const booking = await Booking.findByPk(bookingId, { transaction });

    if (!booking) {
      return res.status(404).json({
        error: "No se ha encontrado la reserva que desea actualizar.",
      });
    }

    // Solo hacer algo si el estado cambia
    if (booking.status !== status) {
      // Si la reserva se cancela, se liberan los cupos
      if (status === "cancelada" && booking.status !== "cancelada") {
        const timeBlock = await BookingTimeBlocks.findByPk(booking.bookingTimeBlockId, {
          transaction,
        });

        if (timeBlock) {
          await timeBlock.update(
            {
              quotas_available:
                timeBlock.quotas_available + booking.user_quantity,
            },
            { transaction }
          );
        }
      }

      // Actualizar estado de la reserva
      booking.status = status;
      await booking.save({ transaction });
    }

    await transaction.commit();

    return res
      .status(200)
      .json({ message: "Estado de la reserva actualizado correctamente." });
  } catch (error) {
    await transaction.rollback();
    console.error("Error al actualizar el estado de la reserva:", error);

    return res.status(500).json({
      error: "Error al intentar actualizar el estado de la reserva.",
    });
  }
};

