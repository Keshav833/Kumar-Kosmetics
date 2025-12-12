import mongoose from "mongoose";

const ingredientMappingSchema = new mongoose.Schema(
  {
    ingredient: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    concerns: [
      {
        type: String,
        required: true,
      },
    ],
    description: String,
  },
  { timestamps: true }
);

const IngredientMapping = mongoose.models.IngredientMapping || mongoose.model("IngredientMapping", ingredientMappingSchema);

export default IngredientMapping;
