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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const config_1 = __importDefault(require("../../config"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    const _a = result.toObject(), { password } = _a, rest = __rest(_a, ["password"]);
    return rest;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExists(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password do not matched");
    }
    //create token and sent to the  client
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.secretKey, config_1.default.expireIn);
    const refreshToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.secretKey, config_1.default.expireIn);
    return {
        accessToken,
        refreshToken,
    };
});
const getMe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({
        email: payload.email,
        role: payload.role,
    }, { password: false });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return result;
});
const updateMyProfile = (payload, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    if (updateData.email) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "You con not change your email it is unique value");
    }
    if (updateData.role) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "You con not change your role");
    }
    if (updateData.password) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "you cannot change you password. go to change password");
    }
    const user = yield user_model_1.User.findOne({
        email: payload.email,
        role: payload.role,
    }, { password: false });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield user_model_1.User.findOneAndUpdate({ email: user.email }, updateData, { new: true }).select({ password: false });
    return result;
});
exports.userServices = {
    createUser,
    loginUser,
    getMe,
    updateMyProfile,
};
