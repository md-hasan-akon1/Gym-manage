"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.traineeService = void 0;
const schedule_model_1 = __importDefault(require("../schedule/schedule.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const trainee_model_1 = require("./trainee.model");
const user_model_1 = require("../users/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const bookByTrainee = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.User.isUserExists(user.email);
    const schedule = yield schedule_model_1.default.findById({ _id: payload.scheduleId });
    if (!schedule) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Schedule not found.");
    }
    if (schedule.traineeCount >= 10) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Class schedule is full. Maximum 10 trainees allowed per schedule.");
    }
    const existingBooking = yield trainee_model_1.Booking.findOne({
        traineeId: userExist._id,
        scheduleId: payload.scheduleId,
    });
    if (existingBooking) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "You have already booked a class for this time slot.");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const booking = yield trainee_model_1.Booking.create([
            {
                traineeId: userExist._id,
                scheduleId: payload.scheduleId,
            },
        ], { session });
        const updateTraineeCapacity = yield schedule_model_1.default.findByIdAndUpdate({ _id: payload.scheduleId }, { $inc: { traineeCount: 1 } }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return booking;
    }
    catch (error) {
        session.abortTransaction();
        session.endSession();
    }
});
const cancelBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainee_model_1.Booking.deleteOne({ _id: id });
    return result;
});
exports.traineeService = {
    bookByTrainee,
    cancelBooking,
};
