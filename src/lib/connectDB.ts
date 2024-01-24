import Mongoose, { connect } from "mongoose";

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof Mongoose | null;
  };
}

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI || MONGO_URI.length === 0) {
  throw new Error("Please add MONGO_URI to .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("🛢️ Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connect(MONGO_URI!)
      .then((mongoose) => {
        console.log("✨ New connection established");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Connection failed");
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
