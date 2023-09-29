import { User } from "../models/users.model.js";
// import {generateJWT}  from "../utlies/generateJWT.js";
import { SUCCESS, FAIL, ERROR } from "../utlies/httpStatus.js";
import {blackListToken} from '../models/blackList.model.js'

import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
// const { bcrypt } = pkg;

export const getAllUsers = async (req, res,next) => {
  const query = req.query;
  const limit = query.limit || 100;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  try {
    const users = await User.find({}, { "__v": false, "password": false }).limit(limit).skip(skip);
  res.json({ status: SUCCESS, data: { users } });
  next();
  } catch(err){
    return res.status(400).json("ERRRRRRRROR")
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, email, password,role } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res
      .status(400)
      .json({ status: FAIL, message: "email already exists", code: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10, function() {
  });
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar:"uploads/"+req.file.filename
  });

  // const token = generateJWT({email:newUser.email,id:newUser._id})
  // console.log("token",token);
  await newUser.save();

  res.status(201).json({ status: SUCCESS, data: { newUser } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res
      .status(400)
      .json({
        status: FAIL,
        message: "Email & password are required",
        code: 400,
      });
  }
  const user = await User.findOne({email:email});
  if (!user) {
    return res.status(404).json({status:FAIL,message:"user not found",code:404})
  }
  const passwordMatched= bcrypt.compare(password,user.password).then(() => {
    // res === true
});

  if (user && passwordMatched) {
  const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SEKRET_KEY, { expiresIn: "60m" });
    return res.status(200).json({status:SUCCESS,data:{token}})
  } else {
    return res.status(500).json({message:"email not exists",code:500,status:ERROR})
  }
};

export const logout = async (req,res)=>{
  const token = req.headers.authorization;

  // Store the token in the blacklist database
  const blacklistedToken = new blackListToken({
    token,
     // Assuming you have a user object in the request
    reason: 'User initiated logout',
  });
  await blacklistedToken.save();

  // Respond with a success message
  res.json({ message: 'Logout successful' });
}

  // // req.currentToken == null;
  // const authHeaders = req.headers['Authorization'] || req.headers['authorization'];
  // if (!authHeaders) {
  //   return res.status(401).json("token is required");
  // }
  // authHeaders = null;
  // // authHeaders.split(' ')[1] == null;
  // // const currentToken = jwt.verify(token,process.env.JWT_SEKRET_KEY);
  // console.log("req.currentToken",authHeaders);
  // // res.redirect('/login');
  // res.status(200).json({ message: 'Logout successful' });