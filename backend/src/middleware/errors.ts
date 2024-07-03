import { Request, Response } from "express";


export const errorHandler = ( err: Error, req: Request, res: Response ) => {
    console.error(err.stack);
    console.error(err.message);
    if (err.message.includes("Invalid request body")) {
      // Handle validation errors 
      res.status(400).send({ message: err.message, error: err });
    } else if (err.message.includes("Request body is missing")) {
      // Handle missing body errors
      res.status(400).send({ message: err.message });
    } else {
      // Handle other errors
      res.status(500).send({ message: "An unexpected error occurred", error: err.message });
    }
  };

