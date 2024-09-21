import { addHours, addMinutes, format } from 'date-fns';
// Adjust the import path as necessary
import { ISchedule } from './schedule.interface';
import Schedule from './schedule.model';
import AppError from '../../errors/AppError';

const createSchedule = async (payload: ISchedule) => {
    const { startDate, endDate, startTime, endTime } = payload;
    const intervalTime = 2; // Duration of each class in hours
    const schedules = [];

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
   


    while (currentDate <= lastDate) {
     
       
       // Check if the limit of 5 schedules is reached
       

        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(startTime.split(':')[0])
                ),
                Number(startTime.split(':')[1])
            )
        );

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, 'yyyy-MM-dd')}`,
                    Number(endTime.split(':')[0])
                ),
                Number(endTime.split(':')[1])
            )
        );

        while (startDateTime < endDateTime) {
            const scheduleCount = await Schedule.aggregate([
                {
                    $match: {
                        startDate: format(currentDate, 'yyyy-MM-dd')
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
               throw new AppError (404,`Maximum of 5 schedules reached for ${format(currentDate, 'yyyy-MM-dd')}`);
            }
            const scheduleData = {
                startDate: format(currentDate, 'yyyy-MM-dd'),
                endDate: format(currentDate, 'yyyy-MM-dd'),
                startTime: format(startDateTime, 'HH:mm:ss'),
                endTime: format(addHours(startDateTime, intervalTime), 'HH:mm:ss'),
                traineeCount: 0, // Initial count
            };

            const existingSchedule = await Schedule.findOne({
                startDate: scheduleData.startDate,
                startTime: scheduleData.startTime,
                endTime: scheduleData.endTime,
            });

            if (!existingSchedule) {
                const result = await Schedule.create(scheduleData);
                schedules.push(result);
            }

            startDateTime.setHours(startDateTime.getHours() + intervalTime);
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return schedules; // Return created schedules
};


const getAllSchedule=async()=>{
const schedule=await Schedule.find()
return schedule
}
export const scheduleService = {
    createSchedule,
    getAllSchedule
};
