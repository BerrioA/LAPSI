import { Router } from "express";
import { registerUsers } from "../controllers/users/index.js";

const router = Router();

router.post("/", registerUsers);

export default router;
