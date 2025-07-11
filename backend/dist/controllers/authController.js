"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongooseUsers_1 = require("../models/mongooseUsers");
const uuid_1 = require("uuid");
const saveUserInDb_1 = require("./saveUserInDb");
const dotenv_1 = __importDefault(require("dotenv"));
const valibot_1 = require("valibot");
const logger_1 = __importDefault(require("../config/logger"));
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET;
// Valibot Schema for input validation
const UserSchema = (0, valibot_1.object)({
    username: (0, valibot_1.string)(),
    password: (0, valibot_1.string)(),
});
const register = async (request, response, next) => {
    if (!request.body) {
        const error = new Error("Request body is missing");
        return response.status(400).send({ message: "Request body is missing" });
    }
    // Check if username or password is missing or empty
    if (!request.body.username || !request.body.password) {
        return response.status(400).send({ message: "Username or password is missing" });
    }
    let data;
    try {
        data = (0, valibot_1.parse)(UserSchema, request.body);
    }
    catch (error) {
        return next(error);
    }
    try {
        const existingUser = await mongooseUsers_1.User.findOne({ username: data.username });
        if (existingUser) {
            response.status(400).send({ message: "Username already exists" });
            return;
        }
        // hash the password
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const userModel = {
            uuid: await (0, uuid_1.v4)(),
            username: data.username,
            password: hashedPassword,
            watch_list: [],
            history: [],
        };
        await (0, saveUserInDb_1.saveUserInDb)(userModel);
        const userTokenValues = {
            uuid: userModel.uuid,
            username: userModel.username,
        };
        const token = jsonwebtoken_1.default.sign(userTokenValues, secretKey);
        response.status(200).send({
            message: "Sign Up Successful",
            token,
            uuid: userTokenValues.uuid,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new Error("Error creating user"));
    }
};
exports.register = register;
const login = async (request, response, next) => {
    let data;
    try {
        data = (0, valibot_1.parse)(UserSchema, request.body);
    }
    catch (error) {
        console.error(error);
        response.status(400).send({ message: "Invalid request body", error });
        return;
    }
    try {
        const user = await mongooseUsers_1.User.findOne({ username: data.username });
        if (!user) {
            response.status(404).send({
                message: "user not found",
            });
            return;
        }
        const passwordCheck = await bcryptjs_1.default.compare(data.password, user.password);
        if (!passwordCheck) {
            response.status(400).send({
                message: "Password is incorrect",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ uuid: user.uuid, username: user.username }, "RANDOM-TOKEN");
        response.status(200).send({
            message: "Login Successful",
            token,
            uuid: user.uuid,
        });
    }
    catch (error) {
        logger_1.default.error(error);
        next(new Error("Error during login"));
    }
};
exports.login = login;
const resetPassword = async (req, res, next) => {
    try {
        let data;
        try {
            data = (0, valibot_1.parse)(UserSchema, req.body);
        }
        catch (error) {
            res.status(400).send({ message: "Invalid request body", error });
            return;
        }
        const user = await mongooseUsers_1.User.findOne({ username: data.username });
        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        if (!data.password) {
            res.status(400).send({ message: "New password is required" });
            return;
        }
        user.password = await bcryptjs_1.default.hash(data.password, 10);
        await user.save();
        res.status(200).send({ message: "Password reset successful" });
    }
    catch (error) {
        console.error(error);
        next(new Error("An error occurred with password reset"));
    }
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=authController.js.map