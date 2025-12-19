import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";
import { Eye } from "lucide-react";
import OrderDetails from "./order-details";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersSection({ orders = [], setOrders = () => {}, returns = [] }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");

  const statusColors = {
    Delivered: "bg-green-50 text-green-700",
    Processing: "bg-blue-50 text-blue-700",
    Shipped: "bg-purple-50 text-purple-700",
    Pending: "bg-yellow-50 text-yellow-700",
    Cancelled: "bg-red-50 text-red-700",
  }

  const handleOrderUpdate = (updatedOrder) => {
    setOrders(orders.map((order) => (order._id === updatedOrder._id ? updatedOrder : order)));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-light text-foreground">
          Recent <span className="font-semibold">{activeTab === "orders" ? "Orders" : "Returns"}</span>
        </h2>
        
        <div className="flex space-x-2 bg-white p-1 rounded-lg border border-gray-200">
            <button 
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-2 rounded-md transition-all ${activeTab === "orders" ? "bg-gray-900 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}
            >
                Orders
            </button>
            <button 
                onClick={() => setActiveTab("returns")}
                className={`px-4 py-2 rounded-md transition-all ${activeTab === "returns" ? "bg-gray-900 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}
            >
                Returns
            </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {activeTab === "orders" ? (
                  <>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                  </>
              ) : (
                  <>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Return ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {activeTab === "orders" ? (
                  orders.map((order, idx) => (
                    <motion.tr 
                      key={order._id} 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">#{order._id.slice(-6)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                              <p className="font-medium">{order.user?.name || "Unknown"}</p>
                              <p className="text-xs text-gray-500">{order.user?.email}</p>
                          </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.totalAmount}</td>
                      <td className="px-6 py-4 text-sm">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                              order.paymentStatus === 'Paid' 
                                ? 'bg-green-50 text-green-700 border-green-100' 
                                : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                          }`}>
                              {order.paymentStatus}
                          </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border border-transparent ${statusColors[order.status] || "bg-gray-100 border-gray-200"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
              ) : (
                  returns.map((ret, idx) => (
                    <motion.tr 
                      key={ret._id} 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">#{ret._id.slice(-6)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">#{ret.orderId?._id?.slice(-6) || "N/A"}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                              <p className="font-medium">{ret.userId?.name || "Unknown"}</p>
                              <p className="text-xs text-gray-500">{ret.userId?.email}</p>
                          </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{ret.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{ret.reason}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border border-transparent ${
                            ret.status === "Requested" ? "bg-yellow-50 text-yellow-700" : 
                            ret.status === "Approved" ? "bg-green-50 text-green-700" :
                            "bg-gray-100 text-gray-600"
                        }`}>
                          {ret.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetails 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
            onUpdate={handleOrderUpdate}
        />
      )}
    </div>
  )
}
