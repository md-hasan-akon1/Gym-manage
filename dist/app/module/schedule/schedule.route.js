"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const schedule_controller_1 = require("./schedule.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constance_1 = require("../users/user.constance");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_constance_1.USER_ROLE.admin), schedule_controller_1.scheduleController.createSchedule);
router.get("/", (0, auth_1.default)(user_constance_1.USER_ROLE.admin), schedule_controller_1.scheduleController.getAllSchedule);
exports.ScheduleRoutes = router;
