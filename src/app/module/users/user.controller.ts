import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
import config from "../../config";

const createUser = catchAsync(async (req, res) => {
  const userData = await req.body;

  const result = await userServices.createUser(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User is created successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const userData = await req.body;

  const result = await userServices.loginUser(userData);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.nodeEnv === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  loginUser,
};
