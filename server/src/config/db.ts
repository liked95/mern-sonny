import mongoose from "mongoose";

const connectionString =
  process.env.MONGO_URI || "mongodb://localhost:27017/jwt";

async function connectMongoDB(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log(`Mongodb successfully connect on ${connectionString}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectMongoDB;
