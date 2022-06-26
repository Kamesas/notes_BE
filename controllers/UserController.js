// import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import userModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json(errors.array());
    // }

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
};

export const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "User not found !",
      });
    }

    const iValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!iValidPass) {
      res.status(404).json({
        massage: "Email or login is incorrect !",
      });
    }

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
    response.status(500).json({
      message: "Invalid data",
      error,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    const { passwordHash, __v, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    res.status(403).json({ message: "Not access !" });
  }
};
