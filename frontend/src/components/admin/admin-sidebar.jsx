import { Link } from "react-router-dom"
import { LayoutDashboard, Package, ShoppingCart, Folder, Users, Mail, Store } from "lucide-react"

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
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full shadow-2xl sticky top-0 left-0 z-30">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800/50">
        <Link to="/" className="flex items-center gap-3 group">
             {/* Logo Container */}
             <div className="p-1.5 bg-white rounded-lg group-hover:scale-105 transition-transform duration-300">
               <img src="/kumarKosmetics.png" alt="Kumar Kosmetics" className="h-8 w-auto object-contain" />
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-white text-sm tracking-wide">KUMAR</span>
               <span className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Panel</span>
             </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Main Menu</p>
        
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
              <span>{item.label}</span>
              
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-300" />}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <Link to="/" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg font-medium transition-all text-sm border border-slate-700/50 hover:border-slate-600">
          <Store className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>
      </div>
    </aside>
  )
}

export default AdminSidebar
