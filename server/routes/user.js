import express from "express";
import { signUp, signIn, signOut } from "../controlers/user.js";
import { userSignupValidator } from "../validator/index.js";

const router = express.Router();

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

export default router;
