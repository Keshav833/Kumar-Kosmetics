import mongoose from "mongoose";

const skinProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    skinType: {
      type: String,
      enum: ["Oily", "Dry", "Combination", "Sensitive", "Normal", "Not sure"],
      required: true,
    },
    concerns: [
      {
        type: String,
      },
    ],
    allergies: [
      {
        type: String,
      },
    ],
    lifestyle: {
      sleep: String,
      outdoors: Boolean,
      sunscreen: Boolean,
      stress: String,
    },
    currentRoutine: [String],
    history: {
      reactions: Boolean,
      medications: String,
    },
    goal: String,
    recommendedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const SkinProfile = mongoose.models.SkinProfile || mongoose.model("SkinProfile", skinProfileSchema);

export default SkinProfile;
