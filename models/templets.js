import mongoose from "mongoose";

const schema = new mongoose.Schema({
        title:{
            type:String
        },
        Photo:{
            type:String,
        },
        type:{
            type:String,
        }
      
},
{
    timestamps:true
})



export const Templates = mongoose.model("Templates", schema);