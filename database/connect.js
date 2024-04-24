import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect("mongodb+srv://jayavardhan:root@cluster0.nk0ndr4.mongodb.net/", {
        dbName: "e-commerce"
    })
    .then(() => {
        console.log("Database Connected")
    })
    .catch((error) => {
        console.log(error)
    })
}