export default function CustomersSection() {
  const customers = [
    { id: 1, name: "Priya Sharma", email: "priya@example.com", orders: 5, totalSpent: 15000 },
    { id: 2, name: "Aisha Patel", email: "aisha@example.com", orders: 3, totalSpent: 8500 },
    { id: 3, name: "Neha Gupta", email: "neha@example.com", orders: 8, totalSpent: 24000 },
  ]

  return (
    <div className="p-8">
      <h2 className="text-3xl font-light text-foreground mb-8">
        <span className="font-semibold">Customers</span>
      </h2>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Orders</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{customer.email}</td>
                <td className="px-6 py-4 text-sm text-foreground">{customer.orders}</td>
                <td className="px-6 py-4 text-sm font-semibold text-primary">₹{customer.totalSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
