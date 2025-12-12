import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// Routes
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import wishlistRoutes from "./routes/wishlist.route.js";
import reviewRoutes from "./routes/review.route.js";
import contactRoutes from "./routes/contact.route.js";
import paymentRoutes from "./routes/payment.route.js";
import orderRoutes from "./routes/order.route.js";
import skinAnalysisRoutes from "./routes/skinAnalysis.route.js";
import adminSkinAnalyzerRoutes from "./routes/adminSkinAnalyzer.route.js";

import Order from "./models/Order.model.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://kumar-kosmetics.vercel.app"
  ],
  credentials: true,
}));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/skin-analysis", skinAnalysisRoutes);
app.use("/api/admin/skin-analyzer", adminSkinAnalyzerRoutes);

// Health Check
app.get("/", (req, res) => {
	res.json({ message: "Server is running", status: "OK" });
});

// Maintenance/Utils
app.get("/api/drop-index", async (req, res) => {
    try {
        const indexName = "stripeSessionId_1";
        const indexes = await Order.collection.indexes();
        
        if (indexes.find(index => index.name === indexName)) {
            await Order.collection.dropIndex(indexName);
            res.json({ message: `Dropped index: ${indexName}` });
        } else {
            res.json({ message: `Index ${indexName} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
