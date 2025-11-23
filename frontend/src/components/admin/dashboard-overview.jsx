import { TrendingUp, Package, ShoppingBag, Users } from "lucide-react"

export default function DashboardOverview({ products }) {
  const totalRevenue = products.reduce((sum, p) => sum + p.price * (50 - p.stock), 0)
  const totalProducts = products.length

  const stats = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-primary/10 text-primary",
    },
    { label: "Total Products", value: totalProducts, icon: Package, color: "bg-secondary/10 text-secondary" },
    { label: "Total Orders", value: "0", icon: ShoppingBag, color: "bg-accent/10 text-accent" },
    { label: "Total Customers", value: "0", icon: Users, color: "bg-primary/10 text-primary" },
  ]

  const recentActivity = [{ action: "No activity yet", details: "Start by adding products", time: "Just now" }]

  return (
    <div className="p-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Sales Overview</h3>
          <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart placeholder - integrate with Recharts</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="pb-4 border-b border-border last:border-b-0">
                <p className="font-medium text-sm text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
