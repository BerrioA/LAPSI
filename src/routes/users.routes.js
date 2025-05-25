import { Router } from "express";
import {
  getStudentUsers,
  registerUsers,
  updateUser,
  deleteUser,
} from "../controllers/users/index.js";
import {
  validateUserId,
  validateUserRegister,
  validateUserUpdate,
} from "../middlewares/users/index.js";

const router = Router();

router.get("/", getStudentUsers);
router.post("/", validateUserRegister, registerUsers);
router.patch("/:userId", validateUserId, validateUserUpdate, updateUser);
router.delete("/:userId", validateUserId, deleteUser);

export default router;
