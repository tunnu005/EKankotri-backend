import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { asyncError } from "./error.js";

export const isAuthenticated = asyncError(async (req, res, next) => {

  const { token } = req.cookies;
  
  if (!token) return res.status(400).json({message:'User Not Login',success:false});
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData.user;
  console.log(req.user);
  next();
});

export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin")

    return res.status(401).json({success: false,message: "You are not allowed to access this"});
  
  next();
};

