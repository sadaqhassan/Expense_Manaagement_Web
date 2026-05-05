import mongoose from "mongoose";

export const dbConfig = () => {
    const url = process.env.MONGO_URL;
    mongoose.connect(url).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    }); 
};