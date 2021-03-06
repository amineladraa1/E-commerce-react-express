import express from "express";
import { signUp, signIn, signOut, requireSignin } from "../controlers/auth.js";
import { userSignupValidator } from "../validator/index.js";

const router = express.Router();

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

export default router;
