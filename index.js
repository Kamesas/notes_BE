import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations/auth.js"; // prettier-ignore
import { postCreateValidation } from "./validations/post.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, profile } from "./controllers/UserController.js";
import {
  create,
  getAll,
  getDetails,
  remove,
  update,
} from "./controllers/PostController.js";
import handleValidationError from "./utils/handleValidationError.js";

const connectDB = async () => {
  try {
    const url = "mongodb+srv://admin:Password1@cluster0.j9t1y.mongodb.net/notes?retryWrites=true&w=majority"; // prettier-ignore
    await mongoose.connect(url);
    console.log("DB connected!");
  } catch (error) {
    console.log("DB connect failure!", err);
  }
};

connectDB();

const app = express();
app.use(express.json());

app.get("/profile", checkAuth, profile);

app.post("/auth/login", loginValidation, login);

app.post("/auth/register", registerValidation, register);

app.post("/post", checkAuth, postCreateValidation, handleValidationError, create); // prettier-ignore
app.get("/posts", getAll);
app.get("/post/:id", getDetails);
app.delete("/post/:id", checkAuth, remove);
app.patch("/post/:id", checkAuth, update);

const PORT = "8000";
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
