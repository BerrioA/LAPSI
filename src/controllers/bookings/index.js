import { getBookings, getBookingsByUser } from "./allBookings.controller.js";
import { deleteBooking } from "./bookingDelete.controller.js";
import { registerBooking } from "./bookingRegister.controller.js";
import { updateBooking } from "./bookingUpdate.controller.js";

export {
  getBookings,
  getBookingsByUser,
  registerBooking,
  updateBooking,
  deleteBooking,
};
