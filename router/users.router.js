import express from "express";
import {
  getAllUsers,
  register,
  login,
  logout,
} from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { allowedTo } from "../middlewares/allowedTo.js";
import { userRoles } from "../utlies/userRole.js";
import { isTokenBlacklisted } from "../middlewares/isTokenBlacklisted.js";
import { SUCCESS, FAIL, ERROR } from "../utlies/httpStatus.js";

export const usersRouter = express.Router();

import multer from "multer";
// import { Error } from "mongoose";

const diskStorage = multer.diskStorage({
  destination:function(req, file, cb) {
    // console.log("file",file);
    cb(null, "uploads");
  },
  filename :function(req,file,cb){
    const uniqueFile = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = file.mimetype.split('/')[1];
    cb(null,file.fieldname+'-'+uniqueFile+'.'+ext);
  }
});

// let Error =  res.status(201).json({ status: SUCCESS, message: "you must use a image" });
const fileFilter = function(req,file,cb){
      if(!file.originalname.match(/\.(jpg|jpeg)$/) && !file.originalname.match(/\.png$/)){
         return cb(Error,false);
    } else{
        return cb(null,true)
    }
}

const upload = multer({ storage: diskStorage,fileFilter });

usersRouter
  .route("/")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANAGER),
    isTokenBlacklisted,
    getAllUsers
  );

usersRouter.route("/register").post(upload.single("avatar"), register);

usersRouter.route("/login").post(login);

usersRouter.route("/logout").post(logout);

// console.log('verifyToken',verifyToken);
