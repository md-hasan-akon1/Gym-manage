import { JwtPayload } from "jsonwebtoken";
import Schedule from "../schedule/schedule.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "./trainee.model";
import { User } from "../users/user.model";
import mongoose from "mongoose";
import { setErrorMap } from "zod";

const bookByTrainee = async (
  payload: { scheduleId?: string },
  user: JwtPayload
) => {
  const userExist = await User.isUserExists(user.email);
  
  const schedule = await Schedule.findById({ _id: payload.scheduleId });
  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, "Schedule not found.");
  }

  if (schedule.traineeCount! >= 10) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "Class schedule is full. Maximum 10 trainees allowed per schedule."
    );
  }
  const existingBooking = await Booking.findOne({
    traineeId: userExist._id,
    scheduleId: payload.scheduleId,
  });

  if (existingBooking) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "You have already booked a class for this time slot."
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const booking = await Booking.create(
      [
        {
          traineeId: userExist._id,
          scheduleId: payload.scheduleId,
        },
      ],
      { session }
    );

    const updateTraineeCapacity = await Schedule.findByIdAndUpdate(
      { _id: payload.scheduleId },
      { $inc: { traineeCount: 1 } }, 
      { new: true, session }
    );

    
    await session.commitTransaction()
    await session.endSession()
    return booking;
  } catch (error) {
    session.abortTransaction()
    session.endSession()
  }
};

export const traineeService = {
  bookByTrainee,
};
