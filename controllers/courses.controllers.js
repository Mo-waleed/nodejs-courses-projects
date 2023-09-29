// import { courses } from "../data/courses.js";
import { validationResult } from "express-validator";
import { Course } from "../models/courses.model.js";
import { SUCCESS,FAIL,ERROR } from "../utlies/httpStatus.js";
// const Courses = require("../models/courses.model")

export const getAllCourses = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 100;
  const page = query.page || 1;
  const skip = (page-1)*limit;
  // get all courses from db using course model.
  const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip);
  //  console.log(courses);
  res.json({status:SUCCESS,data:{courses}});
};

export const addCourse = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400);
    res.json({status:FAIL,data: error.array()});
  } else {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res
      .status(201)
      .json({ status:SUCCESS,data:{course:newCourse,message:"course added successfully"}})
      // .json(Course);
  }
};



export const editCourse = async (req, res) => {
  // const courseId = req.params.courseId;
  // let course = courses.find((course) => course.id === courseId);
  // let  course = { ...Course, ...req.body };
  // const update = { $set: {...req.body} };
  try {
  const courseId = req.params.courseId;
  const error = validationResult(req);
    // const update = { $set: {...req.body} };
    const updateCourse = await Course.findByIdAndUpdate(courseId, {$set:{...req.body}});
    // if (!updateCourse) {
    //   return res.status(404).json({ status:FAIL});
    // }
    if (!error.isEmpty()) {
      res.status(400);
      res.json({status:FAIL,data: error.array()});
    } else {
    return res.status(200).json({ status:SUCCESS,data:{course:{...req.body},message:"course updating successfully"}})
  }} catch (err) {
    return res.status(400).json({status:ERROR,message: err.message});
  }
};

export const deleteCourse =async (req, res) => {
  const courseId = req.params.courseId;
  // const courseIndex = courses.findIndex((course) => course.id == courseId);
  const deleteCourse =await Course.findByIdAndDelete(courseId)
  if (!deleteCourse) {
    return res.status(404).json({ error: "Item not found." });
  }
  // courses.splice(courseIndex, 1);
  res.json({ status:SUCCESS,data:null });
};

//  module.exports = {
//     getAllCourses,
//     getCourse,
//     addCourse,
//     editCourse,
//     deleteCourse
//  }
