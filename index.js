import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { registerValidation } from "./validations/auth.js";
import bcrypt from "bcrypt";

import userModel from "./models/User.js";

mongoose
  .connect(
    "mongodb+srv://admin:Password1@cluster0.j9t1y.mongodb.net/notes?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log("DB connect failure!", err);
  });

const app = express();
app.use(express.json());

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const doc = userModel({
      email: req.body?.email,
      userName: req.body?.userName,
      avatar: req.body?.avatar,
      passwordHash,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secretUserId",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash: pass, __v, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    res.status(500).json({
      message: "Error registration !",
      error: error,
    });
  }
});

const PORT = "8000";
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
