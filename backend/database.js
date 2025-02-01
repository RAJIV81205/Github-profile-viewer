import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  await mongoose.connect(process.env.MONOGODB_URL);
};

export default connectDB;
