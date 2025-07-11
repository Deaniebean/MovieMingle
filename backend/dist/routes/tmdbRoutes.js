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
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const router = express_1.default.Router();
let movies = [];
router.post("/discover/movies", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { genre, years, rounds, language } = req.body;
    console.log("genre:", genre);
    console.log("years:", years);
    console.log("rounds:", rounds);
    console.log("language:", language);
    movies = yield (0, movieController_1.discoverMovies)(genre, years, rounds, language);
    res.json(movies);
}));
exports.default = router;
//# sourceMappingURL=tmdbRoutes.js.map