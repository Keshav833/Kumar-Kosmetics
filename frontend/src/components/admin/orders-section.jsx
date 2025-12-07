import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";
import { Eye } from "lucide-react";
import OrderDetails from "./order-details";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersSection({ orders = [], setOrders = () => {} }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

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
      <h2 className="text-3xl font-light text-foreground mb-8">
        Recent <span className="font-semibold">Orders</span>
      </h2>

      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Payment</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {orders.map((order, idx) => (
                <motion.tr 
                  key={order._id} 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-primary">#{order._id.slice(-6)}</td>
                  <td className="px-6 py-4 text-sm text-foreground">
                      <div>
                          <p className="font-medium">{order.user?.name || "Unknown"}</p>
                          <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                      </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">₹{order.totalAmount}</td>
                  <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                          {order.paymentStatus}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || "bg-gray-100"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
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
