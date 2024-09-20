import express from "express";
import { traineeController } from "./trainee.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constance";

const router = express.Router();

router.post("/",auth(USER_ROLE.Trainee) ,traineeController.bookByTrainee);
router.delete("/",auth(USER_ROLE.Trainee) ,traineeController.bookByTrainee);

export const TraineeRoutes = router;
