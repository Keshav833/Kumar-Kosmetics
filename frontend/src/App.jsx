import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyOtp from './pages/auth/VerifyOtp'
import ResetPassword from './pages/auth/ResetPassword'
import ContactPage from './pages/ContactPage'
import AdminContactMessages from './components/admin/AdminContactMessages'
import SkinAnalyzer from './pages/SkinAnalyzer'
import Admin from './pages/Admin'
import AddProduct from './pages/admin/AddProduct'
import AuthModal from './components/auth/AuthModal'
import Profile from './pages/Profile'
import Wishlist from "./pages/Wishlist";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const { authUser, checkAuth, checkingAuth } = useAuthStore();
  console.log("Vercel API URL:", import.meta.env.VITE_API_URL);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/skin-analyzer" element={<SkinAnalyzer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/edit-product/:id" element={<AddProduct />} />
        <Route path="/admin/messages" element={<AdminContactMessages />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
        <Route path="/wishlist" element={authUser ? <Wishlist /> : <Navigate to="/login" />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      <AuthModal />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
