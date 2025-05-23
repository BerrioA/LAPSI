import { Router } from "express";
import {
  deleteBooking,
  getBookings,
  registerBooking,
  updateBooking,
} from "../controllers/bookings/bookings.controller.js";
import { verifyUserWeeklyLimit } from "../middlewares/bookings/verifyUserWeeklyLimit.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reservas
 *   description: Endpoints para la gestión de reservas

 * @swagger
 * components:
 *   schemas:
 *     Partner:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Rocardo
 *         last_name:
 *           type: string
 *           example: Monterroza

 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 78663e95-a3d2-4477-9beb-505e878cc570
 *         study_area:
 *           type: string
 *           example: Social
 *         area_test:
 *           type: string
 *           example: EMA Escala Magallanes de adaptación –(permite detectar alumnos con problemas en algunos de estos ámbitos; familiar, escolar o personal)
 *         user_quantity:
 *           type: integer
 *           example: 1
 *         partners:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Partner'
 *         activity_type:
 *           type: string
 *           example: Practica de aplicación de prueba
 *         other_activity:
 *           type: string
 *           example: ""
 *         teachers_name:
 *           type: string
 *           example: Juan Gabriel
 *         bookingDate:
 *           type: string
 *           format: date
 *           example: 2025-07-20
 *         status:
 *           type: string
 *           example: confirmada
 *         bookingTimeBlockId:
 *           type: string
 *           format: uuid
 *           example: 0516e692-9f16-4cc8-97d9-4986927d15a7
 *         duration:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: string
 *           format: uuid
 *           example: 523d483d-2151-42c6-9b7a-ae020090dbea

 * @swagger
 * /bookings:
 *   get:
 *     summary: Obtener todas las reservas
 *     description: Retorna todas las reservas registradas en el sistema. Requiere token de autenticación y permisos de administrador.
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado (no es administrador)
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", getBookings);
/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Registrar una reserva
 *     description: Crea una nueva reserva de sala para un estudiante. El ID del usuario se obtiene automáticamente desde el token de autenticación.
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - activity_type
 *               - study_area
 *               - area_test
 *               - user_quantity
 *               - teachers_name
 *               - bookingDate
 *               - bookingTimeBlockId
 *             properties:
 *               activity_type:
 *                 type: string
 *                 example: Calificar prueba
 *               other_activity:
 *                 type: string
 *                 example: ""
 *               study_area:
 *                 type: string
 *                 example: Social
 *               area_test:
 *                 type: string
 *                 example: "EMA Escala Magallanes de adaptación –(permite detectar alumnos con problemas en algunos de estos ámbitos: familiar, escolar o personal)"
 *               user_quantity:
 *                 type: integer
 *                 example: 2
 *               partners:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Daniel
 *                     last_name:
 *                       type: string
 *                       example: Rincon
 *               teachers_name:
 *                 type: string
 *                 example: Juan Gabriel
 *               bookingDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-09
 *               bookingTimeBlockId:
 *                 type: string
 *                 format: uuid
 *                 example: 0516e692-9f16-4cc8-97d9-4986927d15a7
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reserva creada correctamente.
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Error de validación o solicitud incorrecta
 *       401:
 *         description: No autorizado (token inválido o no enviado)
 *       403:
 *         description: Acceso denegado (no es estudiante o supera el límite de reservas semanales)
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", verifyUserWeeklyLimit, registerBooking);
/**
 * @swagger
 * /bookings/{bookingId}:
 *   patch:
 *     summary: Actualizar una reserva
 *     description: Permite al usuario autenticado actualizar una de sus propias reservas. La reserva no puede exceder el límite de 2 horas semanales.
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID de la reserva a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activity_type:
 *                 type: string
 *                 example: Evaluación diagnóstica
 *               other_activity:
 *                 type: string
 *                 example: ""
 *               study_area:
 *                 type: string
 *                 example: Cognitiva
 *               area_test:
 *                 type: string
 *                 example: Prueba de habilidades verbales
 *               user_quantity:
 *                 type: integer
 *                 example: 2
 *               partners:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Ana
 *                     last_name:
 *                       type: string
 *                       example: Torres
 *               teachers_name:
 *                 type: string
 *                 example: Laura Gómez
 *               bookingDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-07-15
 *               bookingTimeBlockId:
 *                 type: string
 *                 format: uuid
 *                 example: 0516e692-9f16-4cc8-97d9-4986927d15a7
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reserva actualizada correctamente.
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Datos inválidos o error de validación
 *       401:
 *         description: No autorizado (token no enviado o inválido)
 *       403:
 *         description: No tienes permiso para modificar esta reserva
 *       404:
 *         description: Reserva no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/:bookingId", verifyUserWeeklyLimit, updateBooking);
/**
 * @swagger
 * /bookings/{bookingId}:
 *   delete:
 *     summary: Eliminar una reserva del usuario autenticado
 *     description: Permite a un estudiante eliminar una reserva si le pertenece. El ID del usuario se obtiene desde el token JWT.
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a eliminar
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reserva eliminada exitosamente.
 *       403:
 *         description: El usuario no tiene permiso para eliminar esta reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No tienes permiso para eliminar esta reserva.
 *       404:
 *         description: Reserva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Reserva no encontrada.
 *       500:
 *         description: Error del servidor al intentar eliminar la reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al intentar eliminar reserva.
 */
router.delete("/:bookingId", deleteBooking);

export default router;
