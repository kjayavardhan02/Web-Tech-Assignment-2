import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    psw: {
        type: String,
        required: true
    },
    psw_repeat: {
        type: String,
        required: true
    },
})

export const User = mongoose.model("User", userSchema)