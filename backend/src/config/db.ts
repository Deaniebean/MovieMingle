import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './logger';
dotenv.config({ path: '../.env' });

const connectDB = async () => {
  // Priority order for MongoDB connection:
  // 1. Full MongoDB URI (for cloud deployments like MongoDB Atlas)
  // 2. Custom host (for Docker/production)
  // 3. Default to localhost (for local development)
  
  let url: string;
  
  if (process.env.MONGODB_URI) {
    // Use full MongoDB URI (recommended for production/cloud)
    url = process.env.MONGODB_URI;
  } else {
    // Build connection string from parts
    const host = process.env.MONGO_HOST || 'localhost';
    const port = process.env.MONGO_PORT || '27017';
    const username = process.env.MONGO_INITDB_ROOT_USERNAME;
    const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
    const database = process.env.MONGO_DATABASE || 'moviemingle';
    
    if (username && password) {
      url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
    } else {
      url = `mongodb://${host}:${port}/${database}`;
    }
  }
  
  try {
    logger.info(`Connecting to MongoDB at: ${url.replace(/\/\/.*@/, '//***:***@')}`); // Log without credentials
    
    await mongoose.connect(url);

    logger.info('connected to database moviemingle ...');
  } catch (error) {
    logger.error(`Failed to connect to the database.`);
    logger.debug(url)
    logger.error(`Error: ${error}`)
  }
}

export default connectDB;