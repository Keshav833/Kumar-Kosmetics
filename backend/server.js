
import express from "express"
import  dotenv  from "dotenv"
//routes
import authRoutes from './routes/auth.route.js'
import { connectDB } from "./lib/db.js"


dotenv.config()


const app = express()
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World !')
})

app.use("/api/auth", authRoutes)

app.listen(port, () => {
  console.log("Server is running on http://localhost:"+ port)

  connectDB();
})
