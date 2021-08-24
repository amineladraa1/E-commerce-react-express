import User from "../models/user.js";
import Mongoose from "mongoose";

export const userById = async (req, res, next, id) => {
  try {
    if (!Mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No user whith that id");

    const user = await User.findById(id);
    req.profile = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
export const fetchProfile = (req, res) => {
  req.profile.password = undefined;
  return res.send(req.profile);
};
export const update = async (req, res) => {
  try {
    const data = await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true }
    );
    data.password = undefined;
    res.send(data);
  } catch (error) {
    res.status(401).json({
      error: "you don't have the credentials to perform this actions !!!",
    });
  }
};
