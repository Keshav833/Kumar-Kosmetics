import Review from "../models/review.model.js";
import Product from "../models/product.model.js";

export const createReview = async (req, res) => {
  try {
    const { rating, comment, skinType } = req.body;
    const productId = req.params.productId;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating: Number(rating),
      comment,
      skinType,
    });

    // Update Product stats
    const reviews = await Review.find({ product: productId });
    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / totalReviews;

    product.rating = averageRating;
    product.reviews = totalReviews; // Assuming 'reviews' field in Product model stores count
    await product.save();

    await review.populate("user", "name");
    res.status(201).json(review);
  } catch (error) {
    console.error("Error in createReview:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("Error in getProductReviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};
