import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useWishlistStore = create((set, get) => ({
  wishlist: [],
  loading: false,

  getWishlist: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/wishlist");
      set({ wishlist: res.data.products || [] });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      set({ wishlist: [] });
    } finally {
      set({ loading: false });
    }
  },

  addToWishlist: async (productId) => {
    try {
      const res = await axiosInstance.post("/wishlist", { productId });
      set({ wishlist: res.data.products });
      toast.success("Added to wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error(error.response?.data?.message || "Failed to add to wishlist");
    }
  },

  removeFromWishlist: async (productId) => {
    try {
      const res = await axiosInstance.delete(`/wishlist/${productId}`);
      set({ wishlist: res.data.products });
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error(error.response?.data?.message || "Failed to remove from wishlist");
    }
  },

  isInWishlist: (productId) => {
    const { wishlist } = get();
    return wishlist.some((p) => p._id === productId || p === productId);
  },
}));
