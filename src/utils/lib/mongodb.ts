import mongoose from 'mongoose';

// Define the type for cached mongoose connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare the global mongoose property
declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || '';

if (MONGODB_URI === '') {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Cached connection for MongoDB.
 */
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log('MongoDB connected successfully!');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;

