import { Router } from "express";
import {
  getAllRooms,
  getWeeklyQuotasStatus,
} from "../controllers/rooms/room.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Salas
 *   description: Endpoints para la gestión de salas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "2dd3a8ea-c090-41e2-88bb-702de41318c8"
 *         room_name:
 *           type: string
 *           example: "Sala 1 - Sala de aplicación de pruebas"
 *         quotas:
 *           type: integer
 *           example: 13
 *         description:
 *           type: string
 *           example: "Es un espacio amplio de condiciones idóneas para la aplicación..."
 */

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Obtener todas las salas
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Lista de todas las salas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
router.get("/", getAllRooms);
// /**
//  * @swagger
//  * /rooms/{roomId}:
//  *   get:
//  *     summary: Obtener horarios disponibles por sala
//  *     description: Retorna el horario semanal de una sala, organizado por día con los bloques de tiempo y la cantidad de cupos disponibles por bloque.
//  *     tags: [Salas]
//  *     parameters:
//  *       - in: path
//  *         name: roomId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID de la sala
//  *     responses:
//  *       200:
//  *         description: Horario de disponibilidad por día con bloques y cupos disponibles
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/RoomScheduleResponse'
//  *       404:
//  *         description: Sala no encontrada
//  *       500:
//  *         description: Error interno del servidor
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     RoomScheduleResponse:
//  *       type: object
//  *       properties:
//  *         roomName:
//  *           type: string
//  *           example: Sala 1 - Sala de aplicación de pruebas
//  *         totalQuotas:
//  *           type: integer
//  *           example: 13
//  *         schedule:
//  *           type: object
//  *           additionalProperties:
//  *             type: array
//  *             items:
//  *               $ref: '#/components/schemas/ScheduleBlock'
//  *     ScheduleBlock:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: string
//  *           format: uuid
//  *           example: 34a125e5-e1d2-45cb-b14d-019bd623cc85
//  *         day:
//  *           type: string
//  *           example: Lunes
//  *         start_time:
//  *           type: string
//  *           format: time
//  *           example: "08:15:00"
//  *         end_time:
//  *           type: string
//  *           format: time
//  *           example: "09:00:00"
//  *         quotas_available:
//  *           type: integer
//  *           example: 13
//  */
// router.get("/:roomId", getAllTimeBlocksByRoom);

/**
 * @swagger
 * /rooms/{roomId}:
 *   get:
 *     summary: Obtener el estado semanal de cupos por bloque de tiempo en una sala
 *     tags:
 *       - Quotas
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sala a consultar
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de referencia para obtener la semana (formato YYYY-MM-DD). Por defecto es la fecha actual.
 *     responses:
 *       200:
 *         description: Lista de bloques de tiempo con cupos ocupados y disponibles para la semana correspondiente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   block_id:
 *                     type: string
 *                     format: uuid
 *                     example: "8c4045a6-c986-4825-aa68-ef0fb2766a3c"
 *                   day:
 *                     type: string
 *                     example: "Lunes"
 *                   start_time:
 *                     type: string
 *                     example: "08:15:00"
 *                   end_time:
 *                     type: string
 *                     example: "10:00:00"
 *                   roomId:
 *                     type: string
 *                     format: uuid
 *                     example: "7ae6ef62-4f4c-4e64-a384-5fe03ddaadf2"
 *                   total_occupied_quotas:
 *                     type: integer
 *                     example: 2
 *                   total_quotas_available:
 *                     type: integer
 *                     example: 28
 *       404:
 *         description: Sala no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:roomId", getWeeklyQuotasStatus);

export default router;
