import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constance";
import validateRequest from "../../middlewares/validateRequest";
import { updateUserValidationSchema, userValidationSchema } from "./user.validation";

const router = Router();
router.post(
  "/create-user",
  validateRequest(userValidationSchema),
  userController.createUser
);
router.get("/login", userController.loginUser);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.trainee, USER_ROLE.trainer),
  userController.getMe
);
router.patch(
  "/update",
  auth(USER_ROLE.admin, USER_ROLE.trainee, USER_ROLE.trainer), validateRequest(updateUserValidationSchema),

  userController.updateMyProfile
);

export const UserRoutes = router;
