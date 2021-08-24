import express from "express";
import {
  create,
  categoryById,
  fetchOne,
  fetchAll,
  remove,
  update,
} from "../controlers/category.js";
import { isAdmin, requireSignin, isAuth } from "../controlers/auth.js";
import { userById } from "../controlers/user.js";

const router = express.Router();

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.get("/category/:categoryId", fetchOne);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get("/categories", fetchAll);

router.param("userId", userById);
router.param("categoryId", categoryById);

export default router;
