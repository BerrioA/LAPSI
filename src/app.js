import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import swaggerUI from "swagger-ui-express";

// import spec from "./swagger/swagger.js";

const app = express();

// ⚡ Configurar CORS
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
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
// app.use("/api/lapsi/v1/documentation", swaggerUI.serve, swaggerUI.setup(spec));

export default app;
