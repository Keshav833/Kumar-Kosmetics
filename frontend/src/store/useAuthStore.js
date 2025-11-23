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
}));
