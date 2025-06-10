import { Router } from "express";
import {
  login,
  logout,
  profile,
  refreshToken,
} from "../controllers/auth/index.js";
import {
  loginValidation,
  requireRefreshToken,
  requireToken,
} from "../middlewares/auth/index.js";

const router = Router();

router.post("/login", loginValidation, login);
router.post("/logout", logout);
router.get("/profile", requireToken, profile);
router.get("/refresh", requireRefreshToken, refreshToken);

export default router;
