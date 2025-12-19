import express from "express";
import { createOrder, getUserOrders, getAllOrders, updateOrderStatus, getOrderById } from "../controllers/order.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, getUserOrders);
router.get("/admin", protectRoute, adminRoute, getAllOrders);
router.get("/:id", protectRoute, getOrderById);
router.put("/:orderId/status", protectRoute, adminRoute, updateOrderStatus);

export default router;
