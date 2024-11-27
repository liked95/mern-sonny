import mongoose from "mongoose";



async function connectMongoDB(): Promise<void> {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/jwt"
    console.log("🚀 ~ connectMongoDB ~ uri:", uri)
    console.log("🚀 ~ connectMongoDB ~ ENV:", process.env.NODE_ENV)
    console.log("🚀 ~ connectMongoDB ~ CLIENT_BUILD_PATH:", process.env.CLIENT_BUILD_PATH)
    if (!uri) {
      console.error("MongoDB URI does not exist!")
      process.exit(1)
    }

    await mongoose.connect(uri);
    console.log(`Mongodb successfully connect on ${process.env.NODE_ENV}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectMongoDB;
