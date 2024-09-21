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
exports.scheduleService = void 0;
const date_fns_1 = require("date-fns");
const schedule_model_1 = __importDefault(require("./schedule.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createSchedule = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, startTime, endTime } = payload;
    const intervalTime = 2; // Duration of each class in hours
    const schedules = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
    while (currentDate <= lastDate) {
        // Check if the limit of 5 schedules is reached
        const startDateTime = new Date((0, date_fns_1.addMinutes)((0, date_fns_1.addHours)(`${(0, date_fns_1.format)(currentDate, 'yyyy-MM-dd')}`, Number(startTime.split(':')[0])), Number(startTime.split(':')[1])));
        const endDateTime = new Date((0, date_fns_1.addMinutes)((0, date_fns_1.addHours)(`${(0, date_fns_1.format)(currentDate, 'yyyy-MM-dd')}`, Number(endTime.split(':')[0])), Number(endTime.split(':')[1])));
        while (startDateTime < endDateTime) {
            const scheduleCount = yield schedule_model_1.default.aggregate([
                {
                    $match: {
                        startDate: (0, date_fns_1.format)(currentDate, 'yyyy-MM-dd')
                    }
                },
                {
                    $group: {
                        _id: '$startDate', // Group by startDate
                        totalSchedules: { $sum: 1 } // Count schedules
                    }
                }
            ]);
            if (scheduleCount.length > 0 && scheduleCount[0].totalSchedules >= 5) {
                throw new AppError_1.default(404, `Maximum of 5 schedules reached for ${(0, date_fns_1.format)(currentDate, 'yyyy-MM-dd')}`);
            }
            const scheduleData = {
                startDate: (0, date_fns_1.format)(currentDate, 'yyyy-MM-dd'),
                endDate: (0, date_fns_1.format)(currentDate, 'yyyy-MM-dd'),
                startTime: (0, date_fns_1.format)(startDateTime, 'HH:mm:ss'),
                endTime: (0, date_fns_1.format)((0, date_fns_1.addHours)(startDateTime, intervalTime), 'HH:mm:ss'),
                traineeCount: 0, // Initial count
            };
            const existingSchedule = yield schedule_model_1.default.findOne({
                startDate: scheduleData.startDate,
                startTime: scheduleData.startTime,
                endTime: scheduleData.endTime,
            });
            if (!existingSchedule) {
                const result = yield schedule_model_1.default.create(scheduleData);
                schedules.push(result);
            }
            startDateTime.setHours(startDateTime.getHours() + intervalTime);
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return schedules; // Return created schedules
});
exports.scheduleService = {
    createSchedule
};
