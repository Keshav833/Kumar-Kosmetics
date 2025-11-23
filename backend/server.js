
import express from "express"
import  dotenv  from "dotenv"
//routes
import authRoutes from './routes/auth.route.js'
import { connectDB } from "./lib/db.js"


import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello World !')
})

app.use("/api/auth", authRoutes)

app.listen(port, () => {
  console.log("Server is running on http://localhost:"+ port)

  connectDB();
})
