import { deleteUser } from "./userDelete.controller.js";
import { registerUsers } from "./userRegister.controller.js";
import { getStudentUsers } from "./userStudents.controller.js";
import { updateUser } from "./userUpdate.controller.js";
import { changePassword } from "./userChangePassword.controller.js";
import { sendPasswordRecoveryUrl } from "./userRecoverPassword.controller.js";
import { resetPassword } from "./userResetPasword.controller.js";
import { verifyAccount } from "./userVerifyAccount.controller.js";

export {
  getStudentUsers,
  registerUsers,
  updateUser,
  deleteUser,
  changePassword,
  sendPasswordRecoveryUrl,
  resetPassword,
  verifyAccount,
};
