"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_mock_extended_1 = require("jest-mock-extended");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const saveUserInDb_1 = require("../controllers/saveUserInDb");
const authController_1 = require("../controllers/authController");
const authController_2 = require("../controllers/authController");
const mongooseUsers_1 = require("../models/mongooseUsers");
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");
jest.mock("uuid");
jest.mock("../controllers/saveUserInDb");
let req;
let res;
const next = jest.fn();
beforeEach(() => {
    req = (0, jest_mock_extended_1.mock)();
    res = (0, jest_mock_extended_1.mock)();
    res.status.mockReturnThis();
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
    await (0, authController_1.register)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
        message: "Username or password is missing",
    });
});
test("missing request body should return 400", async () => {
    req.body = null;
    await (0, authController_1.register)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: "Request body is missing" });
});
test("test register successful", async () => {
    req.body = {
        username: "test",
        password: "test",
    };
    jest.spyOn(mongooseUsers_1.User, "findOne").mockResolvedValue(null);
    const hashedPassword = `hashed_${req.body.password}`;
    const uuid = "666";
    uuid_1.v4.mockReturnValue(uuid);
    bcryptjs_1.default.hash.mockImplementation((password, salt) => Promise.resolve(`hashed_${password}`));
    const expectedSignInput = {
        uuid,
        username: req.body.username,
    };
    const expectedUserModel = {
        uuid,
        username: req.body.username,
        password: hashedPassword,
        watch_list: [],
        history: [],
    };
    await (0, authController_1.register)(req, res, next);
    expect(jsonwebtoken_1.default.sign).toHaveBeenCalled();
    expect(jsonwebtoken_1.default.sign.mock.calls).toHaveLength(1); // counts from index 0
    expect(jsonwebtoken_1.default.sign.mock.calls[0][0]).toEqual(expectedSignInput);
    expect(jsonwebtoken_1.default.sign.mock.calls[0][1]).toBe("your-secret-key");
    expect(saveUserInDb_1.saveUserInDb).toHaveBeenCalled();
    expect(saveUserInDb_1.saveUserInDb.mock.calls).toHaveLength(1);
    expect(saveUserInDb_1.saveUserInDb.mock.calls[0][0]).toEqual(expectedUserModel);
});
// LOGIN TESTS
test("login user not found", async () => {
    req.body = {
        username: "test",
        password: "blub"
    };
    jest.spyOn(mongooseUsers_1.User, "findOne").mockResolvedValue(null);
    await (0, authController_2.login)(req, res, next);
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
        password: await bcryptjs_1.default.hash("correct", 10),
    };
    jest.spyOn(mongooseUsers_1.User, "findOne").mockResolvedValue(user);
    jest
        .spyOn(bcryptjs_1.default, "compare")
        .mockImplementation(() => Promise.resolve(false));
    await (0, authController_2.login)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: "Password is incorrect" });
    return (0, authController_2.login)(req, res, next);
});
test("login successful", async () => {
    req.body = {
        username: "test",
        password: "test",
    };
    const user = {
        username: "test",
        password: await bcryptjs_1.default.hash("test", 10),
        uuid: "666",
    };
    jest.spyOn(mongooseUsers_1.User, "findOne").mockResolvedValue(user);
    jest.spyOn(bcryptjs_1.default, "compare").mockImplementation(() => Promise.resolve(true));
    jest.spyOn(jsonwebtoken_1.default, "sign").mockImplementation(() => "token");
    await (0, authController_2.login)(req, res, next);
    expect(jsonwebtoken_1.default.sign).toHaveBeenCalled();
    expect(jsonwebtoken_1.default.sign.mock.calls).toHaveLength(1);
    expect(jsonwebtoken_1.default.sign.mock.calls[0][0]).toEqual({
        uuid: user.uuid,
        username: user.username,
    });
    expect(jsonwebtoken_1.default.sign.mock.calls[0][1]).toBe("RANDOM-TOKEN");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        message: "Login Successful",
        token: "token",
        uuid: "666",
    });
    return (0, authController_2.login)(req, res, next);
});
//# sourceMappingURL=authController.test.js.map