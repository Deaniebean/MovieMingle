import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsMiddleware from "./middleware/cors";
import authRoutes from "./routes/authRoutes";
import connectDB from "./config/db";
dotenv.config();
const port = process.env.PORT  || 8082;

connectDB();
const app: Express = express();
app.use(express.json());
app.use(corsMiddleware);



app.use('/authenticate', authRoutes);
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
