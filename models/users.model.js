import mongoose from "mongoose";
import validator from "validator";
import { userRoles } from "../utlies/userRole.js";

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:[validator.isEmail,"field must be a valid email address"]
  },
  password: {
    type: String,
    // required: true,
  },
  token : {
    type: String
  },
  role :{
    type:String,
    enum:[userRoles.ADMIN,userRoles.USER,userRoles.MANAGER],
    default:userRoles.USER
  },
  avatar:{
    type:String,
    default:"uplaods/profile.jpg"
  }
});

export const User = mongoose.model("User", usersSchema);
