import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Users'
import express from 'express';


export const register = async (request: express.Request, response: express.Response): Promise<void> => {
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
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        // create a new user instance and collect the data
        const user = new User({
          username: request.body.username,
          password: hashedPassword,
        });

        // save the new user
        const result = await user.save();

        response.status(201).send({
          message: "User Created Successfully",
          result,
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({
          message: "Error creating user",
          error,
        });
    }
};



export const login = async (request: express.Request, response: express.Response): Promise<void> => {

    try {
        const user = await User.findOne({ username: request.body.username });
        if (!user) {
            response.status(404).send({
                message: "Email not found",
            });
            return;
        }

        const passwordCheck = await bcrypt.compare(request.body.password, user.password);
        if (!passwordCheck) {
            response.status(400).send({
                message: "Password is incorrect",
            });
            return;
        }

        const token = jwt.sign({userId: user._id, username: user.username}, "RANDOM-TOKEN", {expiresIn: "24hours"})
        response.status(200).send({
            message: "Login Successful",
            token,
        })
    }catch (error) {
        console.log(error)
        response.status(500).send({
            message: "An error occurred",
            error,
        })
    }

}