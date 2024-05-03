import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User } from "../models/mongooseUsers";
import express from "express";
import UserModel from "../models/userModel";
import { v4 as uuidv4 } from "uuid";
import { saveUserInDb } from "./saveUserInDb";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.JWT_SECRET

export const register = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
): Promise<void> => {
  if (!request.body) {
    response.status(400).send({ message: "Request body is missing" });
    return;
  }

  if (!request.body.username || !request.body.password) {
    response.status(400).send({ message: "Username or password is missing" });
    return;
  }

  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const userModel: UserModel = {
      uuid: await uuidv4(),
      username: request.body.username,
      password: hashedPassword,
      watch_list: [],
      history: [],
    };

    await saveUserInDb(userModel);

    const userTokenValues = {
      uuid: userModel.uuid,
      username: userModel.username
    };

    const token = jwt.sign(userTokenValues, secretKey);
    response.status(200).send({
      message: "Sign Up Successful",
      token,
      uuid: userTokenValues.uuid,
    });
  } catch (error) {
    console.log(error);
    next(new Error("Error creating user"))
  }
};

export const login = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction

): Promise<void> => {
  try {
    const user = await User.findOne({ username: request.body.username });
    if (!user) {
      response.status(404).send({
        message: "user not found",
      });
      return;
    }

    const passwordCheck = await bcrypt.compare(
      request.body.password,
      user.password
    );
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
    console.log("user", user.username)
    console.log("uuid", user.uuid)
    response.status(200).send({
      message: "Login Successful",
      token,
      uuid: user.uuid,
    });
  } catch (error) {
    console.log(error);
    next(new Error("Error during login"))
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    if (!req.body.newPassword) {
      res.status(400).send({ message: "New password is required" });
      return;
    }
    user.password = await bcrypt.hash(req.body.newPassword, 10);
    await user.save();

    res.status(200).send({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    next(new Error("An error occurred with password reset"))
  }
};