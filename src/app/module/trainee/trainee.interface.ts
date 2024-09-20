import { Types } from "mongoose";


export interface IBooking  {
    _id: Types.ObjectId;
    traineeId: Types.ObjectId; // Reference to the Trainee
    scheduleId:Types.ObjectId; // Reference to the Class Schedule
}

