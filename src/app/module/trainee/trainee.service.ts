import { JwtPayload } from "jsonwebtoken";
import Schedule from "../schedule/schedule.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "./trainee.model";

const bookByTrainee = async (
  payload: { scheduleId?: string },
  user: JwtPayload
) => {

    const us
  const schedule = await Schedule.findById({ _id: payload.scheduleId });
  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, "Schedule not found.");
  }
  
  if (schedule.traineeCount! >= 10) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Class schedule is full. Maximum 10 trainees allowed per schedule.");
  }
  const existingBooking = await Booking.findOne({
    traineeId:user.,
    scheduleId,
});
if (existingBooking) {
    throw new Error('You have already booked a class for this time slot.');
}




};

export const traineeService = {
  bookByTrainee,
};
