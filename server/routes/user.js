import express from "express";
import { userById, fetchProfile, update } from "../controlers/user.js";
import { isAuth, requireSignin } from "../controlers/auth.js";

const router = express.Router();

router.get("/secret/:userId", requireSignin, (req, res) => {
  res.json({ user: req.profile });
});

router.get("/user/:userId", requireSignin, isAuth, fetchProfile);
router.put("/user/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

export default router;
