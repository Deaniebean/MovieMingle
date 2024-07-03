import { User } from "../models/mongooseUsers";
import dotenv from 'dotenv';
import request from 'supertest';
import {app} from '../index'; 
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, ObjectId } from "mongodb";
import { Url } from "url";
import { watch } from "fs";
dotenv.config({ path: '../.env' });

//DB CONNECTION

let MONGOD;
let URI: string 

beforeAll(async () => {
  try {
    // Start the MongoDB in-memory server
    MONGOD = await MongoMemoryServer.create();
    console.log('MongoDB in-memory server started');

    URI = MONGOD.getUri();
    console.log(`Connecting to MongoDB at ${URI}`);

  }catch(err){
    console.error(err);
  }
});


afterAll(async () => {
  // Stop the MongoDB in-memory server
//   await mongod.stop();
//    console.log('MongoDB in-memory server stopped');

    // Close the client connection
//    await client.close();
}, 30000);


beforeEach(async () => {
    // Connect to the in-memory MongoDB instance
    const client = new MongoClient(URI);
    await client.connect();
    console.log('Connected to MongoDB');
    console.log("uri" + URI)
}, 30000);


describe('POST /authenticate/register', () => {
  it('should register a new user successfully', async () => {
    const newUser: { uuid: string, username: string, password: string, watch_list: any[] } = {
      uuid: 'some-unique-uuid-v4-string', // Use a UUID generator
      username: 'Test User',
      password: 'password123',
      watch_list: []
    };

    console.log("newUser:" + newUser.username + " " + newUser.password);
 const response = await request(app)
      .post('/register') // Adjust the endpoint as necessary
      .send(newUser);

    expect(response.statusCode).toBe(200);
  });

});
