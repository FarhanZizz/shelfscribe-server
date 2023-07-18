/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "IBook",
      },
    ],
    reading: [
      {
        type: Schema.Types.ObjectId,
        ref: "IBook",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      },
    },
  }
);
userSchema.pre("save", async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});

export const User = model<IUser, UserModel>("User", userSchema);
