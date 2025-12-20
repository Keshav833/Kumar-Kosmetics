import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Heart } from "lucide-react"
import ProductQuickView from "@/components/product/product-quick-view"
import { useWishlistStore } from "@/store/useWishlistStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useCartStore } from "@/store/useCartStore"
import toast from "react-hot-toast"

export default function ProductGrid({ viewType, filters, products = [] }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const { authUser, openAuthModal } = useAuthStore()
  const { addToCart } = useCartStore()
  const navigate = useNavigate()

  const handleBuyNow = async (e, product) => {
    e.preventDefault()
    if (!authUser) {
      openAuthModal({ type: "login" })
      return
    }
    await addToCart(product._id || product.id, 1)
    navigate("/cart")
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    if (!authUser) {
      openAuthModal({ type: "login" })
      return
    }
    addToCart(product._id || product.id, 1)
  }

  const handleWishlistToggle = (e, productId) => {
    e.preventDefault() // Prevent navigation
    if (!authUser) {
      openAuthModal({ type: "wishlist" })
      return
    }
    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  const allProducts = products;

  // Filter products based on active filters
  const filteredProducts = allProducts.filter((product) => {
    const productSkinTypes = product.skinType || [];
    const productConcerns = product.skinConcerns || product.concerns || [];
    const productPrice = product.price || 0;

    if (filters.skinType.length > 0 && !filters.skinType.some((type) => productSkinTypes.includes(type))) {
      return false
    }
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false
    }
    if (productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1]) {
      return false
    }
    if (filters.concern.length > 0 && !filters.concern.some((concern) => productConcerns.includes(concern))) {
      return false
    }
    return true
  })

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
          <Heart className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
        <p className="text-gray-500 max-w-sm">
          We couldn't find any products matching your filters. Try adjusting your search or filter criteria.
        </p>
      </div>
    )
  }

  if (viewType === "grid") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product._id || product.id} to={`/products/${product._id || product.id}`}>
              <motion.div 
                layoutId={`product-card-${product._id || product.id}`}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 bg-white overflow-hidden flex items-center justify-center p-4">
                  <motion.img
                    layoutId={`product-image-${product._id || product.id}`}
                    src={product.images?.[0] || product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                  <button 
                    onClick={(e) => handleWishlistToggle(e, product._id || product.id)}
                    className={`absolute top-3 right-3 rounded-full p-2 transition-colors shadow-sm ${isInWishlist(product._id || product.id) ? "bg-primary/10" : "bg-white hover:bg-muted"}`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product._id || product.id) ? "fill-primary text-primary" : "text-primary"}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                  <h3 className="text-sm font-medium text-foreground mb-2 truncate">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-primary">★ {product.rating ? product.rating.toFixed(1) : "New"}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews || 0})</span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1 mb-3 flex-wrap">
                    {(product.allergyLabels || product.tags || []).slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">₹{product.price}</span>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {selectedProduct && <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      </>
    )
  }

  // List view
  return (
    <>
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <Link key={product._id || product.id} to={`/products/${product._id || product.id}`}>
            <div className="bg-white rounded-2xl p-4 my-4 flex  gap-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100">
                <img
                  src={product.images?.[0] || product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                  <h3 className="font-medium text-foreground mb-2 truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{(product.ingredients || []).join(", ")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary">
                    ★ {product.rating ? product.rating.toFixed(1) : "New"} ({product.reviews || 0})
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button 
                  onClick={(e) => handleWishlistToggle(e, product._id || product.id)}
                  className={`p-2 rounded-lg ${isInWishlist(product._id || product.id) ? "bg-primary/10" : "hover:bg-muted"}`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product._id || product.id) ? "fill-primary text-primary" : "text-primary"}`} />
                </button>
                <div className="text-right">
                  <p className="font-semibold text-foreground mb-2">₹{product.price} </p>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {selectedProduct && <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  )
}
