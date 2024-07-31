import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

export default connectDB;