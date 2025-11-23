"use client"

export default function OrdersSection({ orders = [], setOrders = () => {} }) {
  const statusColors = {
    Delivered: "bg-green-50 text-green-700",
    Processing: "bg-blue-50 text-blue-700",
    Shipped: "bg-purple-50 text-purple-700",
    Pending: "bg-yellow-50 text-yellow-700",
  }

  const statuses = ["Pending", "Processing", "Shipped", "Delivered"]

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-light text-foreground mb-8">
        Recent <span className="font-semibold">Orders</span>
      </h2>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-primary">{order.id}</td>
                <td className="px-6 py-4 text-sm text-foreground">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">₹{order.total}</td>
                <td className="px-6 py-4 text-sm">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border-none cursor-pointer ${statusColors[order.status]}`}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
