import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getWishlist);
router.post("/", protectRoute, addToWishlist);
router.delete("/:productId", protectRoute, removeFromWishlist);

export default router;
