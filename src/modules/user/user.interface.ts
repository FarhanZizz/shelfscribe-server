import { Model } from "mongoose";

export type IUser = {
  name: string;
  password: string;
  email: string;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
