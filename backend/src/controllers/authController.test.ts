import { Request, Response } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import { saveUserInDb } from './saveUserInDb';
import  UserModel from '../models/userModel';
import { register } from './authController';


jest.mock('jsonwebtoken');
jest.mock('bcryptjs', () => ({
    hash: () => Promise.resolve('42'),
  }));

jest.mock('uuid');
jest.mock('./saveUserInDb');

let req: MockProxy<Request>;
let res: MockProxy<Response>;

beforeEach(() => {
  req = mock<Request>();
  res = mock<Response>();
  (res.status as jest.Mock).mockReturnThis();
});

test('missing username or password should return 400', async () => {
  req.body = {
    username: '',
    password: ''
  };

  await register(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith({ message: "Username or password is missing" });
});

test('missing request body should return 400', async () => {
  req.body = null;

  await register(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.send).toHaveBeenCalledWith({ message: "Request body is missing" });
});

test('test register function', async () => {
  req.body = {
    username: 'test',
    password: 'test'
  };
const hashedPassword = "42";
const uuid = "666";


(uuidv4 as jest.Mock).mockReturnValue(uuid);

const expectedUserModel: UserModel = {
    uuid,
    username: req.body.username,
    password: hashedPassword,
};

await register(req, res);
  await register(req, res);

  expect((jwt.sign as jest.Mock)).toHaveBeenCalled();
  expect((jwt.sign as jest.Mock).mock.calls).toHaveLength(2); //counts from index 0
  expect((jwt.sign as jest.Mock).mock.calls[0][0]).toEqual(expectedUserModel);
  expect((jwt.sign as jest.Mock).mock.calls[0][1]).toBe("RANDOM-TOKEN");
  expect((saveUserInDb as jest.Mock)).toHaveBeenCalled();
  expect((saveUserInDb as jest.Mock).mock.calls).toHaveLength(2);
  expect((saveUserInDb as jest.Mock).mock.calls[0][0]).toEqual(expectedUserModel);
});