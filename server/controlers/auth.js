import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { errorHandler } from "../helpers/errorHelper.js";
import jwt from "jsonwebtoken"; // to create signin token
import expressJwt from "express-jwt"; // for authorisation check
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 12) : "";

  const user = new User({ ...req.body, password: hashedPassword });
  user.save((error, userSent) => {
    if (error) return res.status(400).json({ error: errorHandler(error) });
    res.status(200).json({ userSent });
  });
};

export const signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, async (err, user) => {
    if (err || !user) return res.status(400).json({ error: "email not found" });
    const isPasssword = await bcrypt.compare(password, user.password);
    if (!isPasssword)
      return res.status(400).json({ error: "password is incorrect !!" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

export const signOut = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signed out successfully" });
};

export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) return res.status(403).json({ error: "Access denied" });
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role === 0)
    return res.status(403).json({ error: "Admin only! Access denied" });
  next();
};
