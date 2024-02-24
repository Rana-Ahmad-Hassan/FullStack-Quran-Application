import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String, 
        required: true,
        trim: true
    },
    lastName: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String, 
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    answer:{
        type:String,
        required:true
    }
}, { timestamps: true });

export const User = model("User", userSchema); 
