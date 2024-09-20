import mongoose, { Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import * as argon2 from "argon2";

const UserSchema: Schema<IUser, UserModel> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    match: /.+\@.+\..+/, // Basic email validation
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "trainer", "trainee"],
    default: "trainee",
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  this.password = await argon2.hash(this.password);
  next();
});

UserSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await argon2.verify(hashedPassword, plainTextPassword);
};

// Create the User model
export const User = mongoose.model<IUser, UserModel>("User", UserSchema);
