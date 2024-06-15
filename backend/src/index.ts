import express, { Express, urlencoded } from "express";
import dotenv from "dotenv";
import corsMiddleware from "./middleware/cors";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errors";
import { url } from "inspector";
dotenv.config();
const port = process.env.PORT || 8082;

connectDB();
const app: Express = express();

//need a root for docker container
app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.use(express.json());
app.use(corsMiddleware);
app.use(urlencoded({ extended: true }));
app.use("/authenticate", authRoutes);
app.use(movieRoutes);

app.use((req, res) => {
  res.status(404);
  res.json({ message: "Route not found" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
