import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
    console.log("MONGO_URI:", process.env.MONGO_URI);

    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;
