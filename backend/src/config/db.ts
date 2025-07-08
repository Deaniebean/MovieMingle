import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './logger';
dotenv.config({ path: '../.env' });

const connectDB = async () => {
 const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@db:27017/moviemingle?authSource=admin`;
  try {
    logger.debug(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD)
   
    await mongoose.connect(url);

    logger.info('connected to database moviemingle ...');
  } catch (error) {
    logger.error(`Failed to connect to the database.`);
    logger.debug(url)
    logger.error(`Error: ${error}`)
  }
}

export default connectDB;