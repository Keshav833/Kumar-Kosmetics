import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Users, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  DollarSign,
  Eye,
  CreditCard,
  Clock
} from "lucide-react"
import { 
  LineChart, 
  AreaChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area
} from "recharts"
import { format, subDays, isAfter, parseISO, isToday } from "date-fns"

export default function DashboardOverview({ products = [], orders = [], customers = [], totalProductsCount }) {
  const [dateRange, setDateRange] = useState("7d")

  // --- Calculations ---
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
    
    // Fallback revenue from mock logic if needed
    const displayRevenue = totalRevenue > 0 ? totalRevenue : products.reduce((sum, p) => sum + p.price * (50 - (p.stock || 0)), 0)

    const totalOrders = orders.length
    const totalCustomers = customers.length
    const totalProducts = totalProductsCount ?? products.length
    const aov = totalOrders > 0 ? displayRevenue / totalOrders : 0

    return [
      {
        label: "Total Revenue",
        value: `₹${displayRevenue.toLocaleString()}`,
        change: "+12.5%",
        isPositive: true,
        icon: DollarSign,
        color: "text-emerald-500",
      },
      {
        label: "Total Orders",
        value: totalOrders.toString(),
        change: "+8.2%",
        isPositive: true,
        icon: ShoppingBag,
        color: "text-blue-500",
      },
      {
        label: "Total Customers",
        value: totalCustomers.toString(),
        change: "+5.4%",
        isPositive: true,
        icon: Users,
        color: "text-purple-500",
      },
      {
        label: "Total Products",
        value: totalProducts.toString(),
        change: "0%",
        isPositive: true,
        icon: Package,
        color: "text-amber-500",
      },
      {
        label: "Avg. Order Value",
        value: `₹${Math.round(aov).toLocaleString()}`,
        change: "-2.1%",
        isPositive: false,
        icon: CreditCard,
        color: "text-rose-500",
      },
    ]
  }, [products, orders, customers])

  // --- Real-Time Sales Chart Data ---
  const salesData = useMemo(() => {
    const days = dateRange === "7d" ? 7 : 30
    const cutoffDate = subDays(new Date(), days)
    
    const chartData = []
    for (let i = days - 1; i >= 0; i--) {
        const d = subDays(new Date(), i)
        chartData.push({
            date: format(d, "yyyy-MM-dd"),
            name: dateRange === "7d" ? format(d, "EEE") : format(d, "dd/MM"),
            revenue: 0
        })
    }

    if (orders.length > 0) {
        orders.forEach(order => {
            if (!order.createdAt) return
            const orderDate = parseISO(order.createdAt)
            if (isAfter(orderDate, cutoffDate)) {
                const dateKey = format(orderDate, "yyyy-MM-dd")
                const dayEntry = chartData.find(d => d.date === dateKey)
                if (dayEntry) {
                    dayEntry.revenue += (order.totalAmount || 0)
                }
            }
        })
        return chartData
    }

    // Fallback Mock Data
    return [
      { name: "Mon", revenue: 4000 },
      { name: "Tue", revenue: 3000 },
      { name: "Wed", revenue: 2000 },
      { name: "Thu", revenue: 2780 },
      { name: "Fri", revenue: 1890 },
      { name: "Sat", revenue: 2390 },
      { name: "Sun", revenue: 3490 },
    ]
  }, [orders, dateRange])

  // Skin Intelligence Data (Real-Time)
  const skinTypeData = useMemo(() => {
    if (!customers || customers.length === 0) return []

    const counts = { Oily: 0, Dry: 0, Combination: 0, Sensitive: 0, Normal: 0 }
    let hasData = false

    customers.forEach(c => {
        if (c.skinProfile && c.skinProfile.skinType) {
            const type = c.skinProfile.skinType
            if (counts[type] !== undefined) {
                counts[type]++
                hasData = true
            }
        }
    })

    if (!hasData) {
         // Fallback if no data yet (Single Gray Slice)
         return [
            { name: "No Data", value: 100, color: "#f1f5f9" }, // slate-100
         ]
    }

    return [
        { name: "Oily", value: counts.Oily, color: "#10b981" },
        { name: "Dry", value: counts.Dry, color: "#3b82f6" },
        { name: "Combination", value: counts.Combination, color: "#8b5cf6" },
        { name: "Sensitive", value: counts.Sensitive, color: "#f43f5e" },
    ].filter(item => item.value > 0)
  }, [customers])

  // Inventory Health
  const separateStock = useMemo(() => {
    const lowStock = products.filter(p => (p.stock || 0) < 10 && (p.stock || 0) > 0).length
    const outOfStock = products.filter(p => (p.stock || 0) === 0).length
    return { lowStock, outOfStock }
  }, [products])

  // Top Products
  const topProducts = useMemo(() => {
    if (orders.length > 0) {
        const productSales = {}
        orders.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                   const pid = item.product || item._id || item.name 
                   
                   // Find current product details to get real-time views
                   const currentProduct = products.find(p => p._id === pid)

                   // Skip if product is deleted (not found in current products list)
                   if (!currentProduct) return

                   if (!productSales[pid]) {
                       productSales[pid] = {
                           name: currentProduct.name || item.name,
                           sales: 0,
                           revenue: 0,
                           image: currentProduct.images?.[0] || item.image,
                           price: currentProduct.price || item.price,
                           category: currentProduct.category || item.category,
                           views: currentProduct.views || 0 // Use real views
                       }
                   }
                   productSales[pid].sales += (item.quantity || 1)
                   productSales[pid].revenue += (item.price * (item.quantity || 1))
                   // Ensure views are updated
                   if(currentProduct.views) productSales[pid].views = currentProduct.views
                })
            }
        })
        return Object.values(productSales).sort((a, b) => b.sales - a.sales).slice(0, 5)
    }
    return [...products].sort((a, b) => b.price - a.price).slice(0, 3).map(p => ({
        ...p,
        sales: 0,
        views: p.views || 0
    }))
  }, [products, orders])

  // Recent Activity
  const recentActivity = useMemo(() => {
      const activities = []
      orders.forEach(order => {
          activities.push({
              type: 'order',
              title: `Order #${order._id ? order._id.slice(-4) : '---'}`,
              desc: `₹${order.totalAmount}`,
              time: order.createdAt,
              color: "bg-emerald-500",
              rawTime: new Date(order.createdAt) 
          })
      })
      customers.forEach(user => {
        activities.push({
            type: 'user',
            title: "New Customer",
            desc: `${user.name}`,
            time: user.createdAt,
            color: "bg-blue-500",
            rawTime: new Date(user.createdAt)
        })
      })
      return activities
        .sort((a, b) => b.rawTime - a.rawTime)
        .slice(0, 5)
        .map(act => ({
            ...act,
            time: isToday(act.rawTime) ? `Today, ${format(act.rawTime, "HH:mm")}` : format(act.rawTime, "MMM d, HH:mm") 
        }))
  }, [orders, customers])

  return (
    <div className="p-6 space-y-6 bg-muted/40 min-h-full">
      
      {/* 1. Compact Summary Cards - Smaller Height & Simple */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className="bg-card px-4 py-3 rounded-xl shadow-sm border border-border flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <h3 className="text-lg font-bold text-card-foreground">{stat.value}</h3>
                 <span className={`text-[10px] font-medium ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                 </span>
              </div>
            </div>
            <div className={`p-1.5 rounded-full bg-muted/50 ${stat.color}`}>
               <stat.icon size={16} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. Sales Overview Chart */}
        {/* 2. Sales Overview Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Sales Overview</h3>
              <p className="text-slate-400 text-sm mt-1">Revenue performance over time</p>
            </div>
            <div className="relative">
                <select 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg py-2 pl-4 pr-10 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none cursor-pointer font-medium"
                >
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
                 <ArrowDownRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  width={80}
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                  labelStyle={{ color: '#64748b', marginBottom: '0.5rem', fontSize: '12px' }}
                  cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  formatter={(value) => [`₹${value}`, "Revenue"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fill="url(#colorRevenue)" 
                  fillOpacity={1}
                  dot={{ r: 4, fill: "#fff", strokeWidth: 2, stroke: "#6366f1" }} 
                  activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff", strokeWidth: 2 }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 3. & 5. Right Column Widgets */}
        <div className="space-y-6">
          
          {/* Inventory Health */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card p-5 rounded-xl shadow-sm border border-border"
          >
            <h3 className="text-base font-bold text-card-foreground mb-4">Inventory Health</h3>
            <div className="space-y-3">
              {separateStock.outOfStock > 0 && (
                <div className="flex items-center justify-between p-2.5 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="flex items-center gap-2">
                    <div className="text-red-500"><AlertCircle size={16} /></div>
                    <span className="text-sm font-medium text-red-700 dark:text-red-400">Out of Stock</span>
                    </div>
                    <span className="text-base font-bold text-red-700 dark:text-red-400">{separateStock.outOfStock}</span>
                </div>
              )}
              {separateStock.lowStock > 0 && (
                <div className="flex items-center justify-between p-2.5 bg-amber-500/10 rounded-lg border border-amber-500/20">
                    <div className="flex items-center gap-2">
                    <div className="text-amber-500"><Activity size={16} /></div>
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Low Stock</span>
                    </div>
                    <span className="text-base font-bold text-amber-700 dark:text-amber-400">{separateStock.lowStock}</span>
                </div>
              )}
              {separateStock.outOfStock === 0 && separateStock.lowStock === 0 && (
                  <div className="p-4 text-center text-muted-foreground bg-muted/30 rounded-lg border border-dashed border-border">
                      <p className="text-sm">Inventory is healthy</p>
                  </div>
              )}
            </div>
          </motion.div>

          {/* Skin Intelligence Snippet */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="bg-card p-5 rounded-xl shadow-sm border border-border"
          >
            <h3 className="text-base font-bold text-card-foreground mb-4">Skin Intelligence</h3>
            <div className="h-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skinTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {skinTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-muted-foreground">Top Type</span>
                <span className="text-lg font-bold text-card-foreground">
                    {(skinTypeData.length === 0 || (skinTypeData.length === 1 && skinTypeData[0].name === "No Data")) 
                        ? "---" 
                        : skinTypeData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name}
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-2">
              {(skinTypeData.length === 0 || (skinTypeData.length === 1 && skinTypeData[0].name === "No Data")) ? (
                  <span className="text-xs text-muted-foreground mt-2">No analysis data yet</span>
              ) : (
                  skinTypeData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] text-muted-foreground">{item.name}</span>
                    </div>
                  ))
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 4. Product Performance */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5 }}
           className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Top Performing Products</h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs text-slate-400 uppercase tracking-wider text-left border-b border-slate-100">
                <tr>
                  <th className="pb-3 pl-2 font-medium">Product</th>
                  <th className="pb-3 text-right font-medium">Price</th>
                  <th className="pb-3 text-right font-medium">Sales</th>
                  <th className="pb-3 text-right font-medium">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topProducts.map((product, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden shadow-sm border border-slate-100">
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : product.image ? (
                             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <Package size={20} className="text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm truncate max-w-[180px]">{product.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{product.category || 'Beauty'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right text-sm font-semibold text-slate-700">₹{product.price}</td>
                    <td className="py-4 text-right text-sm text-slate-600 font-medium">{product.sales !== undefined ? product.sales : '0'}</td>
                    <td className="py-4 text-right">
                       <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full font-medium">
                         <Eye size={12} /> {product.views || 0}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 6. & 7. Alerts & Logs */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6 }}
           className="bg-card p-6 rounded-xl shadow-sm border border-border"
        >
          <h3 className="text-lg font-bold text-card-foreground mb-6">Recent Alerts</h3>
          <div className="space-y-0 relative">
             <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-muted"></div>
             {recentActivity.length > 0 ? recentActivity.map((alert, idx) => (
                <div key={idx} className="relative pl-8 pb-6 last:pb-0 group">
                   <div className={`absolute left-0 w-5 h-5 rounded-full border-4 border-card ${alert.color} shadow-sm z-10`} />
                   <div>
                      <p className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.desc}</p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                        <Clock size={10} />
                        {alert.time}
                      </div>
                   </div>
                </div>
             )) : (
                 <p className="text-sm text-muted-foreground pl-4">No recent activity</p>
             )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
