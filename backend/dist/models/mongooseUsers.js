"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// I added my own unique id to store in the Session, this will be used to to save movies for a specific user
// (the Unique_id from Mongodb would make testing with jest unnecessarily complicated)
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    uuid: {
        type: String,
        required: [true, "Please enter a UUID"],
        unique: [true, "This UUID already exists"],
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: [true, "This username already exists"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        unique: false,
    },
    watch_list: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Movie" }], // Movies in the watch list
});
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
//# sourceMappingURL=mongooseUsers.js.map