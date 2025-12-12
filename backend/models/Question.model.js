import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["single-select", "multi-select", "yes-no", "slider"],
      default: "single-select",
    },
    options: [
      {
        label: String,
        value: String,
        image: String, // Optional image for the option
        desc: String, // Optional description
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    category: {
      type: String, // e.g., "Skin Type", "Concerns", "Lifestyle"
      default: "General",
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
