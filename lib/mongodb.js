import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri || uri === 'your_mongodb_connection_string_here') {
  // During build time or when URI is not configured, create a mock promise
  clientPromise = Promise.reject(new Error('MongoDB URI is not configured. Please add MONGODB_URI to your environment variables.'));
} else {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;
