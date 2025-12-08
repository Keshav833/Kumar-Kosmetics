import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Heart, Share2, Loader, ChevronLeft, ChevronRight } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { useCartStore } from "@/store/useCartStore"
import { useWishlistStore } from "@/store/useWishlistStore"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast"
import ProductReviews from "@/components/product/product-reviews"

export default function ProductDetail() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")
  const { authUser, openAuthModal } = useAuthStore()
  const { addToCart } = useCartStore()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredImage, setHoveredImage] = useState(null)

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/products/${id}`)
      setProduct(res.data)
      if (res.data.variants && res.data.variants.length > 0 && !selectedVariant) {
          setSelectedVariant(res.data.variants[0].name)
      }
      // Reset clicked image when product changes (and effect will handle variant change if we add it)
      // Reset slider to 0 when product changes
      setCurrentImageIndex(0)
      setHoveredImage(null)
    } catch (error) {
      console.error("Error fetching product:", error)
      toast.error("Failed to load product details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  // Reset clicked image when selected variant changes to ensure variant image takes precedence default
  // Handle auto-slider
  useEffect(() => {
    if (!product?.images?.length || isHovered) return

    const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % product.images.length)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [product, isHovered])

  // Optional: Reset/Update slider when variant changes if needed
  useEffect(() => {
      setCurrentImageIndex(0)
      setHoveredImage(null)
  }, [selectedVariant])

  const nextSlide = () => {
    if (!product?.images?.length) return
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevSlide = () => {
    if (!product?.images?.length) return
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleAddToCart = () => {
    if (!authUser) {
      openAuthModal({ type: "cart" })
      return
    }
    addToCart(product._id, quantity, selectedVariant)
  }

  const handleWishlistToggle = () => {
    if (!authUser) {
      openAuthModal({ type: "wishlist" })
      return
    }
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist(product._id)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Product not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="w-full max-w-md mx-auto mb-6">
              <div 
                className="w-full h-80 bg-white rounded-xl overflow-hidden flex items-center justify-center border border-gray-100 relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={
                      hoveredImage ||
                      product.images?.[currentImageIndex] ||
                      (selectedVariant 
                        ? product.variants.find(v => v.name === selectedVariant)?.image || "/placeholder.svg"
                        : "/placeholder.svg")
                  }
                  alt={product.name}
                  className="w-full h-full object-contain transition-opacity duration-500"
                />
                
                {product.images?.length > 1 && (
                    <>
                        <button 
                            onClick={(e) => { e.stopPropagation(); prevSlide() }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); nextSlide() }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.images?.map((img, idx) => (
                <div 
                    key={idx} 
                    className={`bg-white rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary h-24 flex items-center justify-center border border-gray-100 ${currentImageIndex === idx ? "ring-2 ring-primary" : ""}`}
                    onMouseEnter={() => setHoveredImage(img)}
                    onMouseLeave={() => setHoveredImage(null)}
                    onClick={() => setCurrentImageIndex(idx)}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-primary font-medium mb-2">{product.category}</p>
            <h1 className="text-3xl font-light text-foreground mb-2">
              <span className="font-semibold">{product.name}</span>
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl text-primary">★ {product.rating ? product.rating.toFixed(1) : "New"}</span>
              <span className="text-sm text-muted-foreground">({product.reviews || 0} reviews)</span>
            </div>

            {/* Price */}
            <p className="text-4xl font-semibold text-foreground mb-6">₹{product.price}</p>

            {/* Tags */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {(product.allergyLabels || []).map((tag) => (
                <span key={tag} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                    <p className="font-semibold text-foreground mb-2">Variants</p>
                    <div className="flex gap-2">
                        {product.variants.map((variant) => (
                            <button
                                key={variant._id || variant.name}
                                onClick={() => setSelectedVariant(variant.name)}
                                className={`px-4 py-2 rounded-lg border ${selectedVariant === variant.name ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted'}`}
                            >
                                {variant.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Skin Type & Concerns */}
            <div className="mb-8">
              <div className="mb-4">
                <p className="font-semibold text-foreground mb-2">Best for</p>
                <div className="flex gap-2 flex-wrap">
                  {(product.skinType || []).map((type) => (
                    <span key={type} className="text-sm bg-secondary/20 text-foreground px-3 py-1 rounded-lg">
                      {type} Skin
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Addresses</p>
                <div className="flex gap-2 flex-wrap">
                  {(product.skinConcerns || []).map((concern) => (
                    <span key={concern} className="text-sm bg-accent/20 text-foreground px-3 py-1 rounded-lg">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-foreground">Quantity</label>
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted">
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted">
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleWishlistToggle}
                  className={`p-3 border border-border rounded-lg hover:bg-muted transition-colors ${isInWishlist(product._id) ? "bg-primary/10 border-primary" : ""}`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product._id) ? "fill-primary text-primary" : "text-primary"}`} />
                </button>
                <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Share2 className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex gap-8 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-4 font-medium transition-colors ${activeTab === "details" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("ingredients")}
              className={`pb-4 font-medium transition-colors ${activeTab === "ingredients" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 font-medium transition-colors ${activeTab === "reviews" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              Reviews
            </button>
          </div>

          {activeTab === "details" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">How to Use</h3>
                <p className="text-muted-foreground leading-relaxed">{product.howToUse || "Apply as needed."}</p>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div>
              <h3 className="font-semibold text-foreground mb-4">Key Ingredients</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(product.ingredients || []).map((ing) => (
                  <div key={ing} className="bg-muted rounded-lg p-4">
                    <p className="font-medium text-foreground text-sm">{ing}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <ProductReviews 
              productId={product._id} 
              productRating={product.rating} 
              totalReviews={product.reviews} 
              onReviewAdded={fetchProduct}
            />
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
