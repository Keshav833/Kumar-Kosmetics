import express from "express";
import {
  getIngredientMappings,
  createIngredientMapping,
  updateIngredientMapping,
  deleteIngredientMapping,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAnalyzerAnalytics,
} from "../controllers/adminSkinAnalyzer.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Ingredients
router.get("/ingredients", protectRoute, adminRoute, getIngredientMappings);
router.post("/ingredients", protectRoute, adminRoute, createIngredientMapping);
router.put("/ingredients/:id", protectRoute, adminRoute, updateIngredientMapping);
router.delete("/ingredients/:id", protectRoute, adminRoute, deleteIngredientMapping);

// Questions
router.get("/questions", protectRoute, adminRoute, getQuestions); // Public access might be needed for frontend to fetch, but this is admin management
router.post("/questions", protectRoute, adminRoute, createQuestion);
router.put("/questions/:id", protectRoute, adminRoute, updateQuestion);
router.delete("/questions/:id", protectRoute, adminRoute, deleteQuestion);

// Analytics
router.get("/analytics", protectRoute, adminRoute, getAnalyzerAnalytics);

export default router;
