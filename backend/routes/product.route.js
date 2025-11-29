import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", protectRoute, adminRoute, updateProduct);

export default router;
