import { useState, useEffect } from "react";
import { Plus, Trash, Edit2, Save, X, Loader, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const QuestionBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    type: "single-select",
    category: "General",
    options: [{ label: "", value: "" }],
    required: true,
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axiosInstance.get("/admin/skin-analyzer/questions");
      setQuestions(res.data);
    } catch (error) {
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index][field] = value;
    // Auto-generate value from label if value is empty
    if (field === "label" && !newOptions[index].value) {
      newOptions[index].value = value.toLowerCase().replace(/\s+/g, "-");
    }
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({ ...formData, options: [...formData.options, { label: "", value: "" }] });
  };

  const removeOption = (index) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (formData.options.some(o => !o.label || !o.value)) {
        toast.error("All options must have a label and value");
        return;
      }

      const payload = {
        ...formData,
        order: editingId ? questions.find(q => q._id === editingId).order : questions.length + 1,
      };

      if (editingId) {
        await axiosInstance.put(`/admin/skin-analyzer/questions/${editingId}`, payload);
        toast.success("Question updated");
      } else {
        await axiosInstance.post("/admin/skin-analyzer/questions", payload);
        toast.success("Question created");
      }
      
      resetForm();
      fetchQuestions();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const resetForm = () => {
    setFormData({
      text: "",
      type: "single-select",
      category: "General",
      options: [{ label: "", value: "" }],
      required: true,
    });
    setEditingId(null);
  };

  const handleEdit = (question) => {
    setEditingId(question._id);
    setFormData({
      text: question.text,
      type: question.type,
      category: question.category,
      options: question.options.length > 0 ? question.options : [{ label: "", value: "" }],
      required: question.required,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosInstance.delete(`/admin/skin-analyzer/questions/${id}`);
      toast.success("Question deleted");
      fetchQuestions();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader className="w-8 h-8 animate-spin mx-auto" /></div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Question Builder</h1>

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit Question" : "Add New Question"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                <input
                  type="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full rounded-lg border-gray-300 border p-2 text-sm"
                  placeholder="e.g. How would you describe your skin?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full rounded-lg border-gray-300 border p-2 text-sm"
                >
                  <option value="single-select">Single Select</option>
                  <option value="multi-select">Multi Select</option>
                  <option value="yes-no">Yes/No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border-gray-300 border p-2 text-sm"
                  placeholder="e.g. Skin Type"
                />
              </div>
            </div>

            {/* Options Builder */}
            {formData.type !== "yes-no" && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-3">Answer Options</label>
                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={option.label}
                          onChange={(e) => handleOptionChange(index, "label", e.target.value)}
                          className="w-full rounded-md border-gray-300 border p-2 text-sm"
                          placeholder="Label (e.g. Oily)"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={option.value}
                          onChange={(e) => handleOptionChange(index, "value", e.target.value)}
                          className="w-full rounded-md border-gray-300 border p-2 text-sm font-mono text-xs bg-gray-50"
                          placeholder="Value (e.g. oily)"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                        disabled={formData.options.length === 1}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addOption}
                  className="mt-3 text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Option
                </button>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
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
                {editingId ? "Update Question" : "Add Question"}
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="mt-1 text-gray-400 cursor-move">
                <GripVertical className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium uppercase">
                    {question.type}
                  </span>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                    {question.category}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900">{question.text}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {question.options.map((opt, i) => (
                    <span key={i} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      {opt.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(question)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(question._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {questions.length === 0 && (
            <div className="text-center p-8 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
              No questions defined yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBuilder;
