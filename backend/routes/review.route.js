import express from "express";
import { createReview, getProductReviews } from "../controllers/review.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:productId", protectRoute, createReview);
router.get("/:productId", getProductReviews);

export default router;
