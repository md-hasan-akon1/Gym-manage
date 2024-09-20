import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IUser, TLoginUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.utils";
import config from "../../config";

const createUser = async (userData: IUser) => {
  const result = await User.create(userData);
  const { password, ...rest } = result.toObject();
  return rest;
};
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
    
  };

  const accessToken = createToken(
    jwtPayload,
    config.secretKey as string,
    config.expireIn as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.secretKey as string,
    config.expireIn as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const userServices = {
  createUser,
  loginUser,
};
