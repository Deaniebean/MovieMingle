import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db: string = process.env.DB_CONNECTION_STRING

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
export default connectDB;

