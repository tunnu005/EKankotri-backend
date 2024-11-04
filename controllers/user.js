import { User } from "../models/User.js";
import { asyncError } from "../middleware/error.js";
import errorHanlder from "../utils/errorHandler.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { Templates } from "../models/templets.js";
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
// import { asyncError } from '../middleware/error.js';
import multer from "multer";
import dotenv from "dotenv"
import { Photos } from "../models/Photo.js";
import cloudinary from '../connection/cloudinary.js';


dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage }).single("image");

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({ message: "User Already Exist" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashpassword,
    })

    await newUser.save();

    return res.status(201).json({ message: "registration successfull", success: true });

  } catch (error) {
    return res.status(500).json({ error: error });
  }


};

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("info  : ", email, password);

  let user = await User.findOne({ email: email });
  console.log('user : ',user)
  
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid username or password" })
  }

  const token = jwt.sign({user:user},process.env.JWT_SECRET,{ expiresIn: 10 * 24 * 3600 });
  console.log('check : ',process.env.NODE_ENV === 'production');
  res.cookie(
    "token",token,
    { 
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      sameSite : 'none',
      secure: true,
    },
    
  )

  return res.status(200).json({ message: "Login successfull", success: true,token: token });
});

export const SaveTemplates = async (req, res) => {
  // console.log("its here");
  // let newTemplates = new Templates({
  //   title: req.body.title,
  //   Photo: {
  //     Data: req.file.buffer,
  //     contentType: req.file.mimetype,
  //   },
  // });
  // const resp = await newTemplates.save();

  // return res.status(200).json({ message: "saved", success: true });

  try {
    const { title,type } = req.body;
    const file = req.file;

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image' }, 
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file.buffer);
    });

    const newTemplates = new Templates({
      title,
      Photo:result.secure_url,
      type
    });

    await newTemplates.save();

    return res.status(201).json({ message: "saved", success: true });


  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const logOut = asyncError(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Sets cookie expiration to a past date
    sameSite: 'none', // Required for cross-site cookies
    secure: process.env.NODE_ENV === 'production', // Secure only in production
  });
  
  // Optionally, you can send a response indicating successful logout
  res.status(200).json({ message: "Successfully signed out" });
});

export const loadtemplates = asyncError(async (req, res, next) => {
  const { page, pageSize} = req.params;
  const skip = (page - 1) * pageSize;

  const data = await Templates.find().skip(skip).limit(parseInt(pageSize));

  
  console.log(data)

  return res.status(200).json({ data: data });
});

export const forget = async (req, res) => {
  const email = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    console.log("User not exist for forgot password");
    return false;
  } else {
    //send gmail to the user
  }
};


export const uploadImage = asyncError(async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file', success: false });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded', success: false });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(201).json({
      message: 'Image uploaded successfully',
      success: true,
      data: {
        imageUrl,
      },
    });
  });
});
