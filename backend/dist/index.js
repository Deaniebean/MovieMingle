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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = require("./middleware/cors");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const db_1 = __importDefault(require("./config/db"));
const errors_1 = require("./middleware/errors");
//import seedDatabase from "./routes/seedingRoute";
const logger_1 = __importDefault(require("./config/logger"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const port = process.env.PORT || 8082;
(0, db_1.default)();
exports.app = (0, express_1.default)();
//need a root for docker container
/*app.get('/', (req, res) => {
  res.send('Hello, world nadine wtf!');
});
*/
exports.app.use(express_1.default.json());
exports.app.use(cors_1.corsMiddleware);
exports.app.use((0, express_1.urlencoded)({ extended: true }));
exports.app.use("/authenticate", authRoutes_1.default);
exports.app.use("/api", movieRoutes_1.default); // Add /api prefix to movie routes
//app.use(seedDatabase);
// Serve static files from React app build (ONLY in production)
if (process.env.NODE_ENV === 'production') {
    exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
}
// API 404 handler - must come before catch-all
exports.app.use('/api', (req, res) => {
    res.status(404);
    res.json({ message: "API route not found" });
});
exports.app.use('/authenticate', (req, res) => {
    res.status(404);
    res.json({ message: "Auth route not found" });
});
// Catch all handler: send back React's index.html file for any non-API routes (ONLY in production)
if (process.env.NODE_ENV === 'production') {
    exports.app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/index.html'));
    });
}
// Default 404 handler for non-production
exports.app.use((req, res) => {
    res.status(404);
    res.json({ message: "Route not found" });
});
exports.app.use(errors_1.errorHandler);
if (process.env.NODE_ENV !== "test") {
    exports.app.listen(port, () => {
        logger_1.default.info(`[server]: Server is running at http://localhost:${port}`);
    });
}
//# sourceMappingURL=index.js.map