import { Link, useNavigate } from "react-router-dom"
import { ShoppingBag, Heart, User, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "../../store/useAuthStore"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { authUser, openAuthModal, logout } = useAuthStore()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/KKLogo.png" alt="Kumar Kosmetics Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-semibold text-foreground">Kumar Kosmetics</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/products" className="text-sm text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/skin-analyzer" className="text-sm text-foreground hover:text-primary transition-colors">
            Skin Analyzer
          </Link>
          <Link to="/about" className="text-sm text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Heart className="w-5 h-5 text-foreground" />
          </Link>
          <Link to="/cart" className="p-2 hover:bg-muted rounded-lg transition-colors relative">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          {authUser ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors">
                <User className="w-5 h-5 text-foreground" />
                <span className="hidden md:block text-sm font-medium text-foreground">{authUser.name}</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground truncate">{authUser.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{authUser.email}</p>
                </div>
                
                <Link to="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                  My Profile
                </Link>
                <Link to="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                  My Orders
                </Link>

                {authUser.role === "admin" && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">
                    Admin Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => openAuthModal()} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </button>
          )}
        </div>
      </div>

    </header>
  )
}
