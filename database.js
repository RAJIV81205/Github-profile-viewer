import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://kenma:3g4bfi348fbs@nodejs.1yost.mongodb.net/HelloWorld"
    );
}

export default connectDB;
