import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authenticateRoutes  from "./routes/authRoutes";
import bodyParser from 'body-parser';


const app: Express = express();
dotenv.config();
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT  || 8082;


app.use('/authenticate', authenticateRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

