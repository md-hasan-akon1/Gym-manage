import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { traineeService } from "./trainee.service";

const  bookByTrainee= catchAsync(async (req: Request, res: Response) => {
const result=await traineeService.bookByTrainee(req.query,req.user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "booking confirmed!",
        data: result
    });
});
const  cancelBooking= catchAsync(async (req: Request, res: Response) => {
    const id=req.params.id
const result=await traineeService.cancelBooking(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "cancel booked slot success!",
        data: result
    });
});


export const traineeController = {
    bookByTrainee,
    cancelBooking
};