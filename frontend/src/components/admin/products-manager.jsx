"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus, Upload, RefreshCw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import axiosInstance from "../../lib/axios"
import toast from "react-hot-toast"

export default function ProductsManager({ products, setProducts }) {
  const navigate = useNavigate()
  const [cleaning, setCleaning] = useState(false)

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axiosInstance.delete(`/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  }


  const handleCleanup = async () => {
    setCleaning(true);
    try {
        const res = await axiosInstance.post("/products/cleanup-duplicates");
        if (res.data.deletedCount > 0) {
            toast.success(`Cleaned up ${res.data.deletedCount} duplicate products`);
            // Refresh products
            const productsRes = await axiosInstance.get("/products");
            setProducts(productsRes.data.products);
        } else {
            toast.success("No duplicate products found");
        }
    } catch (error) {
        console.error("Cleanup error:", error);
        toast.error("Failed to cleanup duplicates");
    } finally {
        setCleaning(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-foreground">
          <span className="font-semibold">Products</span>
          <span className="text-lg text-muted-foreground ml-2">({products.length})</span>
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCleanup}
            disabled={cleaning}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={20} className={cleaning ? "animate-spin" : ""} />
            {cleaning ? "Cleaning..." : "Cleanup Duplicates"}
          </button>
          <button
            onClick={() => navigate("/admin/bulk-products")}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
          >
            <Upload size={20} />
            Bulk Upload
          </button>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <p className="text-muted-foreground mb-4">No products added yet</p>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products.map((product, idx) => (
                  <motion.tr 
                    key={product._id} 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 shadow-sm">
                        <img
                          src={product.images?.[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{product.price}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          product.stock > 30
                            ? "bg-green-50 text-green-700 border-green-100"
                            : product.stock > 10
                              ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                              : "bg-red-50 text-red-700 border-red-100"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit Product"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Product"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
