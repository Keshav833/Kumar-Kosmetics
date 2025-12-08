import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      images, // Expecting array of base64 strings or URLs if already uploaded
      status,
      featured,
      skinType,
      skinConcerns,
      ingredients,
      allergyLabels,
      variants,
    } = req.body;

    // Basic validation
    if (!name || !description || !category || !price || !stock) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    let imageUrls = [];

    // Handle Image Uploads to Cloudinary
    if (images && images.length > 0) {
      for (const image of images) {
        // Check if it's a base64 string (new upload)
        if (image.startsWith("data:image")) {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "products",
          });
          imageUrls.push(uploadResponse.secure_url);
        } else {
          // Assume it's already a URL (rare case in creation, but good for flexibility)
          imageUrls.push(image);
        }
      }
    }

    // Handle Variant Images if any
    let processedVariants = [];
    if (variants && variants.length > 0) {
      for (const variant of variants) {
        let variantImageUrl = variant.image;
        if (variant.image && variant.image.startsWith("data:image")) {
          const uploadResponse = await cloudinary.uploader.upload(variant.image, {
            folder: "products/variants",
          });
          variantImageUrl = uploadResponse.secure_url;
        }
        processedVariants.push({ ...variant, image: variantImageUrl });
      }
    }

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      images: imageUrls,
      status,
      featured,
      skinType,
      skinConcerns,
      ingredients,
      allergyLabels,
      variants: processedVariants,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error in createProduct controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.error("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Increment view count
    product.views = (product.views || 0) + 1;
    await product.save();

    res.json(product);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Product not found (Invalid ID)" });
    }
    console.error("Error in getProductById controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      images,
      status,
      featured,
      skinType,
      skinConcerns,
      ingredients,
      allergyLabels,
      variants,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrls = product.images || [];
    if (images && images.length > 0) {
      // If new images are provided, we might want to replace or append. 
      // For simplicity and matching AddProduct logic, if images array is sent, we assume it's the new state.
      // We need to upload new base64 images.
      const newImageUrls = [];
      for (const image of images) {
        if (image.startsWith("data:image")) {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "products",
          });
          newImageUrls.push(uploadResponse.secure_url);
        } else {
          newImageUrls.push(image);
        }
      }
      imageUrls = newImageUrls;
    }

    // Handle Variants
    let processedVariants = product.variants || [];
    if (variants) {
        const newVariants = [];
        for (const variant of variants) {
            let variantImageUrl = variant.image;
            if (variant.image && variant.image.startsWith("data:image")) {
                const uploadResponse = await cloudinary.uploader.upload(variant.image, {
                    folder: "products/variants",
                });
                variantImageUrl = uploadResponse.secure_url;
            }
            newVariants.push({ ...variant, image: variantImageUrl });
        }
        processedVariants = newVariants;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
    product.stock = stock || product.stock;
    product.images = imageUrls;
    product.status = status || product.status;
    product.featured = featured !== undefined ? featured : product.featured;
    product.skinType = skinType || product.skinType;
    product.skinConcerns = skinConcerns || product.skinConcerns;
    product.ingredients = ingredients || product.ingredients;
    product.allergyLabels = allergyLabels || product.allergyLabels;
    product.variants = processedVariants;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error in updateProduct controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const bulkCreateProducts = async (req, res) => {
  try {
    const { products } = req.body; // Expecting { products: [...] }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided or invalid format" });
    }

    let added = 0;
    let failed = 0;
    const errors = [];

    for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        try {
            // Minimal Validation for required fields
            if (!productData.name || !productData.category || !productData.price || !productData.stock) {
                throw new Error("Missing required fields (name, category, price, stock)");
            }

            // Check if product with same name already exists
            const existingProduct = await Product.findOne({ name: productData.name });
            if (existingProduct) {
                throw new Error(`Product with name "${productData.name}" already exists`);
            }

            const newProduct = new Product({
                ...productData,
                images: Array.isArray(productData.images) ? productData.images : [],
                skinType: Array.isArray(productData.skinType) ? productData.skinType : [],
                skinConcerns: Array.isArray(productData.skinConcerns) ? productData.skinConcerns : [],
                allergyLabels: Array.isArray(productData.allergyLabels) ? productData.allergyLabels : [],
                ingredients: Array.isArray(productData.ingredients) ? productData.ingredients : [],
                variants: Array.isArray(productData.variants) ? productData.variants : [],
            });

            await newProduct.save();
            added++;

        } catch (err) {
            failed++;
            errors.push({ row: i + 1, name: productData.name || "Unknown", message: err.message });
        }
    }

    res.status(201).json({
        message: "Bulk upload processed",
        summary: {
            total: products.length,
            added,
            failed,
        },
        errors,
    });

  } catch (error) {
    console.error("Error in bulkCreateProducts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const deleteDuplicateProducts = async (req, res) => {
  try {
    // Find all products with duplicate names
    const duplicates = await Product.aggregate([
      {
        $group: {
          _id: "$name",
          uniqueIds: { $addToSet: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    let deletedCount = 0;

    for (const doc of duplicates) {
      // Sort uniqueIds to keep the oldest (assuming ObjectIds are chronologically sortable, which they are)
      // or we can fetch them to be sure, but usually we just want to keep one.
      // Let's keep the first one in the list (or sort if needed).
      const idsToDelete = doc.uniqueIds.slice(1); // Keep the first one, delete the rest
      
      if (idsToDelete.length > 0) {
        await Product.deleteMany({ _id: { $in: idsToDelete } });
        deletedCount += idsToDelete.length;
      }
    }

    res.status(200).json({ message: "Duplicate cleanup completed", deletedCount });

  } catch (error) {
    console.error("Error in deleteDuplicateProducts:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.images && product.images.length > 0) {
      for (const imageUrl of product.images) {
         try {
             // Extract public ID from URL only if it's a cloudinary URL
             if (imageUrl.includes("res.cloudinary.com")) {
                 const publicId = imageUrl.split("/").pop().split(".")[0];
                 await cloudinary.uploader.destroy(`products/${publicId}`);
             }
         } catch (error) {
             console.error("Error deleting image from cloudinary:", error);
         }
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
