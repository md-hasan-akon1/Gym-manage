import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constance";

const router=Router()
router.post("/create-user",userController.createUser)
router.get("/login",userController.loginUser)
router.get("/",auth(USER_ROLE.admin,USER_ROLE.trainee,USER_ROLE.trainer), userController.getMe)
router.patch("/update",auth(USER_ROLE.admin,USER_ROLE.trainee,USER_ROLE.trainer), userController.updateMyProfile)


export const UserRoutes=router