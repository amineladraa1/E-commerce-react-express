import express from "express";
import { signUp } from "../controlers/user.js";
import { userSignupValidator } from "../validator/index.js";

const router = express.Router();

router.post("/signup", userSignupValidator, signUp);

export default router;
