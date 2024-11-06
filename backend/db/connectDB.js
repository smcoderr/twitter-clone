import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log(`Error in connecting DB: ${error.message}`)
        process.exit(1);
    }
}