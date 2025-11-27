import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
	authUser: null,
	signingUp: false,
	loggingIn: false,
	loading: false,
	checkingAuth: true,
	isAuthModalOpen: false,
	triggerAction: null, // { type: 'checkout' | 'wishlist' | 'review', data: any }

	openAuthModal: (action = null) => set({ isAuthModalOpen: true, triggerAction: action }),
	closeAuthModal: () => set({ isAuthModalOpen: false, triggerAction: null }),

	signup: async (signupData) => {
		set({ signingUp: true, loading: true });
		try {
			const res = await axiosInstance.post("/auth/signup", signupData);
			set({ authUser: res.data });
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during signup");
		} finally {
			set({ signingUp: false, loading: false });
		}
	},

	login: async (loginData) => {
		set({ loggingIn: true, loading: true });
		try {
			const res = await axiosInstance.post("/auth/login", loginData);
			set({ authUser: res.data });
			toast.success("Logged in successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during login");
		} finally {
			set({ loggingIn: false, loading: false });
		}
	},
	
	googleLogin: async (credential) => {
		set({ loggingIn: true, loading: true });
		try {
			const res = await axiosInstance.post("/auth/google", { token: credential });
			set({ authUser: res.data });
			toast.success("Logged in successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Google login failed");
		} finally {
			set({ loggingIn: false, loading: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			toast.success("Logged out successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred during logout");
		}
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const res = await axiosInstance.get("/auth/profile");
			set({ authUser: res.data });
		} catch (error) {
			console.log("Error in checkAuth:", error);
			set({ authUser: null });
		} finally {
			set({ checkingAuth: false });
		}
	},

    updateProfile: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.put("/profile/update", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating profile");
        } finally {
            set({ loading: false });
        }
    },

    addAddress: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/profile/address", data);
            set({ authUser: res.data });
            toast.success("Address added successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding address");
        } finally {
            set({ loading: false });
        }
    },

    deleteAddress: async (id) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.delete(`/profile/address/${id}`);
            set({ authUser: res.data });
            toast.success("Address deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting address");
        } finally {
            set({ loading: false });
        }
    },

    addUPI: async (data) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/profile/upi", data);
            set({ authUser: res.data });
            toast.success("UPI added successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding UPI");
        } finally {
            set({ loading: false });
        }
    },

    deleteUPI: async (id) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.delete(`/profile/upi/${id}`);
            set({ authUser: res.data });
            toast.success("UPI deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting UPI");
        } finally {
            set({ loading: false });
        }
    },

    getMyOrders: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/profile/orders");
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching orders");
            return [];
        } finally {
            set({ loading: false });
        }
    },
}));
