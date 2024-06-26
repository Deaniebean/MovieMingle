import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({ path: '../.env' });

const connectDB = async () => {
 const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@db:27017/moviemingle?authSource=admin`;
  try {
    console.log(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD)
   
    await mongoose.connect(url);

    console.log('connected to database moviemingle ...');
  } catch (error) {
    console.error(`Failed to connect to the database.`);
    console.log(url)
    console.error(`Error: ${error}`)
  }
}

export default connectDB;