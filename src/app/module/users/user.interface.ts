import { Model } from "mongoose";
import { USER_ROLE } from "./user.constance";


// Define the User role type
export type UserRole = 'Admin' | 'Trainer' | 'Trainee';

// Define the User interface
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type TLoginUser = {
    email:string
    password: string;
  };


export interface UserModel extends Model<IUser> {
    //instance methods for checking if the user exist
    isUserExists(email: string): Promise<IUser>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
 
  }


  export type TUserRole = keyof typeof USER_ROLE;