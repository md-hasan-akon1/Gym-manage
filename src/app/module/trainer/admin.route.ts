import express from "express";
import { adminController } from "./admin.controller";
import { USER_ROLE } from './../users/user.constance';
import auth from './../../middlewares/auth';

const router=express.Router()

router.patch("/",auth(USER_ROLE.admin),adminController.changeTrainerRole)
router.get("/",auth(USER_ROLE.admin),adminController.getAllTrainer)
router.patch("/updateInfo/:id",auth(USER_ROLE.admin),adminController.updateTrainerData)
router.delete("/delete/:id",auth(USER_ROLE.admin),adminController.deleteTrainer)
router.post("/add-trainer",auth(USER_ROLE.admin),adminController.trainerCreateByAdmin)
router.post("/trainer-assign",auth(USER_ROLE.admin),adminController.assignedSchedule)



export const AdminRouter=router