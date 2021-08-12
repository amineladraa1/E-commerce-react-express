// import { Mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { errorHandler } from "../helpers/errorHelper.js";

export const signUp = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 12) : "";

  const user = new User({ ...req.body, password: hashedPassword });
  user.save((error, userSent) => {
    if (error) return res.status(400).json({ error: errorHandler(error) });
    res.status(200).json({ userSent });
  });
};
