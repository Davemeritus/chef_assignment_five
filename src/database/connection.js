// Import necessary modules
import mongoose from "mongoose";
import dotenv from "dotenv";

// load .env file
dotenv.config();

// Create and export an asynchronous function to connect to MongoDB
export const connect = async () => {
  // Retrieve the MongoDB URI from environment variables
  const uri = process.env.MONGODB_URI;

  // Define connection options to enable strict server API interaction
  const clientOptions = {
    serverApi: {
      version: "1", // Use version 1 of MongoDB's server API
      strict: true, // Enable strict mode to ensure deprecated operations are not used
      deprecationErrors: true // Enable errors for any deprecated API usage
    }
  };

  // Connect to MongoDB using the specified URI and options
  return await mongoose.connect(uri, clientOptions);
};
