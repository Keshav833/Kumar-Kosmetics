import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
	updateProfile,
	addAddress,
	deleteAddress,
	addUPI,
	deleteUPI,
	getOrders,
    getProfile,
    changePassword
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", protectRoute, getProfile);
router.put("/update", protectRoute, updateProfile);
router.put("/password", protectRoute, changePassword);
router.post("/address", protectRoute, addAddress);
router.delete("/address/:id", protectRoute, deleteAddress);
router.post("/upi", protectRoute, addUPI);
router.delete("/upi/:id", protectRoute, deleteUPI);
router.get("/orders", protectRoute, getOrders);

export default router;
