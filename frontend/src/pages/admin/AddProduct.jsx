import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash, Upload, X, Loader } from "lucide-react";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const categories = ["Cleanser", "Moisturizer", "Serum", "Sunscreen", "Mask", "Toner", "Treatment"];
const skinTypes = ["Oily", "Dry", "Combination", "Sensitive", "Normal"];
const skinConcerns = [
  "Acne",
  "Dullness",
  "Pigmentation",
  "Anti-aging",
  "Redness",
  "Dark spots",
  "Uneven skin tone",
];
const allergyLabels = [
  "Paraben-free",
  "Sulfate-free",
  "Alcohol-free",
  "Fragrance-free",
  "Silicone-free",
  "Non-comedogenic",
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
    status: "Active",
    featured: false,
    ingredients: "",
    skinType: [],
    skinConcerns: [],
    allergyLabels: [],
    images: [],
    variants: [],
  });

  const [newVariant, setNewVariant] = useState({ name: "", stock: "", image: "" });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleArrayChange = (e, field) => {
    const { value, checked } = e.target;
    let updatedArray = [...formData[field]];
    if (checked) {
      updatedArray.push(value);
    } else {
      updatedArray = updatedArray.filter((item) => item !== value);
    }
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, images: [...formData.images, reader.result] });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    setNewVariant({ ...newVariant, [name]: value });
  };

  const handleVariantImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewVariant({ ...newVariant, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addVariant = () => {
    if (newVariant.name && newVariant.stock) {
      setFormData({
        ...formData,
        variants: [...formData.variants, newVariant],
      });
      setNewVariant({ name: "", stock: "", image: "" });
    } else {
      toast.error("Please fill in variant name and stock");
    }
  };

  const removeVariant = (index) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Process ingredients from comma-separated string to array
      const processedData = {
        ...formData,
        ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      };

      const res = await axiosInstance.post("/products", processedData);
      toast.success("Product created successfully");
      navigate("/admin");
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 bg-emerald-600 border-b border-emerald-500">
            <h2 className="text-2xl font-bold text-white">Add New Product</h2>
            <p className="text-emerald-100 mt-1">Create a new product with skin analysis details</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Discount Price ($)</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Featured Product</label>
                  </div>
                </div>
              </div>
            </section>

            {/* Product Images */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Product Images</h3>
              <div className="flex items-center space-x-4 mb-4">
                <label className="cursor-pointer bg-emerald-50 text-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-100 transition-colors flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="h-32 w-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Skin Compatibility & Safety */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
                Skin Compatibility & Safety
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skin Type Compatibility</label>
                  <div className="flex flex-wrap gap-3">
                    {skinTypes.map((type) => (
                      <label key={type} className="inline-flex items-center bg-white border rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          value={type}
                          checked={formData.skinType.includes(type)}
                          onChange={(e) => handleArrayChange(e, "skinType")}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skin Concerns Solved</label>
                  <div className="flex flex-wrap gap-3">
                    {skinConcerns.map((concern) => (
                      <label key={concern} className="inline-flex items-center bg-white border rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          value={concern}
                          checked={formData.skinConcerns.includes(concern)}
                          onChange={(e) => handleArrayChange(e, "skinConcerns")}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{concern}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allergy-Safe Labels</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allergyLabels.map((label) => (
                      <label key={label} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          value={label}
                          checked={formData.allergyLabels.includes(label)}
                          onChange={(e) => handleArrayChange(e, "allergyLabels")}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                  <p className="text-xs text-gray-500 mb-1">Separate ingredients with commas</p>
                  <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Water, Glycerin, Niacinamide..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                  />
                </div>
              </div>
            </section>

            {/* Variants / Shades */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Variants / Shades</h3>
              
              <div className="bg-gray-50 p-4 rounded-md border mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Variant</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Variant Name (e.g. Red, XL)</label>
                    <input
                      type="text"
                      name="name"
                      value={newVariant.name}
                      onChange={handleVariantChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={newVariant.stock}
                      onChange={handleVariantChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-2 border"
                    />
                  </div>
                  <div className="flex gap-2">
                     <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center flex-1">
                      <Upload className="w-4 h-4 mr-1" />
                      Image
                      <input type="file" className="hidden" onChange={handleVariantImageUpload} accept="image/*" />
                    </label>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </button>
                  </div>
                </div>
                {newVariant.image && (
                    <div className="mt-2">
                        <img src={newVariant.image} alt="Variant Preview" className="h-16 w-16 object-cover rounded border" />
                    </div>
                )}
              </div>

              {formData.variants.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.variants.map((variant, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {variant.image ? (
                                <img src={variant.image} alt={variant.name} className="h-10 w-10 object-cover rounded-full" />
                            ) : (
                                <span className="text-gray-400 text-xs">No Image</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{variant.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{variant.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              type="button"
                              onClick={() => removeVariant(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <div className="flex justify-end pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md mr-4 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Create Product
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProduct;
