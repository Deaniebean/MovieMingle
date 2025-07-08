import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/mongooseUsers";
import express from "express";
import UserModel from "../models/userModel";
import { v4 as uuidv4 } from "uuid";
import { saveUserInDb } from "./saveUserInDb";
import dotenv from "dotenv";
import { Output, object, parse, string } from "valibot";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

// Valibot Schema for input validation
const UserSchema = object({
  username: string(),
  password: string(),
});
type UserData = Output<typeof UserSchema>;

export const register = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
): Promise<any> => {
  if (!request.body) {
    const error = new Error("Request body is missing");
    return response.status(400).send({ message: "Request body is missing" });
  }

  // Check if username or password is missing or empty
  if (!request.body.username || !request.body.password) {
    return response.status(400).send({ message: "Username or password is missing" });
  }

  let data: UserData;
  try {
    data = parse(UserSchema, request.body);
  } catch (error) {
    return next(error);
  }

  try {
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      response.status(400).send({ message: "Username already exists" });
      return;
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userModel: UserModel = {
      uuid: await uuidv4(),
      username: data.username,
      password: hashedPassword,
      watch_list: [],
      history: [],
    };

    await saveUserInDb(userModel);

    const userTokenValues = {
      uuid: userModel.uuid,
      username: userModel.username,
    };

    const token = jwt.sign(userTokenValues, secretKey);
    response.status(200).send({
      message: "Sign Up Successful",
      token,
      uuid: userTokenValues.uuid,
    });
  } catch (error) {
    //console.log(error);
    next(new Error("Error creating user"));
  }
};


export const login = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
): Promise<void> => {
  let data: UserData;
  try {
    data = parse(UserSchema, request.body);
  } catch (error) {
    console.error(error);
    response.status(400).send({ message: "Invalid request body", error });
    return;
  }
  try {
    const user = await User.findOne({ username: data.username });
    if (!user) {
      response.status(404).send({
        message: "user not found",
      });
      return;
    }

    const passwordCheck = await bcrypt.compare(data.password, user.password);
    if (!passwordCheck) {
      response.status(400).send({
        message: "Password is incorrect",
      });
      return;
    }

    const token = jwt.sign(
      { uuid: user.uuid, username: user.username },
      "RANDOM-TOKEN"
    );
    response.status(200).send({
      message: "Login Successful",
      token,
      uuid: user.uuid,
    });
  } catch (error) {
    //console.log(error);
    next(new Error("Error during login"));
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let data: UserData;
    try {
      data = parse(UserSchema, req.body);
    } catch (error) {
      res.status(400).send({ message: "Invalid request body", error });
      return;
    }

    const user = await User.findOne({ username: data.username });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    if (!data.password) {
      res.status(400).send({ message: "New password is required" });
      return;
    }
    user.password = await bcrypt.hash(data.password, 10);
    await user.save();

    res.status(200).send({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    next(new Error("An error occurred with password reset"));
  }
};
 