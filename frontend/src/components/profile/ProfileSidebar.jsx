import { Link } from "react-router-dom"
import { Package, MapPin, CreditCard, User, LogOut, Store } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuthStore()

  const menuItems = [
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Saved Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "account", label: "Account Details", icon: User },
  ]

  return (
    <aside className="w-64 border-r border-slate-800 flex flex-col h-full shadow-2xl sticky top-0 left-0 z-30 relative overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/Footer.png" alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-900/90 backdrop-blur-[1px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full bg-transparent">
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
               {/* Logo Container */}
               <div className="group-hover:scale-105 transition-transform duration-300">
                 <img src="/darkKumarKosmetics.png" alt="Kumar Kosmetics" className="h-10 w-auto object-contain" />
               </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
          <div>
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">My Account</p>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isActive 
                        ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/10" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                    <span>{item.label}</span>
                    
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
                  </button>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-sm flex gap-2">
          <button 
            onClick={logout}
            className="flex-1 flex items-center justify-center gap-2 px-2 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span className="truncate">Log Out</span>
          </button>
          
          <Link to="/" className="flex-1 flex items-center justify-center gap-2 px-2 py-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all text-sm border border-white/5 hover:border-white/20">
            <Store className="w-[18px] h-[18px]" />
            <span className="truncate">Shop</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default ProfileSidebar
