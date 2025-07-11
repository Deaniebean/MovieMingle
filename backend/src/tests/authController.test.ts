import { Request, Response } from "express";
import { mock, MockProxy } from "jest-mock-extended";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { saveUserInDb } from "../controllers/saveUserInDb";
import UserModel from "../models/userModel";
import { register } from "../controllers/authController";
import { login } from "../controllers/authController";
import {User} from "../models/mongooseUsers";



jest.mock("jsonwebtoken");
jest.mock("bcryptjs");
jest.mock("uuid");
jest.mock("../controllers/saveUserInDb");

let req: MockProxy<Request>;
let res: MockProxy<Response>;
const next = jest.fn();


beforeEach(() => {
  req = mock<Request>();
  res = mock<Response>();
  (res.status as jest.Mock).mockReturnThis();
  jest.clearAllMocks();
});

afterEach(() => {
    jest.resetAllMocks();
  });

// REGISTER TEST

test("missing username or password should return 400", async () => {
  req.body = {
    username: "",
    password: "",
  };

  await register(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith({
    message: "Username or password is missing",
  });
});

test("missing request body should return 400", async () => {
  req.body = null;

  await register(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith({ message: "Request body is missing" });
});

test("test register successful", async () => {
  req.body = {
    username: "test",
    password: "test",
  };
  jest.spyOn(User, "findOne").mockResolvedValue(null);

  const hashedPassword = `hashed_${req.body.password}`;
  const uuid = "666";

  (uuidv4 as jest.Mock).mockReturnValue(uuid);
  (bcrypt.hash as jest.Mock).mockImplementation(
    (password: string, salt: string | number) => Promise.resolve(`hashed_${password}`)
    );

  const expectedSignInput = {
    uuid,
    username: req.body.username,
  };
  const expectedUserModel: UserModel = {
    uuid,
    username: req.body.username,
    password: hashedPassword,
    watch_list: [],
    history: [],
  };

  await register(req, res, next);

  expect(jwt.sign as jest.Mock).toHaveBeenCalled();
  expect((jwt.sign as jest.Mock).mock.calls).toHaveLength(1); // counts from index 0
  expect((jwt.sign as jest.Mock).mock.calls[0][0]).toEqual(expectedSignInput);
  expect((jwt.sign as jest.Mock).mock.calls[0][1]).toBe("your-secret-key");
  expect(saveUserInDb as jest.Mock).toHaveBeenCalled();
  expect((saveUserInDb as jest.Mock).mock.calls).toHaveLength(1);
  expect((saveUserInDb as jest.Mock).mock.calls[0][0]).toEqual(
    expectedUserModel
  );
});

// LOGIN TESTS

test("login user not found", async () => {
  req.body = {
    username: "test",
    password: "blub"
  };
  jest.spyOn(User, "findOne").mockResolvedValue(null);

  await login(req, res,next);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.send).toHaveBeenCalledWith({ message: "user not found" });
});

test("login wrong password", async () => {
  req.body = {
    username: "test",
    password: "wrong",
  };
  const user = {
    username: "test",
    password: await bcrypt.hash("correct", 10),
  };

  jest.spyOn(User, "findOne").mockResolvedValue(user as UserModel);
  jest
    .spyOn(bcrypt, "compare")
    .mockImplementation(() => Promise.resolve(false));
  await login(req, res, next);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith({ message: "Password is incorrect" });
  return login(req, res, next);
});

test("login successful", async () => {
  req.body = {
    username: "test",
    password: "test",
  };
  const user = {
    username: "test",
    password: await bcrypt.hash("test", 10),
    uuid: "666",
  };

  jest.spyOn(User, "findOne").mockResolvedValue(user as any);
  jest.spyOn(bcrypt, "compare").mockImplementation(() => Promise.resolve(true));
  jest.spyOn(jwt, "sign").mockImplementation(() => "token");

  await login(req, res, next);

  expect(jwt.sign as jest.Mock).toHaveBeenCalled();
  expect((jwt.sign as jest.Mock).mock.calls).toHaveLength(1);
  expect((jwt.sign as jest.Mock).mock.calls[0][0]).toEqual({
    uuid: user.uuid,
    username: user.username,
  });
  expect((jwt.sign as jest.Mock).mock.calls[0][1]).toBe("RANDOM-TOKEN");
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.send).toHaveBeenCalledWith({
    message: "Login Successful",
    token: "token",
    uuid: "666",
  });
  return login(req, res, next);
});