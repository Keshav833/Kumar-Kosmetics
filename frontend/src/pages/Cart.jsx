import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
import { useCartStore } from "@/store/useCartStore"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CartItems from "@/components/cart/cart-items"
import CartSummary from "@/components/cart/cart-summary"
import { Loader } from "lucide-react"

export default function Cart() {
  const { authUser, openAuthModal } = useAuthStore()
  const { cart, getCart, updateQuantity, removeFromCart, loading } = useCartStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (authUser) {
        getCart()
    }
  }, [authUser, getCart])

  const handleUpdateQuantity = (id, quantity) => {
    updateQuantity(id, quantity)
  }

  const handleRemoveItem = (id) => {
    removeFromCart(id)
  }

  const handleCheckout = () => {
    if (!authUser) {
      openAuthModal({ type: "checkout" })
    } else {
      navigate("/checkout")
    }
  }

  if (loading && !cart) {
      return (
          <div className="min-h-screen bg-background flex items-center justify-center">
              <Loader className="w-10 h-10 animate-spin text-primary" />
          </div>
      )
  }

  const cartItems = cart?.items || []

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-b border-border">
        <h1 className="text-4xl font-light text-foreground mb-3">
          Shopping <span className="font-semibold">Cart</span>
        </h1>
        <p className="text-muted-foreground">{cartItems.length} items in cart</p>
      </section>

      {cartItems.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
            </div>
            <aside className="lg:col-span-1">
              <CartSummary items={cartItems} onCheckout={handleCheckout} />
            </aside>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Link
              to="/products"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
