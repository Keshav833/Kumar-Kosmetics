import express from "express";
import { createCheckoutSession, verifyPayment } from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-order", protectRoute, createCheckoutSession);
router.post("/verify-payment", protectRoute, verifyPayment);

export default router;
