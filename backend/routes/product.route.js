import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, bulkCreateProducts, deleteDuplicateProducts, deleteProduct } from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, createProduct);
router.post("/bulk", protectRoute, adminRoute, bulkCreateProducts);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", protectRoute, adminRoute, updateProduct);

router.post("/cleanup-duplicates", protectRoute, adminRoute, deleteDuplicateProducts);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
