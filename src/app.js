import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import swaggerUI from "swagger-ui-express";
import spec from "./swagger/swaggerConfig.js";
import RoomsRoutes from "./routes/rooms.routes.js";
import RegisterBookingRoutes from "./routes/bookings.routes.js";
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// ⚡ Configurar CORS
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/lapsi/v1/documentation", swaggerUI.serve, swaggerUI.setup(spec));
app.use("/api/lapsi/v1/rooms", RoomsRoutes);
app.use("/api/lapsi/v1/bookings", RegisterBookingRoutes);
app.use("/api/lapsi/v1/users", userRoutes);
app.use("/api/lapsi/v1/auth", authRoutes);

export default app;
