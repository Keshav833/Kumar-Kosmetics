import { Link } from "react-router-dom"
import { LayoutDashboard, Package, ShoppingCart, Folder, Users, Mail } from "lucide-react"

const AdminSidebar = ({ currentSection, setCurrentSection }) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "categories", label: "Categories", icon: Folder },
    { id: "customers", label: "Customers", icon: Users },
    { id: "messages", label: "Messages", icon: Mail },
  ]

  return (
    <aside className="w-64 bg-white border-r border-border">
      {/* Logo */}
      <div className="px-6 py-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full" />
          <span className="text-lg font-semibold text-foreground">Kumar</span>
        </Link>
      </div>

      {/* Menu */}
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4 w-64">
        <button className="w-full px-4 py-3 text-foreground hover:bg-muted rounded-lg font-medium transition-colors text-sm">
          Logout
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar
