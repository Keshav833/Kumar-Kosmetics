import express from "express";
import { requestReturn, getReturnStatus, getAllReturns } from "../controllers/return.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/admin", protectRoute, adminRoute, getAllReturns);
router.post("/:id", protectRoute, requestReturn);
router.get("/:id", protectRoute, getReturnStatus);

export default router;
