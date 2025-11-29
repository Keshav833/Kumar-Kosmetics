import mongoose from "mongoose";
import dotenv from "dotenv";

// Load env from the correct path relative to where the script is run (project root)
dotenv.config({ path: "backend/.env" });

const dropIndex = async () => {
  try {
    console.log("Connecting to MongoDB...", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const collection = mongoose.connection.collection("orders");
    
    // List indexes to confirm
    const indexes = await collection.indexes();
    console.log("Current Indexes:", indexes);

    // Drop the problematic index
    if (indexes.find(index => index.name === "stripeSessionId_1")) {
        await collection.dropIndex("stripeSessionId_1");
        console.log("Dropped index: stripeSessionId_1");
    } else {
        console.log("Index stripeSessionId_1 not found");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

dropIndex();
