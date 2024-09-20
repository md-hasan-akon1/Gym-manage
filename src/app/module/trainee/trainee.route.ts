import express from "express";
import { traineeController } from "./trainee.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constance";

const router = express.Router();

router.post("/",auth(USER_ROLE.trainee) ,traineeController.bookByTrainee);
router.delete("/cancel/:id",auth(USER_ROLE.trainee) ,traineeController.cancelBooking);

export const TraineeRoutes = router;
