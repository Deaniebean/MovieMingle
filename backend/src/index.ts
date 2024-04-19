import express, { Express } from "express";
import dotenv from "dotenv";
import corsMiddleware from "./middleware/cors";
import authRoutes from "./routes/authRoutes";
import tmdbRoutes from "./routes/tmdbRoutes";
import connectDB from "./config/db";
dotenv.config();
const port = process.env.PORT  || 8082;

connectDB();
const app: Express = express();
app.use(express.json());
app.use(corsMiddleware);
app.use('/authenticate', authRoutes);
app.use(tmdbRoutes);

app.use((req, res) => {
  res.status(404)
  res.json({ message: 'Route not found' })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
