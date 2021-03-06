import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations/auth.js"; // prettier-ignore
import { postCreateValidation } from "./validations/post.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, profile } from "./controllers/UserController.js";
import {create, getAll, getDetails, remove, update, getLastTags} from "./controllers/PostController.js"; // prettier-ignore
import handleValidationError from "./utils/handleValidationError.js";
import multer from "multer";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const url = process.env?.MONGO_DB_URI; // prettier-ignore
    await mongoose.connect(url);
    console.log("DB connected!", process.env.NODE_ENV);
  } catch (error) {
    console.log("DB connect failure!", error);
  }
};

connectDB();

// mongoose
//   .connect(process.env.MONGO_DB_URI)
//   .then(() => console.log("DB ok"))
//   .catch((err) => console.log("DB error", err));

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  // require('dotenv').config();
  app.use(cors());
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    // if (!fs.existsSync("uploads")) {
    //   fs.mkdirSync("uploads");
    // }
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req?.file?.originalname}`,
  });
});

app.get("/profile", checkAuth, profile);

app.post("/auth/login", loginValidation, handleValidationError, login);

app.post("/auth/register", registerValidation, handleValidationError, register);

app.get("/posts/tags", getLastTags);
app.post("/post", checkAuth, postCreateValidation, handleValidationError, create); // prettier-ignore
app.get("/posts", getAll);
app.get("/post/:id", getDetails);
app.delete("/post/:id", checkAuth, remove);
app.patch(
  "/post/:id",
  checkAuth,
  postCreateValidation,
  handleValidationError,
  update
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server listening");
});
