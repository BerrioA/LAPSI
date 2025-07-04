import moment from "moment";
import { Booking } from "../models/booking.js";
import { BookingTimeBlocks } from "../models/booking_time_blocks.js";
import { sequelize } from "../config/db.js";
import { AvailableQuotas } from "../models/available_quotas.js";
import { Op } from "sequelize";

// Función para ejecutar como una tarea programada y actualizar las reservas pendientes
export const updateReservationsFinished = async (res) => {
  let bookingDuration;
  const reservationsUpdated = [];
  const transaction = await sequelize.transaction();
  try {
    const reservations = await Booking.findAll({
      where: {
        status: {
          [Op.in]: ["confirmada", "aprobada"],
        },
      },
      raw: false,
      include: {
        model: BookingTimeBlocks,
        attributes: ["id", "start_time", "end_time"],
      },
      transaction,
    });
    for (const reservation of reservations) {
      try {
        const { id, bookingTimeBlockId, user_quantity, bookingDate, duration } =
          reservation;
        const { start_time, end_time } = reservation.booking_time_block;

        // Verificar que todos los campos necesarios existan
        if (!bookingDate || !start_time) {
          console.error(
            `Reserva ID ${id} tiene campos faltantes. Fecha: ${bookingDate}, Hora: ${start_time}`
          );
          continue;
        }

        if (duration > 0 && duration <= 1) {
          bookingDuration = "01:00:00";
        } else if (duration > 1 && duration <= 2) {
          bookingDuration = "02:00:00";
        } else {
          // Añadir valor por defecto para otros casos
          bookingDuration = "01:00:00";
        }

        // Crear fecha y hora de inicio
        const dateStartTime = moment(
          `${bookingDate} ${start_time}`,
          "YYYY-MM-DD HH:mm:ss"
        );

        // Extraer horas, minutos y segundos de la duración
        let horas = 1,
          minutos = 0,
          segundos = 0;

        if (bookingDuration && typeof bookingDuration === "string") {
          const partesDuracion = bookingDuration.split(":");
          if (partesDuracion.length >= 1)
            horas = parseInt(partesDuracion[0]) || 0;
          if (partesDuracion.length >= 2)
            minutos = parseInt(partesDuracion[1]) || 0;
          if (partesDuracion.length >= 3)
            segundos = parseInt(partesDuracion[2]) || 0;
        }

        // Calcular fecha y hora de finalización
        const fechaHoraFin = dateStartTime
          .clone()
          .add(horas, "hours")
          .add(minutos, "minutes")
          .add(segundos, "seconds");

        // Obtener fecha y hora actual
        const fechaHoraActual = moment();

        if (fechaHoraActual.isAfter(fechaHoraFin)) {
          await reservation.update({ status: "finalizada" }, { transaction });

          console.log(
            `Reserva ID ${id} actualizada a Finalizada (${bookingDate} ${start_time} + ${duration})`
          );

          // 🔄 Liberar cupos en AvailableQuotas
          const existingQuota = await AvailableQuotas.findOne({
            where: {
              date: bookingDate,
              start_time,
              end_time,
              bookingTimeBlockId,
            },
            transaction,
          });

          if (existingQuota) {
            const nuevaCantidad = existingQuota.occupied_quotas - user_quantity;
            await existingQuota.update(
              {
                occupied_quotas: nuevaCantidad >= 0 ? nuevaCantidad : 0,
              },
              { transaction }
            );
          } else {
            console.warn(
              `⚠️ No se encontró cuota para liberar en bloque ${bookingTimeBlockId} con fecha ${bookingDate}`
            );
          }

          reservationsUpdated.push(id);
        }
      } catch (error) {
        console.error(
          `Error al procesar la reserva ID ${reservation.id}:`,
          error
        );
      }
    }

    await transaction.commit();

    console.log(
      `Se actualizaron ${reservationsUpdated.length} reservas a finalizadas.`
    );
  } catch (error) {
    await transaction.rollback();

    console.error("Error al procesar las reservas:", error);

    return res.status(500).json({
      error:
        "Se ha presentado un error al procesar las actualizaciones de reservas automaticas.",
    });
  }
};
