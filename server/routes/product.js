import express from "express";
import { isAdmin, requireSignin, isAuth } from "../controlers/auth.js";
import {
  createProduct,
  productById,
  fetchone,
  remove,
  updateProduct,
  fetchAll,
  fetchRelated,
  listCategories,
  listBySearch,
  photo,
} from "../controlers/product.js";
import { userById } from "../controlers/user.js";

const router = express.Router();

router.post(
  "/product/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createProduct
);

router.get("/product/:productId", fetchone);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  updateProduct
);
router.get("/products", fetchAll);
router.get("/products/categorys", listCategories);
router.get("/products/related/:productId", fetchRelated);
router.post("/products/by/search", listBySearch);

router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

export default router;
