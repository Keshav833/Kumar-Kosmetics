import { Link } from "react-router-dom"
import { ShoppingBag, Heart, User, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full" />
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
          <button onClick={() => setWishlistOpen(true)} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Heart className="w-5 h-5 text-foreground" />
          </button>
          <Link to="/cart" className="p-2 hover:bg-muted rounded-lg transition-colors relative">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
          <Link to="/login" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <User className="w-5 h-5 text-foreground" />
          </Link>
        </div>
      </div>

      {wishlistOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setWishlistOpen(false)} />

          {/* Sidebar */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">My Wishlist</h2>
              <button
                onClick={() => setWishlistOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Heart className="w-16 h-16 text-muted-foreground" />
                <p className="text-center text-muted-foreground">Your wishlist is empty</p>
                <p className="text-center text-sm text-muted-foreground">Add your favorite products to see them here</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <Link
                to="/products"
                onClick={() => setWishlistOpen(false)}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
