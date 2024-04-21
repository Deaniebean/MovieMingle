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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
        const hashedPassword = yield bcrypt_1.default.hash(request.body.password, 10);
        // create a new user instance and collect the data
        const user = new Users_1.default({
            username: request.body.username,
            password: hashedPassword,
        });
        console.log(user);
        // save the new user
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, "RANDOM-TOKEN");
        console.log(token);
        response.status(200).send({
            message: "Sign Up Successful",
            token,
            userId: user._id,
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).send({
            message: "Error creating user",
            error,
        });
    }
});
exports.register = register;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.default.findOne({ username: request.body.username });
        if (!user) {
            response.status(404).send({
                message: "user not found",
            });
            return;
        }
        const passwordCheck = yield bcrypt_1.default.compare(request.body.password, user.password);
        if (!passwordCheck) {
            response.status(400).send({
                message: "Password is incorrect",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, "RANDOM-TOKEN");
        response.status(200).send({
            message: "Login Successful",
            token,
            userId: user._id,
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).send({
            message: "An error occurred",
            error,
        });
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map