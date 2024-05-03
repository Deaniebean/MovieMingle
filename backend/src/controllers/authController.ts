import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User, userTokenValues } from "../models/mongooseUsers";
import express from "express";
import UserModel from "../models/userModel";
import { v4 as uuidv4 } from "uuid";
import { saveUserInDb } from "./saveUserInDb";

export const register = async (
  request: express.Request,
  response: express.Response
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

    const token = jwt.sign(userTokenValues, "RANDOM-TOKEN");
    response.status(200).send({
      message: "Sign Up Successful",
      token,
      uuid: userTokenValues.uuid,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "Error creating user",
      error,
    });
  }
};

export const login = async (
  request: express.Request,
  response: express.Response
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
      { uuid: userTokenValues.uuid, username: userTokenValues.username },
      "RANDOM-TOKEN"
    );
    console.log("user", userTokenValues)
    console.log("uuid", userTokenValues.uuid)
    response.status(200).send({
      message: "Login Successful",
      token,
      uuid: userTokenValues.uuid,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "An error occurred",
      error,
    });
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response
) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  user.password = await bcrypt.hash(req.body.newPassword, 10);
  await user.save();

  res.status(200).send({ message: "Password reset successful" });
};