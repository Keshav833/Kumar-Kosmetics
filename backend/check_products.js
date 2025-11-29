import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.model.js";

dotenv.config();

const checkProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const count = await Product.countDocuments();
    console.log(`Total products: ${count}`);

    if (count > 0) {
      const products = await Product.find({}).limit(5);
      console.log("Sample products:", JSON.stringify(products, null, 2));
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

checkProducts();
