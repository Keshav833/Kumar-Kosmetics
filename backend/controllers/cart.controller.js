import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error in getCart controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, variant } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if item already exists in cart (same product and variant)
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.variant === variant
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, variant });
    }

    await cart.save();
    // Populate product details for the response
    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    console.error("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params; // Using the item's _id in the items array
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (error) {
    console.error("Error in removeFromCart controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
    if (itemIndex > -1) {
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        // Remove item if quantity is 0 or less
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();
      await cart.populate("items.product");
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = [];
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error("Error in clearCart controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        console.log("Received Coupon:", code);
        console.log("Expected Coupon:", process.env.FREE_DELIVERY_CODE);
        
        if (code === process.env.FREE_DELIVERY_CODE) {
            return res.json({
                valid: true,
                type: 'free_delivery',
                message: 'Coupon applied successfully!'
            });
        }
        res.status(400).json({ valid: false, message: "Invalid coupon code" });
    } catch (error) {
        console.error("Error in validateCoupon controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
