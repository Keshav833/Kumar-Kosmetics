import { Link, useNavigate, useLocation } from "react-router-dom"
import { ShoppingBag, Heart, User, LogOut, Search, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useAuthStore } from "../../store/useAuthStore"
import { useCartStore } from "../../store/useCartStore"
import PillNav from "../ui/PillNav"
import Dock from "../ui/Dock"

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

  const navItems = [
    { label: 'Products', href: '/products' },
    { label: 'Skin Analyzer', href: '/skin-analyzer' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const dockItems = [
    {
      icon: <Search className={`w-5 h-5 ${iconColorClass}`} />,
      label: 'Search',
      onClick: () => setIsSearchOpen(true),
    },
    {
      icon: <Heart className={`w-5 h-5 ${iconColorClass}`} />,
      label: 'Wishlist',
      onClick: () => navigate('/wishlist'),
    },
    {
      icon: (
        <div className="relative flex items-center justify-center">
          <ShoppingBag className={`w-5 h-5 ${iconColorClass}`} />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </div>
      ),
      label: 'Cart',
      onClick: () => navigate('/cart'),
    },
    {
      icon: authUser?.avatar ? (
        <img src={authUser.avatar} alt={authUser.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
      ) : (
        <User className={`w-5 h-5 ${iconColorClass}`} />
      ),
      label: authUser ? '' : 'Login', // Hide label if logged in, as dropdown shows info
      className: "group",
      onClick: () => {
        if (!authUser) {
           navigate('/login');
        } else {
           navigate('/profile');
        }
      },
      dropdown: authUser && (
        <div 
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 cursor-default text-left"
            onClick={(e) => e.stopPropagation()}
        >
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
              onClick={(e) => {
                  e.stopPropagation();
                  logout();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
        </div>
      )
    }
  ];

  const rightIcons = (
    <div className={`transition-opacity duration-300 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Dock 
            items={dockItems}
            panelHeight={40}
            baseItemSize={30}
            magnification={60}
            distance={100}
        />
        
        {/* Hidden User Menu for Admin/Logout access if needed, or we can add them to Dock? 
            For now, let's keep it simple as per request. 
            If user needs dropdown, we might need a custom DockItem or handle it differently.
            The user asked for "use this effect", implying the visual style.
        */}
    </div>
  );

  return (
    <>
    <header 
      className={`fixed top-0 w-full h-20 z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm pointer-events-auto" : "bg-transparent pointer-events-none"}`}
    >
        {/* Search Overlay */}
        <div className={`absolute inset-0 bg-white/35 backdrop-blur-2xl z-50 flex items-center justify-center px-4 transition-all duration-500 ease-out pointer-events-auto ${isSearchOpen ? "opacity-100 visible translate-y-0 h-20" : "opacity-0 invisible -translate-y-4 h-0"}`}>
           <form onSubmit={handleSearchSubmit} className={"flex items-center gap-4 transition-all duration-1000 ease-in-out transform origin-center " + (isSearchOpen ? "w-full max-w-7xl opacity-100 scale-100" : "w-[60%] opacity-80 scale-95")}>
              <Search className="w-5 h-5 text-gray-600" />
              <input 
                ref={searchInputRef}
                autoFocus={isSearchOpen}
                type="text" 
                placeholder="Search..." 
                className="flex-1 bg-transparent border-b border-gray-100 focus:border-primary/50 outline-none text-xl font-light text-foreground placeholder-gray-300 py-2 transition-all"
                value={searchValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchValue(value);
                  if (location.pathname === "/products" && isSearchOpen) {
                     navigate(`/products?q=${encodeURIComponent(value.trim())}`, { replace: true });
                  }
                }}
              />
              <button type="button" onClick={() => { setIsSearchOpen(false); setSearchValue(""); }} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-400 hover:text-foreground transition-colors" />
              </button>
           </form>
        </div>

        <div className={`pointer-events-auto transition-opacity duration-300 ${isSearchOpen ? "opacity-0" : "opacity-100"}`}>
            <PillNav 
                logo="/kumarKosmetics.png"
                logoAlt="Kumar Kosmetics"
                items={navItems}
                activeHref={location.pathname}
                rightElement={rightIcons}
                baseColor="transparent" 
                pillColor="transparent"
                pillTextColor="#000"
                hoveredPillTextColor="#fff"
                hoverCircleColor="#000"
                initialLoadAnimation={false}
                className="!absolute !top-1/2 !-translate-y-1/2 !w-full"
            />
        </div>
    </header>
    {!isTransparentNav && <div className="h-20" />}
    </>
  )
}
