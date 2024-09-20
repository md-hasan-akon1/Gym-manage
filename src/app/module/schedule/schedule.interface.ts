import mongoose, { Schema, Document } from 'mongoose';

export interface ISchedule {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    trainerId?: mongoose.Types.ObjectId; // Optional reference to the Trainer
    traineeCount?: number; // Optional trainee count
}


