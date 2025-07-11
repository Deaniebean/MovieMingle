"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserInDb = void 0;
const mongooseUsers_1 = require("../models/mongooseUsers");
const logger_1 = __importDefault(require("../config/logger"));
const saveUserInDb = async (userModel) => {
    logger_1.default.debug("saveUserInMongo");
    const user = new mongooseUsers_1.User({
        username: userModel.username,
        password: userModel.password,
        uuid: userModel.uuid,
        watch_list: [],
        history: []
    });
    // save the new user
    await user.save();
};
exports.saveUserInDb = saveUserInDb;
//# sourceMappingURL=saveUserInDb.js.map