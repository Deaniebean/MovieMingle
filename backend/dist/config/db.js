"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
dotenv_1.default.config({ path: '../.env' });
const connectDB = async () => {
    // Priority order for MongoDB connection:
    // 1. Full MongoDB URI (for cloud deployments like MongoDB Atlas)
    // 2. Custom host (for Docker/production)
    // 3. Default to localhost (for local development)
    let url;
    if (process.env.MONGODB_URI) {
        // Use full MongoDB URI (recommended for production/cloud)
        url = process.env.MONGODB_URI;
    }
    else {
        // Build connection string from parts
        const host = process.env.MONGO_HOST || 'localhost';
        const port = process.env.MONGO_PORT || '27017';
        const username = process.env.MONGO_INITDB_ROOT_USERNAME;
        const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
        const database = process.env.MONGO_DATABASE || 'moviemingle';
        if (username && password) {
            url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
        }
        else {
            url = `mongodb://${host}:${port}/${database}`;
        }
    }
    try {
        logger_1.default.info(`Connecting to MongoDB at: ${url.replace(/\/\/.*@/, '//***:***@')}`); // Log without credentials
        await mongoose_1.default.connect(url);
        logger_1.default.info('connected to database moviemingle ...');
    }
    catch (error) {
        logger_1.default.error(`Failed to connect to the database.`);
        logger_1.default.debug(url);
        logger_1.default.error(`Error: ${error}`);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map