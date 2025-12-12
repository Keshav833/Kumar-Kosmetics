import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from 'framer-motion';

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import AuthPage from './pages/AuthPage'

import ContactPage from './pages/ContactPage'
import AdminContactMessages from './components/admin/AdminContactMessages'
import SkinAnalyzer from './pages/SkinAnalyzer'
import SkinAnalysisResults from './pages/SkinAnalysisResults'
import Admin from './pages/Admin'
import AddProduct from './pages/admin/AddProduct'
import AuthModal from './components/auth/AuthModal'
import Profile from './pages/Profile'
import Wishlist from "./pages/Wishlist";
import OrderSuccess from "./pages/OrderSuccess";
import BulkUploadProducts from "./pages/admin/BulkUploadProducts";

function AnimatedRoutes() {
  const location = useLocation();
  const { authUser } = useAuthStore();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={<AuthPage />} />
        <Route path="/verify-otp" element={<AuthPage />} />
        <Route path="/reset-password" element={<AuthPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/skin-analyzer" element={authUser ? <SkinAnalyzer /> : <Navigate to="/login" />} />
        <Route path="/skin-analyzer/results" element={authUser ? <SkinAnalysisResults /> : <Navigate to="/login" />} />
        <Route path="/admin" element={authUser?.role === "admin" ? <Admin /> : <Navigate to="/" />} />
        <Route path="/admin/add-product" element={authUser?.role === "admin" ? <AddProduct /> : <Navigate to="/" />} />
        <Route path="/admin/edit-product/:id" element={authUser?.role === "admin" ? <AddProduct /> : <Navigate to="/" />} />
        <Route path="/admin/bulk-products" element={authUser?.role === "admin" ? <BulkUploadProducts /> : <Navigate to="/" />} />
        <Route path="/admin/messages" element={authUser?.role === "admin" ? <AdminContactMessages /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
        <Route path="/wishlist" element={authUser ? <Wishlist /> : <Navigate to="/login" />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const { checkAuth, checkingAuth } = useAuthStore();
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
      <AnimatedRoutes />
      <AuthModal />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
