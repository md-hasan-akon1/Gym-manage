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
  const result = await User.create(userData);
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

  const isExisting=await AssignedSchedule.findOne({
    trainerId:data.trainerId,
    scheduleId:data.scheduleId
  })

  if(isExisting){
    throw new AppError(httpStatus.UNAUTHORIZED, "schedule already  created!");
  }
  const result = await AssignedSchedule.create(data);
  return result;
};

export const adminService = {
  changeTrainerRole,
  updateTrainerData,
  deleteTrainer,
  trainerCreateByAdmin,
  assignedSchedule,
};
