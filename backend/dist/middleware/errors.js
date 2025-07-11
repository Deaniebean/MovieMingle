"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res) => {
    console.error(err.stack);
    console.error(err.message);
    if (err.message.includes("Invalid request body")) {
        // Handle validation errors 
        res.status(400).send({ message: err.message, error: err });
    }
    else if (err.message.includes("Request body is missing")) {
        // Handle missing body errors
        res.status(400).send({ message: err.message });
    }
    else {
        // Handle other errors
        res.status(500).send({ message: "An unexpected error occurred", error: err.message });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errors.js.map