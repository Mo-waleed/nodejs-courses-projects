import {
  getAllCourses,
  addCourse,
  editCourse,
  deleteCourse,
} from "../controllers/courses.controllers.js";
import { getCourse } from "../controllers/getCourse.js";
// import { body } from "express-validator";
import express from "express";
import {validationsSchema} from '../middlewares/validationsSchema.js';
import {allowedTo} from '../middlewares/allowedTo.js'
export const coursesRouter = express.Router();
import { verifyToken } from "../middlewares/verifyToken.js";
import { userRoles } from "../utlies/userRole.js";
import {isTokenBlacklisted} from '../middlewares/isTokenBlacklisted.js'

coursesRouter
  .route("/")
  .get(
    verifyToken,
    isTokenBlacklisted,
    getAllCourses)
  // When i make post i shoud take care from the <Headers> && (Middleware=>app.use(express.json());)
  .post(
    verifyToken,
    allowedTo(userRoles.MANAGER),
    validationsSchema(),
    addCourse
  );

  coursesRouter
  .route("/:courseId")
  .get(getCourse)
  .patch(
    verifyToken,
    validationsSchema(),
    editCourse
  )
  .delete(deleteCourse);
