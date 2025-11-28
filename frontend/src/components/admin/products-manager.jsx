"use client"

import { useState } from "react"
import { X, Upload, Edit2, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProductsManager({ products, setProducts }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    image: "",
  })

  const handleOpenModal = (product) => {
    if (product) {
      setFormData(product)
      setEditingId(product.id)
    } else {
      setFormData({ name: "", sku: "", price: 0, stock: 0, category: "", description: "", image: "" })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({ name: "", sku: "", price: 0, stock: 0, category: "", description: "", image: "" })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (!formData.name || !formData.sku || !formData.price || !formData.stock) {
      alert("Please fill in all required fields")
      return
    }

    if (editingId) {
      setProducts(products.map((p) => (p.id === editingId ? { ...p, ...formData } : p)))
    } else {
      const newProduct = {
        id: Date.now().toString(),
        ...formData,
      }
      setProducts([...products, newProduct])
    }
    handleCloseModal()
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-light text-foreground">
          <span className="font-semibold">Products</span>
          <span className="text-lg text-muted-foreground ml-2">({products.length})</span>
        </h2>
        <button
          onClick={() => navigate("/admin/add-product")}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Add Product
        </button>
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
            <thead className="border-b border-border bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <div className="w-10 h-10 bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-100">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">₹{product.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock > 30
                          ? "bg-green-50 text-green-700"
                          : product.stock > 10
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-3">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-foreground">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h3>
                <button onClick={handleCloseModal} className="text-muted-foreground hover:text-foreground">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Product Image</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                    {formData.image ? (
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-white rounded-lg overflow-hidden flex items-center justify-center mb-4 border border-gray-100">
                          <img
                            src={formData.image || "/placeholder.svg"}
                            alt="preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <label className="cursor-pointer">
                          <span className="text-primary hover:underline font-medium">Change Image</span>
                          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center">
                        <Upload size={32} className="text-muted-foreground mb-2" />
                        <span className="text-foreground font-medium">Click to upload image</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter product name"
                  />
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">SKU *</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., HES-001"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select category</option>
                    <option value="Serums">Serums</option>
                    <option value="Cleansers">Cleansers</option>
                    <option value="Creams">Creams</option>
                    <option value="Masks">Masks</option>
                    <option value="Sunscreen">Sunscreen</option>
                  </select>
                </div>

                {/* Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Stock *</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter product description"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    {editingId ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
