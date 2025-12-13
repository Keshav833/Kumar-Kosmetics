import React, { useState } from "react";
import Papa from "papaparse";
import { Upload, AlertCircle, CheckCircle, FileText, Loader, X, ArrowLeft, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function BulkUploadProducts() {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        if (selectedFile.type !== "text/csv") {
            toast.error("Please upload a CSV file");
            return;
        }
        setFile(selectedFile);
        parseCSV(selectedFile);
    }
  };

  const removeRow = (indexToRemove) => {
    setPreviewData(prevData => prevData.filter((_, index) => index !== indexToRemove));
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedProducts = results.data.map((row, index) => {
           // Basic mapping and cleaning
           try {
             return {
                _id: index, // temp id for key
                name: row.productName || row.name,
                description: row.description,
                category: row.category,
                stock: row.stock ? parseInt(row.stock) : 0,
                price: row.price ? parseFloat(row.price) : 0,
                discountPrice: row.discountPrice ? parseFloat(row.discountPrice) : undefined,
                featured: row.featured === 'true',
                // Complex fields
                skinType: row.skinTypes ? row.skinTypes.split(',').map(s => s.trim()) : [],
                skinConcerns: row.skinConcerns ? row.skinConcerns.split(',').map(s => s.trim()) : [],
                allergyLabels: row.allergyLabels ? row.allergyLabels.split(',').map(s => s.trim()) : [],
                ingredients: row.ingredients ? row.ingredients.split(',').map(s => s.trim()) : [],
                images: [row.image1, row.image2, row.image3].filter(Boolean),
                variants: row.variants ? JSON.parse(row.variants) : [],
                isValid: !!(row.productName || row.name) && !!row.category && !!row.price && !!row.stock
             };
           } catch (err) {
               console.error("Row parse error", err);
               return { _id: index, isValid: false, error: "Parse Error" };
           }
        });
        setPreviewData(parsedProducts);
      },
      error: (error) => {
        toast.error("Error parsing CSV: " + error.message);
      }
    });
  };

  const handleUpload = async () => {
    const validProducts = previewData.filter(p => p.isValid).map(({ _id, isValid, error, ...rest }) => rest);
    
    if (validProducts.length === 0) {
        toast.error("No valid products to upload");
        return;
    }

    setUploading(true);
    try {
        const response = await axiosInstance.post("/products/bulk", { products: validProducts });
        setUploadResult(response.data);
        toast.success("Bulk upload completed!");
        setFile(null);
        setPreviewData([]);
    } catch (error) {
        console.error("Bulk upload error", error);
        toast.error(error.response?.data?.message || "Upload failed");
    } finally {
        setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-light text-foreground mb-2">Bulk Upload Products</h2>
           <p className="text-muted-foreground">Upload a CSV file to add multiple products at once.</p>
        </div>
        <button 
            onClick={() => navigate("/admin")}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
        </button>
      </div>

      {!uploadResult ? (
          <>
            {/* Upload Area */}
            <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-10 text-center mb-8">
                <input 
                    type="file" 
                    id="csvUpload" 
                    accept=".csv" 
                    onChange={handleFileChange} 
                    className="hidden" 
                />
                <label htmlFor="csvUpload" className="cursor-pointer flex flex-col items-center">
                    <div className="bg-indigo-50 p-4 rounded-full mb-4">
                        <Upload className="w-8 h-8 text-indigo-600" />
                    </div>
                    <span className="text-lg font-medium text-gray-700">Click to upload CSV</span>
                    <span className="text-sm text-gray-500 mt-1">or drag and drop file here</span>
                    {file && (
                        <div className="mt-4 flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded text-indigo-700">
                            <FileText size={16} />
                            {file.name}
                        </div>
                    )}
                </label>
            </div>

            {/* Preview Table */}
            {previewData.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8"
                >
                    <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-700">CSV Preview ({previewData.length} rows)</h3>
                        <div className="text-sm text-gray-500">
                            <span className="text-green-600 font-medium">{previewData.filter(p => p.isValid).length} Valid</span>
                            {" / "}
                            <span className="text-red-600 font-medium">{previewData.filter(p => !p.isValid).length} Invalid</span>
                        </div>
                    </div>
                    <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Price</th>
                                    <th className="px-4 py-3">Stock</th>
                                    <th className="px-4 py-3">Images</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {previewData.map((row, index) => (
                                    <tr key={row._id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            {row.isValid ? (
                                                <CheckCircle className="text-green-500 w-5 h-5" />
                                            ) : (
                                                <AlertCircle className="text-red-500 w-5 h-5" />
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900">{row.name || "-"}</td>
                                        <td className="px-4 py-3 text-gray-500">{row.category || "-"}</td>
                                        <td className="px-4 py-3 text-gray-500">₹{row.price}</td>
                                        <td className="px-4 py-3 text-gray-500">{row.stock}</td>
                                        <td className="px-4 py-3">
                                            {row.images && row.images.length > 0 ? (
                                                <img 
                                                    src={row.images[0]} 
                                                    alt={row.name} 
                                                    className="w-10 h-10 object-cover rounded border border-gray-200"
                                                />
                                            ) : (
                                                <span className="text-xs text-gray-400">No image</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <button 
                                                onClick={() => removeRow(index)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                                                title="Remove product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <button 
                            onClick={handleUpload}
                            disabled={uploading || previewData.filter(p => p.isValid).length === 0}
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {uploading && <Loader className="animate-spin w-4 h-4" />}
                            Upload {previewData.filter(p => p.isValid).length} Products
                        </button>
                    </div>
                </motion.div>
            )}
          </>
      ) : (
          /* Success Screen */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg border border-green-100 p-8 text-center max-w-2xl mx-auto"
          >
              <div className="bg-green-100 p-4 rounded-full inline-flex mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Complete!</h3>
              <p className="text-gray-600 mb-6">Your bulk upload has been processed.</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500 uppercase">Total</div>
                      <div className="text-2xl font-bold text-gray-800">{uploadResult.summary.total}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-600 uppercase">Added</div>
                      <div className="text-2xl font-bold text-green-700">{uploadResult.summary.added}</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-sm text-red-600 uppercase">Failed</div>
                      <div className="text-2xl font-bold text-red-700">{uploadResult.summary.failed}</div>
                  </div>
              </div>

              {uploadResult.errors.length > 0 && (
                  <div className="text-left mb-8">
                      <h4 className="font-semibold text-red-600 mb-2">Errors:</h4>
                      <div className="bg-red-50 p-4 rounded-lg max-h-96 overflow-y-auto text-sm">
                          {uploadResult.errors.map((err, i) => (
                              <div key={i} className="bg-white border border-red-100 rounded-lg p-4 mb-3 shadow-sm">
                                  <div className="flex items-start gap-3">
                                      <div className="bg-red-100 p-2 rounded-full mt-1">
                                          <X className="w-4 h-4 text-red-600" />
                                      </div>
                                      <div className="flex-1">
                                          <h5 className="font-semibold text-gray-800">
                                              Row {err.row} – {err.productName || err.name}
                                          </h5>
                                          
                                          {err.invalidValues ? (
                                              <div className="mt-2 text-sm">
                                                  <p className="text-red-600 font-medium mb-1">
                                                      The {err.field} column contains unsupported values:
                                                  </p>
                                                  <ul className="list-disc list-inside text-red-700 mb-3 pl-2">
                                                      {err.invalidValues.map((val, idx) => (
                                                          <li key={idx}>{val}</li>
                                                      ))}
                                                  </ul>
                                                  
                                                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                                                      <p className="text-gray-600 font-medium mb-1 text-xs uppercase tracking-wide">
                                                          Allowed {err.field}:
                                                      </p>
                                                      <p className="text-gray-500 leading-relaxed text-xs">
                                                          {err.allowedValues.join(", ")}
                                                      </p>
                                                  </div>

                                                  <div className="mt-3 text-gray-600 flex items-center gap-2 bg-blue-50 p-2 rounded text-xs text-blue-700">
                                                      <span className="font-bold">👉 Fix:</span> 
                                                      Replace invalid values with the allowed ones listed above, then re-upload.
                                                  </div>
                                              </div>
                                          ) : (
                                              <p className="text-red-600 mt-1 text-sm">{err.message}</p>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              <div className="flex justify-center gap-4">
                  <button 
                      onClick={() => { setUploadResult(null); setFile(null); setPreviewData([]); }}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                      Upload More
                  </button>
                  <button 
                      onClick={() => navigate("/admin")}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                      View Products
                  </button>
              </div>
          </motion.div>
      )}
    </div>
  );
}
