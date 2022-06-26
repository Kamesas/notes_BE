import { body } from "express-validator";

export const loginValidation = [
  body("email", "Email should be correct !").isEmail(),
  body("password", "Password should be not less then 8 symbols!").isLength({
    min: 8,
  }),
];

export const registerValidation = [
  body("email", "Email not valid").isEmail(),
  body("password", "Password not valid").isLength({ min: 8 }),
  body("userName").isLength({ min: 2 }),
  body("avatar").optional().isURL(),
];
