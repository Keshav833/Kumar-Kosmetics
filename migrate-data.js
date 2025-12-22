
import mongoose from "mongoose";
import Product from "./backend/models/product.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    let updatedCount = 0;

    for (const p of products) {
      let modified = false;

      // 1. Fix skinType
      // Check if it's array of objects or mixed
      // Mongoose might have cast it to empty if schema doesn't match?
      // But we are using the NEW schema now (String array).
      // If DB has objects, Mongoose might fail to cast and return empty array or cast error?
      // To see RAW data we might need strictly raw query or bypass schema.
      // But let's see what we get.
      
      // Actually, if Schema is [String], and DB has [{type: 'Oily'}], Mongoose might swallow it or return empty.
      // Let's print the first one.
      
      console.log(`Product ${p.name} skinType (before):`, JSON.stringify(p.skinType));

      // If we see empty arrays but expected data, we know the schema cast failed.
      // Then we must update using updateOne with plain object logic or bypass schema validation?
      // Or simply: 
      // The issue is that we need to overwrite it with strings.
      // But we can't READ the old values if Mongoose hides them!
      
      // STRATEGY: Use collection.find() (native driver) to see raw data.
    }
    
    // Native Access
    const rawProducts = await mongoose.connection.db.collection('products').find({}).toArray();
    
    for (const raw of rawProducts) {
        let newSkinType = [];
        let needsUpdate = false;

        if (Array.isArray(raw.skinType)) {
            // Check if elements are objects
            const isObjectArray = raw.skinType.some(item => typeof item === 'object' && item !== null && item.type);
            
            if (isObjectArray) {
                console.log(`Migrating skinType for ${raw.name}`);
                newSkinType = raw.skinType.map(item => item.type || item);
                needsUpdate = true;
            } else {
                // Already strings?
                newSkinType = raw.skinType;
            }
        }
        
        if (needsUpdate) {
            await mongoose.connection.db.collection('products').updateOne(
                { _id: raw._id },
                { $set: { skinType: newSkinType } }
            );
            updatedCount++;
        }
    }

    console.log(`Migration complete. Updated ${updatedCount} products.`);
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
