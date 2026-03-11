import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise;

if (!uri) {
  // During build time, create a mock promise that will be replaced at runtime
  if (process.env.NODE_ENV === 'production') {
    console.warn('MONGODB_URI not found during build - this is expected');
  }
  clientPromise = Promise.reject(new Error('MongoDB URI is not configured'));
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
