import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { scheduleService } from "./schedule.services";
import httpStatus from "http-status";

const  createSchedule= catchAsync(async (req: Request, res: Response) => {
    const result = await scheduleService.createSchedule(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});


export const scheduleController = {
    createSchedule
};