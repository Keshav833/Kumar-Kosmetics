import express from "express"
import { login, logout, signup, getProfile, googleLogin, forgotPassword, verifyOtp, resetPassword } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/google", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.get("/profile", protectRoute, getProfile)

export default router;