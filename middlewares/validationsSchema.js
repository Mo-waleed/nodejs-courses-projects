import { body } from "express-validator";
export const validationsSchema = () => {
  return [
    body("title")
      .notEmpty()
      .escape()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title at least 3 digits"),
    body("price").notEmpty().escape().withMessage("price is required"),
  ];
};
