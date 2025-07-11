"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_mock_extended_1 = require("jest-mock-extended");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const saveUserInDb_1 = require("./saveUserInDb");
const authController_1 = require("./authController");
const authController_2 = require("./authController");
const mongooseUsers_1 = require("../models/mongooseUsers");
// SETUP
jest.mock("../models/mongooseUsers");
jest.mock("jsonwebtoken");
jest.mock("bcryptjs", () => ({
    hash: jest.fn((password) => Promise.resolve(`hashed_${password}`)),
    compare: jest.fn(() => Promise.resolve(false)),
}));
jest.mock("uuid");
jest.mock("./saveUserInDb");
let req;
let res;
const next = jest.fn();
beforeEach(() => {
    req = (0, jest_mock_extended_1.mock)();
    res = (0, jest_mock_extended_1.mock)();
    res.status.mockReturnThis();
    jest.clearAllMocks();
});
// REGISTER TEST
test("missing username or password should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
    req.body = {
        username: "",
        password: "",
    };
    yield (0, authController_1.register)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
        message: "Username or password is missing",
    });
}));
test("missing request body should return 400", () => __awaiter(void 0, void 0, void 0, function* () {
    req.body = null;
    yield (0, authController_1.register)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: "Request body is missing" });
}));
test("test register successful", () => __awaiter(void 0, void 0, void 0, function* () {
    req.body = {
        username: "test",
        password: "test",
    };
    const hashedPassword = `hashed_${req.body.password}`;
    const uuid = "666";
    uuid_1.v4.mockReturnValue(uuid);
    const expectedUserModel = {
        uuid,
        username: req.body.username,
        password: hashedPassword,
        watch_list: [],
        history: [],
    };
    yield (0, authController_1.register)(req, res, next);
    expect(jsonwebtoken_1.default.sign).toHaveBeenCalled();
    expect(jsonwebtoken_1.default.sign.mock.calls).toHaveLength(2); // counts from index 0
    expect(jsonwebtoken_1.default.sign.mock.calls[0][0]).toEqual(expectedUserModel);
    expect(jsonwebtoken_1.default.sign.mock.calls[0][1]).toBe("RANDOM-TOKEN");
    expect(saveUserInDb_1.saveUserInDb).toHaveBeenCalled();
    expect(saveUserInDb_1.saveUserInDb.mock.calls).toHaveLength(2);
    expect(saveUserInDb_1.saveUserInDb.mock.calls[0][0]).toEqual(expectedUserModel);
}));
// LOGIN TESTS
test("login user not found", () => __awaiter(void 0, void 0, void 0, function* () {
    req.body = {
        username: "test",
    };
    yield (0, authController_2.login)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: "user not found" });
    return (0, authController_2.login)(req, res, next);
}));
test("login wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
    req.body = {
        username: "test",
        password: "wrong",
    };
    const user = {
        username: "test",
        password: yield bcryptjs_1.default.hash("correct", 10),
    };
    jest.spyOn(mongooseUsers_1.User, "findOne").mockResolvedValue(user);
    jest
        .spyOn(bcryptjs_1.default, "compare")
        .mockImplementation(() => Promise.resolve(false));
    yield (0, authController_2.login)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: "Password is incorrect" });
    return (0, authController_2.login)(req, res, next);
}));
test("login successful", () => __awaiter(void 0, void 0, void 0, function* () {
    req.body = {
        username: "test",
        password: "test",
    };
    const user = {
        username: "test",
        password: yield bcryptjs_1.default.hash("test", 10),
        uuid: "666",
    };
    jest.spyOn(mongooseUsers_1.User, "findOne").mockResolvedValue(user);
    jest.spyOn(bcryptjs_1.default, "compare").mockImplementation(() => Promise.resolve(true));
    jest.spyOn(jsonwebtoken_1.default, "sign").mockImplementation(() => "token");
    yield (0, authController_2.login)(req, res, next);
    expect(jsonwebtoken_1.default.sign).toHaveBeenCalled();
    expect(jsonwebtoken_1.default.sign.mock.calls).toHaveLength(1);
    expect(jsonwebtoken_1.default.sign.mock.calls[0][0]).toEqual({
        userId: user.uuid,
        username: user.username,
    });
    expect(jsonwebtoken_1.default.sign.mock.calls[0][1]).toBe("RANDOM-TOKEN");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        message: "Login Successful",
        token: "token",
        user: "666",
    });
    return (0, authController_2.login)(req, res, next);
}));
//# sourceMappingURL=authController.test.js.map