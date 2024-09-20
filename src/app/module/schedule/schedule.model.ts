import mongoose, { Schema } from "mongoose";
import { ISchedule } from "./schedule.interface";

const ScheduleSchema: Schema<ISchedule>  = new Schema({
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    trainerId: { type: mongoose.Types.ObjectId, ref: 'Trainer' },
    traineeCount: { type: Number, default: 0 }
});

const Schedule = mongoose.model<ISchedule>('Schedule', ScheduleSchema);
export default Schedule;