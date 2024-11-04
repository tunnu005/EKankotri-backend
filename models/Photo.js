import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
  },
  contentType: {
    type: String,
    required: true,
  },
});

export const Photos = mongoose.model('Photo', PhotoSchema);
