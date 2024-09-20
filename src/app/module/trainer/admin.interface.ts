import { Types } from "mongoose";

export interface IAssignSchedule{
    _id:string,
    trainerId:Types.ObjectId,
    scheduleId:Types.ObjectId
}