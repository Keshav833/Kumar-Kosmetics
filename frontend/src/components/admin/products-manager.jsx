"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus, Upload, RefreshCw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import axiosInstance from "../../lib/axios"
import toast from "react-hot-toast"

export default function ProductsManager({ 
  products, 
  setProducts, 
  page, 
  setPage, 
  totalPages, 
  totalProducts,
  search,
  setSearch,
  sortBy,
  setSortBy,
  order,
  setOrder
}) {
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
            // Refresh products (triggers re-fetch via parent effect)
             // We can just rely on the parent effect if we want, or call refresh. 
             // Since we don't have the fetch function passed down, we might need to toggle something or just wait for next update.
             // Actually, the simplest way to refresh is to just update the state if we had the function, but since we don't, 
             // and cleanup might affect total count, maybe we should just reload the page or trigger a refresh callback.
             // For now, let's keep it simple. The list update below only affects current local state.
             // Ideally we should have a `refresh` prop. But let's leave it as is, the user didn't complain about cleanup.
             // We can force a re-fetch by toggling page (hacky) or just let it be. 
             window.location.reload(); // Simplest fix for now to ensure total count updates
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

  const handleSearchChange = (e) => {
      setSearch(e.target.value);
      setPage(1);
  };

  const handleSortChange = (e) => {
      setSortBy(e.target.value);
      setPage(1);
  };

  const toggleOrder = () => {
      setOrder(prev => prev === "asc" ? "desc" : "asc");
      setPage(1);
  };

  return (
    <div className="p-8">
      {/* Header Row: Title and Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-light text-foreground">
          <span className="font-semibold">Products</span>
          <span className="text-lg text-muted-foreground ml-2">({totalProducts} Total)</span>
        </h2>
        
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleCleanup}
            disabled={cleaning}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50 transition-colors text-sm"
          >
            <RefreshCw size={18} className={cleaning ? "animate-spin" : ""} />
            {cleaning ? "Cleaning..." : "Cleanup"}
          </button>
          <button
            onClick={() => navigate("/admin/bulk-products")}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors text-sm"
          >
            <Upload size={18} />
            Bulk
          </button>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Filter Row: Search and Sort */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:w-auto flex-1 max-w-lg relative">
            <input
                type="text"
                placeholder="Search products by name..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm text-gray-500 whitespace-nowrap hidden md:block">Sort by:</span>
            <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-sm cursor-pointer hover:bg-gray-50 transition-colors"
            >
                <option value="createdAt">Date Added</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
            </select>

            <button
                onClick={toggleOrder}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center justify-center gap-2 transition-colors w-36"
            >
                {order === "asc" ? (
                    <>
                        <span className="text-gray-600">Ascending</span>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                    </>
                ) : (
                    <>
                        <span className="text-gray-600">Descending</span>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h5m4 0l4 4m0 0l4-4m-4 4V3" />
                        </svg>
                    </>
                )}
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
        <>
          <div className="bg-white rounded-2xl border border-border overflow-hidden mb-6">
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

          {/* Pagination Controls */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
             <div className="text-sm text-gray-500">
                Page {page} of {totalPages}
             </div>
             <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Previous
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Next
                </button>
             </div>
          </div>
        </>
      )}
    </div>
  )
}
