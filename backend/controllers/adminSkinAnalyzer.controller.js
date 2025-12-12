import IngredientMapping from "../models/IngredientMapping.model.js";
import Question from "../models/Question.model.js";
import SkinProfile from "../models/SkinProfile.model.js";
import Product from "../models/product.model.js";

// --- Ingredient Mappings ---

export const getIngredientMappings = async (req, res) => {
  try {
    const mappings = await IngredientMapping.find({}).sort({ ingredient: 1 });
    res.json(mappings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mappings", error: error.message });
  }
};

export const createIngredientMapping = async (req, res) => {
  try {
    const { ingredient, concerns, description } = req.body;
    const mapping = await IngredientMapping.create({ ingredient, concerns, description });
    res.status(201).json(mapping);
  } catch (error) {
    res.status(500).json({ message: "Error creating mapping", error: error.message });
  }
};

export const updateIngredientMapping = async (req, res) => {
  try {
    const { id } = req.params;
    const mapping = await IngredientMapping.findByIdAndUpdate(id, req.body, { new: true });
    res.json(mapping);
  } catch (error) {
    res.status(500).json({ message: "Error updating mapping", error: error.message });
  }
};

export const deleteIngredientMapping = async (req, res) => {
  try {
    const { id } = req.params;
    await IngredientMapping.findByIdAndDelete(id);
    res.json({ message: "Mapping deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mapping", error: error.message });
  }
};

// --- Questions ---

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).sort({ order: 1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndUpdate(id, req.body, { new: true });
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Error updating question", error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question", error: error.message });
  }
};

// --- Analytics ---

export const getAnalyzerAnalytics = async (req, res) => {
  try {
    const totalProfiles = await SkinProfile.countDocuments();
    
    // Most common skin type
    const skinTypeStats = await SkinProfile.aggregate([
      { $group: { _id: "$skinType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Top concerns (unwind array first)
    const concernStats = await SkinProfile.aggregate([
      { $unwind: "$concerns" },
      { $group: { _id: "$concerns", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Most Recommended Products
    const recommendedStats = await SkinProfile.aggregate([
      { $unwind: "$recommendedProducts" },
      { $group: { _id: "$recommendedProducts", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      { $project: { name: "$product.name", count: 1, image: { $arrayElemAt: ["$product.images", 0] } } }
    ]);

    // Recent Submissions
    const recentSubmissions = await SkinProfile.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId", "name email");

    res.json({
      totalProfiles,
      skinTypeStats,
      concernStats,
      recommendedStats,
      recentSubmissions
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
};
