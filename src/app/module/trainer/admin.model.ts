import mongoose, { Schema } from "mongoose";
import { IAssignSchedule } from "./admin.interface";

const assignScheduleSchema:Schema<IAssignSchedule>= new Schema({
    trainerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Assuming User model contains Trainees
    },
    scheduleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Schedule', // Reference to the Schedule model
    },
}, { timestamps: true })

export const AssignedSchedule= mongoose.model<IAssignSchedule>('AssignedSchedule', assignScheduleSchema);