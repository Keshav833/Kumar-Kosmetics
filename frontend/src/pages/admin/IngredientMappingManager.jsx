import { useState, useEffect } from "react";
import { Plus, Trash, Edit2, Save, X, Loader } from "lucide-react";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const IngredientMappingManager = () => {
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ingredient: "",
    concerns: "",
    description: "",
  });

  useEffect(() => {
    fetchMappings();
  }, []);

  const fetchMappings = async () => {
    try {
      const res = await axiosInstance.get("/admin/skin-analyzer/ingredients");
      setMappings(res.data);
    } catch (error) {
      toast.error("Failed to fetch mappings");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        concerns: formData.concerns.split(",").map((c) => c.trim()).filter(Boolean),
      };

      if (editingId) {
        await axiosInstance.put(`/admin/skin-analyzer/ingredients/${editingId}`, payload);
        toast.success("Mapping updated");
      } else {
        await axiosInstance.post("/admin/skin-analyzer/ingredients", payload);
        toast.success("Mapping created");
      }
      
      setFormData({ ingredient: "", concerns: "", description: "" });
      setEditingId(null);
      fetchMappings();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (mapping) => {
    setEditingId(mapping._id);
    setFormData({
      ingredient: mapping.ingredient,
      concerns: mapping.concerns.join(", "),
      description: mapping.description || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosInstance.delete(`/admin/skin-analyzer/ingredients/${id}`);
      toast.success("Mapping deleted");
      fetchMappings();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader className="w-8 h-8 animate-spin mx-auto" /></div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Ingredient Mapping Manager</h1>

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit Mapping" : "Add New Mapping"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredient Name</label>
                <input
                  type="text"
                  value={formData.ingredient}
                  onChange={(e) => setFormData({ ...formData, ingredient: e.target.value })}
                  className="w-full rounded-lg border-gray-300 border p-2 text-sm"
                  placeholder="e.g. Niacinamide"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Concerns (comma separated)</label>
                <input
                  type="text"
                  value={formData.concerns}
                  onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                  className="w-full rounded-lg border-gray-300 border p-2 text-sm"
                  placeholder="e.g. Acne, Redness"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-lg border-gray-300 border p-2 text-sm"
                placeholder="Brief explanation of benefits"
              />
            </div>
            <div className="flex justify-end gap-2">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({ ingredient: "", concerns: "", description: "" });
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 flex items-center gap-2"
              >
                {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {editingId ? "Update Mapping" : "Add Mapping"}
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-medium text-gray-500">Ingredient</th>
                <th className="p-4 font-medium text-gray-500">Target Concerns</th>
                <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mappings.map((mapping) => (
                <tr key={mapping._id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{mapping.ingredient}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {mapping.concerns.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs border border-emerald-100">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(mapping)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(mapping._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {mappings.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-500">
                    No mappings found. Add one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IngredientMappingManager;
