import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { USER_ROLE } from "../users/user.constance";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";

import Schedule from "../schedule/schedule.model";
import { AssignedSchedule } from "./admin.model";

const changeTrainerRole = async (data: { userId: string; role: string }) => {
  const { userId, role } = data;
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { role: role },
    { new: true }
  ).select({ password: false });
  return result;
};
const updateTrainerData = async (data: Partial<IUser>, id: string) => {
  if (data.email) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "You con not change your email it is unique value"
    );
  }
  if (data.password) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "you cannot change you password. go to change password"
    );
  }
  const user = await User.findOne({ _id: id, role: USER_ROLE.trainer });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  const result = await User.findByIdAndUpdate(
    { _id: id },
    { ...data },
    { new: true }
  ).select({ password: false });
  return result;
};
const deleteTrainer = async (id: string) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  if (user.role !== USER_ROLE.trainer) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "This User is not a Trainer");
  }
  const result = await User.deleteOne({ _id: id });
  return result;
};

const trainerCreateByAdmin = async (userData: IUser) => {
  const data = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    role: userData.role.toLowerCase(),
  };
  const result = await User.create(data);
  const { password, ...rest } = result.toObject();
  return rest;
};

const assignedSchedule = async (data: {
  trainerId: string;
  scheduleId: string;
}) => {
  const isExitsSchedule = await Schedule.findOne({ _id: data.scheduleId });
  if (!isExitsSchedule) {
    throw new AppError(httpStatus.NOT_FOUND, "schedule not found");
  }
  const isExistsUser = await User.findOne({ _id: data.trainerId });
  if (!isExistsUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  if (isExistsUser && isExistsUser.role !== USER_ROLE.trainer) {
    throw new AppError(httpStatus.NOT_FOUND, "User is  not a trainer !");
  }

  const isExisting = await AssignedSchedule.findOne({
    trainerId: data.trainerId,
    scheduleId: data.scheduleId,
  });
  const isExist = await AssignedSchedule.findOne({
    scheduleId: data.scheduleId,
  });
  if (isExisting || isExist) {
    throw new AppError(httpStatus.UNAUTHORIZED, "schedule already assign !");
  }
  const result = await AssignedSchedule.create(data);
  return result;
};
const getAllTrainer = async () => {
  const result = await User.find(
    { role: USER_ROLE.trainer },
    { password: false }
  );
  return result;
};

export const adminService = {
  changeTrainerRole,
  updateTrainerData,
  deleteTrainer,
  trainerCreateByAdmin,
  assignedSchedule,
  getAllTrainer,
};
