import express from "express";
import { createCheckoutSession, verifyPayment, getRazorpayKey } from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-order", protectRoute, createCheckoutSession);
router.post("/verify-payment", protectRoute, verifyPayment);
router.get("/get-key", protectRoute, getRazorpayKey);

export default router;
