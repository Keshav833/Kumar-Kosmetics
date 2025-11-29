import express from "express";
import { createMessage, getMessages, deleteMessage } from "../controllers/contact.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/admin/contact-messages", protectRoute, adminRoute, getMessages);
router.delete("/admin/contact-messages/:id", protectRoute, adminRoute, deleteMessage);

export default router;
