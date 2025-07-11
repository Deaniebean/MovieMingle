"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MovieSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
    },
    original_title: {
        type: String,
        required: true,
    },
    original_language: {
        type: String,
        required: false,
    },
    overview: {
        type: String,
        required: false,
    },
    genre: {
        type: [String],
    },
    release_date: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
        required: false,
    },
    vote_average: {
        type: Number,
        required: false,
    },
    vote_count: {
        type: Number,
        required: false,
    },
    trailer: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rating: {
        type: Number,
        default: null,
    },
});
const Movie = mongoose_1.default.model("Movie", MovieSchema);
exports.default = Movie;
//# sourceMappingURL=mongooseMovies.js.map