import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Title is required").isLength({ min: 3 }).isString(),
  body("text", "Text is required").isLength({ min: 3 }).isString(),
  body("tags", "Tags should be as string").optional().isString(),
  body("imageUrl", "Image should be string").optional().isString(),
];
