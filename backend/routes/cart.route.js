import express from "express";
import { getCart, addToCart, removeFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getCart);
router.post("/", protectRoute, addToCart);
router.delete("/:itemId", protectRoute, removeFromCart);
router.put("/:itemId", protectRoute, updateQuantity);

export default router;
