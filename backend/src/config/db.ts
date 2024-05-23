import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectDB = async () => {
  try {
    const url = "mongodb://localhost:27017/moviemingle";
    await mongoose.connect(url);
    console.log('connected to database moviemingle ...');
  } catch (error) {
    console.error(`Failed to connect to the database. Error: ${error}`);
  }
}

export default connectDB;