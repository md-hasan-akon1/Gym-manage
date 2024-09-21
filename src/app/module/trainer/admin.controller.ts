import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { adminService } from "./admin.services";

const changeTrainerRole = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await adminService.changeTrainerRole(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Change Role successfully!",
    data: result,
  });
});
const updateTrainerData = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await adminService.updateTrainerData(data, id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Change Role successfully!",
    data: result,
  });
});
const deleteTrainer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await adminService.deleteTrainer(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trainer Delete successfully!",
    data: result,
  });
});

const trainerCreateByAdmin = catchAsync(async (req, res) => {
  const userData = await req.body;

  const result = await adminService.trainerCreateByAdmin(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Trainer is created successfully",
    data: result,
  });
});
const assignedSchedule = catchAsync(async (req, res) => {
  const Data = await req.body;

  const result = await adminService.assignedSchedule(Data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trainer assign successfully",
    data: result,
  });
});
const getAllTrainer = catchAsync(async (req, res) => {
  const Data = await req.body;

  const result = await adminService.getAllTrainer();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get all trainer successfully",
    data: result,
  });
});

export const adminController = {
  changeTrainerRole,
  updateTrainerData,
  trainerCreateByAdmin,
  deleteTrainer,
  assignedSchedule,
  getAllTrainer
};
