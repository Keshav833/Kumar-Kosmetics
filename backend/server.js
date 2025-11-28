
import express from "express"
import  dotenv  from "dotenv"
//routes
import authRoutes from './routes/auth.route.js'
import profileRoutes from './routes/profile.route.js'
import productRoutes from './routes/product.route.js'
import cartRoutes from './routes/cart.route.js'
import wishlistRoutes from './routes/wishlist.route.js'
import { connectDB } from "./lib/db.js"


import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World !')
})

app.use("/api/auth", authRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wishlist", wishlistRoutes)

app.listen(port, () => {
  console.log("Server is running on http://localhost:"+ port)

  connectDB();
})
