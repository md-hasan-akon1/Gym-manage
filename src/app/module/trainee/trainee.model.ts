import mongoose, { Schema } from "mongoose";
import { IBooking } from "./trainee.interface";

const BookingSchema: Schema<IBooking> = new Schema({
    traineeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Assuming User model contains Trainees
    },
    scheduleId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Schedule', // Reference to the Schedule model
    },
}, { timestamps: true });

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);

