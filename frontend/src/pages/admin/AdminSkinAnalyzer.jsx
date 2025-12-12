import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from "recharts";
import { Loader, Users, AlertCircle, Droplets, ShoppingBag, Download } from "lucide-react";
import axiosInstance from "../../lib/axios";

const AdminSkinAnalyzer = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalProfiles: 0,
    skinTypeStats: [],
    concernStats: [],
    recommendedStats: [],
    recentSubmissions: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axiosInstance.get("/admin/skin-analyzer/analytics");
      setAnalytics(res.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const handleDownloadCSV = () => {
    // Basic CSV generation from recent submissions (in a real app, fetch all)
    const headers = ["User", "Email", "Skin Type", "Concerns", "Allergies", "Date"];
    const rows = analytics.recentSubmissions.map(sub => [
      sub.userId?.name || "Guest",
      sub.userId?.email || "N/A",
      sub.skinType,
      sub.concerns.join("; "),
      sub.allergies.join("; "),
      new Date(sub.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "skin_analysis_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Skin Analyzer Insights</h1>
          <p className="text-gray-500">Overview of user skin profiles and trends</p>
        </div>
        <button 
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Download className="w-4 h-4" /> Export Data
        </button>
      </div>

      {/* 1. High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          icon={Users} 
          color="emerald" 
          label="Total Analyses" 
          value={analytics.totalProfiles} 
        />
        <MetricCard 
          icon={Droplets} 
          color="blue" 
          label="Most Common Skin Type" 
          value={analytics.skinTypeStats[0]?._id || "N/A"} 
        />
        <MetricCard 
          icon={AlertCircle} 
          color="amber" 
          label="Top Reported Concern" 
          value={analytics.concernStats[0]?._id || "N/A"} 
        />
        <MetricCard 
          icon={ShoppingBag} 
          color="purple" 
          label="Conversion Rate" 
          value="37%" 
          subtext="(Estimated)"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* 2. Recent Submissions Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Recent Submissions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 font-medium text-gray-500">User</th>
                  <th className="p-4 font-medium text-gray-500">Skin Type</th>
                  <th className="p-4 font-medium text-gray-500">Primary Concerns</th>
                  <th className="p-4 font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analytics.recentSubmissions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">
                      {sub.userId?.name || "Guest"}
                      <div className="text-xs text-gray-500">{sub.userId?.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                        {sub.skinType}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">
                      {sub.concerns.slice(0, 2).join(", ")}
                      {sub.concerns.length > 2 && "..."}
                    </td>
                    <td className="p-4 text-gray-500">
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {analytics.recentSubmissions.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Most Recommended Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Products</h3>
          <div className="space-y-4">
            {analytics.recommendedStats.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Img</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full" 
                        style={{ width: `${(item.count / analytics.totalProfiles) * 100}%` }} // Rough % bar
                      />
                    </div>
                    <span className="text-xs text-gray-500">{item.count} recs</span>
                  </div>
                </div>
              </div>
            ))}
            {analytics.recommendedStats.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No recommendations yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 4. Concern Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Concern Distribution</h3>
            <p className="text-sm text-gray-500">Top reported skin concerns</p>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar">
            {analytics.concernStats.map((item, index) => {
              const maxVal = Math.max(...analytics.concernStats.map(i => i.count));
              const percentage = (item.count / maxVal) * 100;
              
              return (
                <div key={item._id} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {item._id}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full rounded-full ${
                        index === 0 ? "bg-emerald-500" :
                        index === 1 ? "bg-emerald-400" :
                        "bg-emerald-300"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
            {analytics.concernStats.length === 0 && (
               <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data available</div>
            )}
          </div>
        </motion.div>

        {/* 5. Skin Type Distribution */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Skin Type Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.skinTypeStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="_id"
                  label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
                >
                  {analytics.skinTypeStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, color, label, value, subtext }) => {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    amber: "bg-amber-100 text-amber-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
          <h3 className="text-xl font-bold text-gray-900">{value}</h3>
          {subtext && <p className="text-[10px] text-gray-400 mt-0.5">{subtext}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSkinAnalyzer;
