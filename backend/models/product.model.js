import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: 0,
    },
    images: [
      {
        type: String,
        required: [true, "At least one product image is required"],
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    // Skin Recommendation Fields
    skinType: [
      {
        type: String,
        enum: ["Oily", "Dry", "Combination", "Sensitive", "Normal"],
      },
    ],
    skinConcerns: [
      {
        type: String,
        enum: [
          "Acne",
          "Dullness",
          "Pigmentation",
          "Anti-aging",
          "Redness",
          "Dark spots",
          "Uneven skin tone",
        ],
      },
    ],
    ingredients: {
      type: [String], // Array of strings
      default: [],
    },
    allergyLabels: [
      {
        type: String,
        enum: [
          "Paraben-free",
          "Sulfate-free",
          "Alcohol-free",
          "Fragrance-free",
          "Silicone-free",
          "Non-comedogenic",
        ],
      },
    ],
    // Variants / Shades
    variants: [
      {
        name: { type: String, required: true },
        image: { type: String }, // Optional image for the variant
        stock: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
