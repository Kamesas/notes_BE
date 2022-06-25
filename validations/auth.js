import { body } from "express-validator";

export const registerValidation = [
  body("email", "Email not valid").isEmail(),
  body("password", "Password not valid").isLength({ min: 8 }),
  body("userName").isLength({ min: 2 }),
  body("avatar").optional().isURL(),
];
