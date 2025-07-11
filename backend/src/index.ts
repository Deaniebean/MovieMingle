import express, { Express, urlencoded } from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./middleware/cors";
import authRoutes from "./routes/authRoutes";
import movieRoutes from "./routes/movieRoutes";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errors";
//import seedDatabase from "./routes/seedingRoute";
import logger from './config/logger';
import path from 'path';
dotenv.config();
const port = process.env.PORT || 8082;

connectDB();
export const app: Express = express();

//need a root for docker container
/*app.get('/', (req, res) => {
  res.send('Hello, world nadine wtf!');
});
*/


app.use(express.json());
app.use(corsMiddleware);
app.use(urlencoded({ extended: true }));
app.use("/authenticate", authRoutes);
app.use("/api", movieRoutes); // Add /api prefix to movie routes
//app.use(seedDatabase);

// Serve static files from React app build (ONLY in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
}

// API 404 handler - must come before catch-all
app.use('/api', (req, res) => {
  res.status(404);
  res.json({ message: "API route not found" });
});

app.use('/authenticate', (req, res) => {
  res.status(404);
  res.json({ message: "Auth route not found" });
});

// Catch all handler: send back React's index.html file for any non-API routes (ONLY in production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

// Default 404 handler for non-production
app.use((req, res) => {
  res.status(404);
  res.json({ message: "Route not found" });
});

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
  });
}
