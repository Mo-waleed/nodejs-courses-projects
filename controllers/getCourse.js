import { Course } from "../models/courses.model.js";
import { SUCCESS, FAIL, ERROR } from "../utlies/httpStatus.js";


export const getCourse = async (req, res) => {
  // const courseId = +req.params.courseId;
  // let course = courses.find((course) => course.id === courseId);
  // console.log(course);
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ status: FAIL, data: { course: null } });
    }
    return res.json({ status: SUCCESS, data: { course } });
  } catch (err) {
    return res.status(400).json({ status: ERROR, data: null, message: err.message, code: 400 });
  }
};
