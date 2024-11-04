import mongoose from "mongoose";

const schema = new mongoose.Schema({
 email:{
  type:String,
 },
 weddingDetails: {
  brideName: {
    type: String,
    // required: true,
  },
  groomName: {
    type: String,
  },
  location: {
    type: String,
    // required: true,
  },
  weddingDate: {
    type: Date,
    // required: true,
  },
  story: {
    type: String,
    // required: true,
  }
 
 },
  events: [{
    name: { type: String, },
    date: { type: Date,  },
    description: { type: String,  },
  }],
  invitedBy: {
    type: [String],
    default: [],
  },
  photo: {
    type: String,
    // default: [],
  },
  map_url: {
    type: String,
    // required: true,
  },
  modelId: { type: String, required: true},
  story:{
    type:String,
  },
  imagearray:{
    type: [String],
    
  }
}, {
  timestamps: true
});

export const Ecard = mongoose.model("Ecard", schema);
