import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
     
        email:{
            type: String,
            required:[true,"Please enter email"],
            unique: [true,"Email already exists"],
            validate:validator.isEmail,
        },
        password:{
            type: String,
            required:[true,"Please enter password"],
            minLength:[6,"Password must be atleast 6 characters long"],
            
        },
        role: {
            type:String,
            enum: ['user','admin'],
            default: 'user',
        },
        
},
{
    timestamps:true
})



export const User = mongoose.model("User", schema);