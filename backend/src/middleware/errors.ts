import express, { Request, Response, NextFunction } from "express";

const port = process.env.PORT || 8082;

export const errorHandler = (err: Error, req: Request, res: Response , next: NextFunction) => {
    console.error(err.stack);
    console.error(err.message);
    res.status(500).send({message: err.message});

  }

