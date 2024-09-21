"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_constance_1 = require("../users/user.constance");
const user_model_1 = require("../users/user.model");
const schedule_model_1 = __importDefault(require("../schedule/schedule.model"));
const admin_model_1 = require("./admin.model");
const changeTrainerRole = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = data;
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: userId }, { role: role }, { new: true }).select({ password: false });
    return result;
});
const updateTrainerData = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.email) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "You con not change your email it is unique value");
    }
    if (data.password) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "you cannot change you password. go to change password");
    }
    const user = yield user_model_1.User.findOne({ _id: id, role: user_constance_1.USER_ROLE.trainer });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const result = yield user_model_1.User.findByIdAndUpdate({ _id: id }, Object.assign({}, data), { new: true }).select({ password: false });
    return result;
});
const deleteTrainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: id });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    if (user.role !== user_constance_1.USER_ROLE.trainer) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "This User is not a Trainer");
    }
    const result = yield user_model_1.User.deleteOne({ _id: id });
    return result;
});
const trainerCreateByAdmin = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role.toLowerCase(),
    };
    const result = yield user_model_1.User.create(data);
    const _a = result.toObject(), { password } = _a, rest = __rest(_a, ["password"]);
    return rest;
});
const assignedSchedule = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExitsSchedule = yield schedule_model_1.default.findOne({ _id: data.scheduleId });
    if (!isExitsSchedule) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "schedule not found");
    }
    const isExistsUser = yield user_model_1.User.findOne({ _id: data.trainerId });
    if (!isExistsUser) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    if (isExistsUser && isExistsUser.role !== user_constance_1.USER_ROLE.trainer) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User is  not a trainer !");
    }
    const isExisting = yield admin_model_1.AssignedSchedule.findOne({
        trainerId: data.trainerId,
        scheduleId: data.scheduleId,
    });
    const isExist = yield admin_model_1.AssignedSchedule.findOne({
        scheduleId: data.scheduleId,
    });
    if (isExisting || isExist) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "schedule already assign !");
    }
    const result = yield admin_model_1.AssignedSchedule.create(data);
    return result;
});
const getAllTrainer = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ role: user_constance_1.USER_ROLE.trainer }, { password: false });
    return result;
});
exports.adminService = {
    changeTrainerRole,
    updateTrainerData,
    deleteTrainer,
    trainerCreateByAdmin,
    assignedSchedule,
    getAllTrainer,
};
