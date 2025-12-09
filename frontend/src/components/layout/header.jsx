import { Link, useNavigate, useLocation } from "react-router-dom"
import { ShoppingBag, Heart, User, LogOut, Search, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useAuthStore } from "../../store/useAuthStore"
import { useCartStore } from "../../store/useCartStore"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const { authUser, openAuthModal, logout } = useAuthStore()
  const { cart, getCart } = useCartStore()
  const navigate = useNavigate()
  const location = useLocation()
  
  const isHome = location.pathname === "/"

  useEffect(() => {
    if (authUser) {
      getCart()
    }
  }, [authUser, getCart])
  
  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const heroHeight = window.innerHeight
      const threshold = heroHeight * 0.1

      // Background Logic
      if (currentScrollY > threshold) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Hide/Show Logic
      if (currentScrollY > lastScrollY && currentScrollY > threshold && !isSearchOpen) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      lastScrollY = currentScrollY
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isSearchOpen])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchValue.trim())}`)
      setIsSearchOpen(false)
      setSearchValue("")
    }
  }

  const isTransparentNav = location.pathname === "/" || location.pathname === "/products"
  
  const textColorClass = "text-foreground hover:text-primary"
  const iconColorClass = "text-foreground"

  const cartItemCount = cart?.items?.length || 0

  return (
    <>
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled || !isTransparentNav || isSearchOpen
          ? "bg-white/80 backdrop-blur-md shadow-md border-b border-border" 
          : "bg-transparent backdrop-blur-none shadow-none border-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">
        
        {/* Search Overlay */}
        <div className={`absolute inset-0 bg-white/95 backdrop-blur-xl z-50 flex items-center justify-center px-4 transition-all duration-500 ease-out ${isSearchOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4 pointer-events-none"}`}
            style={{ pointerEvents: isSearchOpen ? 'auto' : 'none' }}>
           <form onSubmit={handleSearchSubmit} className={"flex items-center gap-4 transition-all duration-1000 ease-in-out transform origin-center " + (isSearchOpen ? "w-full max-w-7xl opacity-100 scale-100" : "w-[60%] opacity-80 scale-95")}>
              <Search className="w-5 h-5 text-gray-600" />
              <input 
                ref={searchInputRef}
                autoFocus={isSearchOpen}
                type="text" 
                placeholder="Search..." 
                className="flex-1 bg-transparent border-b border-gray-100 focus:border-primary/50 outline-none text-xl font-light text-foreground placeholder-gray-300 py-2 transition-all"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="button" onClick={() => { setIsSearchOpen(false); setSearchValue(""); }} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400 hover:text-foreground transition-colors" />
              </button>
           </form>
        </div>

        {/* Logo */}
        <Link to="/" className={`flex items-center gap-2 transition-opacity duration-300 ${isSearchOpen ? "opacity-0" : "opacity-100"}`}>
          <img 
            src="/kumarKosmetics.png" 
            alt="Kumar Kosmetics" 
            className="h-12 w-auto object-contain" 
          />
        </Link>
        
        {/* Navigation - Desktop */}
        <nav className={`hidden md:flex items-center gap-8 transition-opacity duration-300 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <Link to="/products" className={`text-sm transition-colors font-medium ${textColorClass}`}>
            Products
          </Link>
          <Link to="/skin-analyzer" className={`text-sm transition-colors font-medium ${textColorClass}`}>
            Skin Analyzer
          </Link>
          <Link to="/about" className={`text-sm transition-colors font-medium ${textColorClass}`}>
            About
          </Link>
          <Link to="/contact" className={`text-sm transition-colors font-medium ${textColorClass}`}>
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className={`flex items-center gap-4 transition-opacity duration-300 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-lg transition-colors hover:bg-muted">
            <Search className={`w-5 h-5 ${iconColorClass}`} />
          </button>
          
          <Link to="/wishlist" className="p-2 rounded-lg transition-colors hover:bg-muted">
            <Heart className={`w-5 h-5 ${iconColorClass}`} />
          </Link>
          <Link to="/cart" className="p-2 rounded-lg transition-colors relative hover:bg-muted">
            <ShoppingBag className={`w-5 h-5 ${iconColorClass}`} />
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          {authUser ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 rounded-full transition-colors border border-transparent  hover:bg-muted hover:border-border">
                {authUser.avatar ? (
                  <img src={authUser.avatar} alt={authUser.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                ) : (
                  <div className="p-1">
                    <User className={`w-5 h-5 ${iconColorClass}`} />
                  </div>
                )}
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
            <Link to="/login" className="p-2 rounded-lg transition-colors hover:bg-muted">
              <User className={`w-5 h-5 ${iconColorClass}`} />
            </Link>
          )}
        </div>
      </div>
    </header>
    {!isTransparentNav && <div className="h-20" />}
    </>
  )
}
