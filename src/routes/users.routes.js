import { Router } from "express";
import {
  getStudentUsers,
  registerUsers,
  updateUser,
  deleteUser,
  changePassword,
  sendPasswordRecoveryUrl,
  resetPassword,
  verifyAccount,
} from "../controllers/users/index.js";
import {
  validateUserId,
  validateUserRegister,
  validateUserUpdate,
} from "../middlewares/users/index.js";
import { requireToken } from "../middlewares/auth/requireToken.js";

const router = Router();

router.get("/", getStudentUsers);
router.post("/", validateUserRegister, registerUsers);
router.patch("/", requireToken, validateUserUpdate, updateUser);
router.delete("/:userId", validateUserId, deleteUser);
router.patch("/change-password", requireToken, changePassword);
router.post("/recover-password", sendPasswordRecoveryUrl);
router.post("/reset-password", resetPassword);
router.patch("/verify-account/:code", verifyAccount);

export default router;
