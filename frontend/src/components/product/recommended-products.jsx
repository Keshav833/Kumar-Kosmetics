import { ArrowLeft, Check, AlertTriangle, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { useCartStore } from "@/store/useCartStore"
import { useAuthStore } from "@/store/useAuthStore"
import toast from "react-hot-toast"

export default function RecommendedProducts({ analysis, onReset }) {
  const { addToCart } = useCartStore()
  const { authUser, openAuthModal } = useAuthStore()

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    if (!authUser) {
      openAuthModal({ type: "login" })
      return
    }
    addToCart(product._id, 1)
    toast.success("Added to cart")
  }

  if (!analysis) return null

  const { profile, tips, recommendations } = analysis

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-3xl font-light text-foreground mb-2">
            Your <span className="font-semibold">Skin Profile</span>
          </h1>
          <p className="text-muted-foreground">
            Analysis for <span className="font-medium text-foreground">{profile.skinType}</span> skin 
            targeting {profile.concerns.join(", ")}.
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retake Analysis
        </button>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {tips.map((tip, idx) => (
          <div key={idx} className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{tip.detail}</p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Top Recommendations</h2>
        
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <div className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image & Match Score */}
                  <div className="relative h-64 bg-gray-50 p-6 flex items-center justify-center">
                    <img
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-green-100 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold text-green-700">{product.matchScore}% Match</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <p className="text-xs font-medium text-primary mb-1">{product.category}</p>
                      <h3 className="font-medium text-lg text-foreground mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-lg font-semibold text-foreground">₹{product.price}</p>
                    </div>

                    {/* Match Reasons */}
                    <div className="mb-6 flex-1">
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Why it works</p>
                      <div className="flex flex-wrap gap-2">
                        {product.matchReasons?.map((reason, i) => (
                          <span key={i} className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100">
                            <Check className="w-3 h-3" /> {reason}
                          </span>
                        ))}
                        {product.skinType?.includes(profile.skinType) && (
                           <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">
                            <Check className="w-3 h-3" /> Good for {profile.skinType}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-2xl">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No perfect matches found</h3>
            <p className="text-muted-foreground">Try adjusting your preferences to see more results.</p>
          </div>
        )}
      </div>
    </section>
  )
}
