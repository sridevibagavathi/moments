import { signUp, login } from "./preLogin";
import { logout } from "./postLogin";
import { addMoment, getMoment, updateMoment, deleteMoment, getMomentById } from "./moments";

export default {
  signUp,
  login,
  logout,
  addMoment,
  getMoment,
  updateMoment,
  deleteMoment,
  getMomentById
};
