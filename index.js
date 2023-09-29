import express from "express";

import { coursesRouter } from "./router/courses.router.js";
import  { usersRouter }  from "./router/users.router.js";

import path from "node:path";

import mongoose from "mongoose";

import { ERROR } from "./utlies/httpStatus.js";

import cors from "cors"

// require('dotenv').config();
import dotenv from "dotenv";
dotenv.config();


// import { MongoClient  } from "mongodb";
// 
// const username = encodeURIComponent("waleedJsDev");
// const password = encodeURIComponent("nodejs-2002");
// // let url = `mongodb+srv://${username}:${password}@learn-mongodb.hf6tdho.mongodb.net/`;
// let url = `mongodb+srv://${username}:${password}@learn-mongodb.hf6tdho.mongodb.net/codeZone?retryWrites=true`;
// const client = new MongoClient(url) ;
let url = process.env.MONGODB_URL;
// console.log("porcess",process.env. MONGO_URL)
mongoose.connect(url).then(() => {
  console.log("mongodb server started");
});

// const main = async ()=>{
//      await client.connect();
//      console.log("connected successfully to server");
//      const db = client.db("codeZone");
//      const collection = db.collection("courses");
//      await collection.insertOne({
//       title:"CSS",
//       price:555,
//      });
//      const data= db.collection().find().toArray();
//      console.log(data);
// }
// main();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads",express.static(path.join("uploads")))

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

app.all("*", (req, res, next) => {
  return res.json({
    status: ERROR,
    code: 404,
    messsage: "route source is not a vailable",
  });
});

app.listen(40000, () => {
  console.log("listening on port 4000");
});

// 3281f790-73ed-401c-be41-71c2a741c30a
