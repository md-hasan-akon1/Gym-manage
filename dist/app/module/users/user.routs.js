"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constance_1 = require("./user.constance");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/create-user", (0, validateRequest_1.default)(user_validation_1.userValidationSchema), user_controller_1.userController.createUser);
router.get("/login", user_controller_1.userController.loginUser);
router.get("/", (0, auth_1.default)(user_constance_1.USER_ROLE.admin, user_constance_1.USER_ROLE.trainee, user_constance_1.USER_ROLE.trainer), user_controller_1.userController.getMe);
router.patch("/update", (0, auth_1.default)(user_constance_1.USER_ROLE.admin, user_constance_1.USER_ROLE.trainee, user_constance_1.USER_ROLE.trainer), (0, validateRequest_1.default)(user_validation_1.updateUserValidationSchema), user_controller_1.userController.updateMyProfile);
exports.UserRoutes = router;
