import express from "express";
import { scheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constance";

const router = express.Router();

router.post("/",auth(USER_ROLE.admin) ,scheduleController.createSchedule);

export const ScheduleRoutes = router;
