import { useState } from "react";
import { X, Package, Truck, CreditCard, User, MapPin, Calendar } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function OrderDetails({ order, onClose, onUpdate }) {
  const [status, setStatus] = useState(order.status);
  const [trackingId, setTrackingId] = useState(order.trackingId || "");
  const [adminNotes, setAdminNotes] = useState(order.adminNotes || "");
  const [loading, setLoading] = useState(false);

  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/orders/${order._id}/status`, {
        status,
        trackingId,
        adminNotes
      });
      onUpdate(res.data);
      toast.success("Order updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Order Details</h2>
            <p className="text-sm text-muted-foreground">Order ID: #{order._id.slice(-6)}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Order Info & Items */}
          <div className="space-y-8">
            {/* Items */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" /> Order Items
              </h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-3 bg-muted/30 rounded-lg border border-border">
                    <div className="w-16 h-16 bg-white rounded-md overflow-hidden border border-border flex-shrink-0">
                      <img 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.name} 
                        className="w-full h-full object-contain p-1" 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Variant: {item.variant || "N/A"}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between pt-4 border-t border-border">
                <span className="font-semibold">Total Amount</span>
                <span className="text-xl font-bold text-primary">₹{order.totalAmount}</span>
              </div>
            </section>

            {/* Payment Info */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Payment Information
              </h3>
              <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                {order.razorpayPaymentId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment ID:</span>
                    <span className="font-mono text-sm">{order.razorpayPaymentId}</span>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Customer, Address, Admin Actions */}
          <div className="space-y-8">
            {/* Customer & Address */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Customer Details
              </h3>
              <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{order.user?.name || "Unknown"}</p>
                    <p className="text-sm text-muted-foreground">{order.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{order.address.fullName}</p>
                    <p className="text-sm text-muted-foreground">{order.address.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.address.city}, {order.address.state} - {order.address.pincode}
                    </p>
                    <p className="text-sm text-muted-foreground">Phone: {order.address.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 mt-1 text-muted-foreground" />
                    <div>
                        <p className="text-sm text-muted-foreground">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                </div>
              </div>
            </section>

            {/* Admin Actions */}
            <section className="bg-white border-2 border-primary/10 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" /> Order Management
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Order Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tracking ID</label>
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter tracking number"
                    className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Admin Notes</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Internal notes..."
                    rows={3}
                    className="w-full p-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
                  />
                </div>

                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update Order"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
