import express from "express";
import { evaluateProfile, saveProfile, getProfile } from "../controllers/skinAnalysis.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/evaluate", evaluateProfile);
router.post("/profile", protectRoute, saveProfile);
router.get("/profile", protectRoute, getProfile);

export default router;
