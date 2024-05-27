import mongoose from "mongoose";
import "dotenv/config"

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL

export function connectToMongoDB () {
    try {
        mongoose.connect(CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}