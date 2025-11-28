import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: null,
  loading: false,

  getCart: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/cart");
      set({ cart: res.data });
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({ cart: null });
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (productId, quantity = 1, variant) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/cart", { productId, quantity, variant });
      set({ cart: res.data });
      toast.success("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      set({ loading: false });
    }
  },

  removeFromCart: async (itemId) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.delete(`/cart/${itemId}`);
      set({ cart: res.data });
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error(error.response?.data?.message || "Failed to remove from cart");
    } finally {
      set({ loading: false });
    }
  },

  updateQuantity: async (itemId, quantity) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.put(`/cart/${itemId}`, { quantity });
      set({ cart: res.data });
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error(error.response?.data?.message || "Failed to update quantity");
    } finally {
      set({ loading: false });
    }
  },
}));
