import { asyncError } from "../middleware/error.js";
import { Ecard } from "../models/Cards_General.js";
import cloudinary from '../connection/cloudinary.js'; 
import mongoose from "mongoose";
export const getecard = asyncError(async (req, res, next) => {
    const { id } = req.params;

    const data = Ecard.findById(id);
    

    if(!data) {
            return res.status(400).json({message:'Card is not here',success:false})
    }
    return res.status(200).json({success:true,data:data})
});


async function uploadBase64Image(base64Image) {
  // Remove the 'data:image/...;base64,' part if it exists
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

  // Convert the base64 string to a buffer
  const buffer = Buffer.from(base64Data, 'base64');

  // Upload the buffer to Cloudinary using the upload_stream method
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'image' },  // You can specify other options like folder or tags
      (error, result) => {
        if (error) reject(error);  // Handle upload errors
        else resolve(result);      // Resolve with the upload result
      }
    ).end(buffer);  // End the stream with the buffer data
  });

  return result;
}

// Example usage

export const Saveusedata = async(req,res)=>{
   try {
    const {data,modelId} = req.body
    console.log(data,modelId)
    console.log(req.user)
    // console.log(weddingDetails,events,photo,map_url,modelId) 
    const image = await uploadBase64Image(data.photo)
    console.log(image)  // { public_id: 'your_public_id', secure_url: 'https://example.com/image.jpg' }
    const newCard = new Ecard(
       {
       email:req.user.email,
       weddingDetails:data.weddingDetails,
       events:data.events,
       photo:image.secure_url,
       map_url:data.locationUrl,
       modelId:modelId,
       invitees:data.invitees,
       } 
     
    )
    console.log(newCard)
    const savaeddata = await newCard.save()
    return res.status(200).json({link : `http://localhost:5173/${savaeddata._id}`});
   } catch (error) {
    console.log("error",error)
   }
}


export const GetWeddingdata = async(req,res)=>{
   try {
    const {id} = req.params
    console.log(id)
    const objectId = new mongoose.Types.ObjectId(id)
      // logs: '507f191e810c19729de860ea' and ObjectId('507f191e810c19729de860ea')
    const data = await Ecard.findById(objectId)
    console.log(data)
    return res.status(200).json({data:data})
   } catch (error) {
    console.log("error",error)
   }
}