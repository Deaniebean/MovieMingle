import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({ path: '../.env' });

const connectDB = async () => {
  try {
    const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@db:27017/moviemingle?authSource=admin`;
    await mongoose.connect(url);
    console.log('connected to database moviemingle ...');
  } catch (error) {
    console.error(`Failed to connect to the database. Error: ${error}`);
  }
}

export default connectDB;