import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISchedule {
    _id: Types.ObjectId;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    trainerId?: mongoose.Types.ObjectId; // Optional reference to the Trainer
    traineeCount?: number; // Optional trainee count
}


