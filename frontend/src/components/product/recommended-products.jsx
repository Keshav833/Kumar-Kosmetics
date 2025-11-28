import { useState, useEffect } from "react"
import { ArrowLeft, Loader } from "lucide-react"
import ProductGrid from "@/components/product/product-grid"
import axiosInstance from "@/lib/axios"

export default function RecommendedProducts({ analysis, onReset }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products")
        setProducts(res.data.products || [])
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Filter products based on analysis
  const recommendedProducts = products.filter((product) => {
    // 1. Skin Type Match (Exact match or "All")
    const productSkinTypes = product.skinType || []
    const isSkinTypeMatch = productSkinTypes.includes(analysis.skinType) || productSkinTypes.includes("All")

    // 2. Concern Match (At least one concern matches)
    const productConcerns = product.skinConcerns || product.concerns || []
    const hasConcernMatch =
      analysis.concerns.length === 0 || productConcerns.some((c) => analysis.concerns.includes(c))

    // 3. Preferences (User wants these attributes, e.g. "Paraben-free")
    const productTags = product.allergyLabels || product.tags || []
    // If user selected preferences, product MUST have them (strict match)
    const matchesPreferences = analysis.allergies.every((pref) => productTags.includes(pref))

    return isSkinTypeMatch && hasConcernMatch && matchesPreferences
  })

  // Simple routine generation based on categories
  const routineSteps = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"]
  const routine = routineSteps.map(step => {
    const product = recommendedProducts.find(p => p.category === step || p.category?.includes(step))
    return product ? { step, product } : null
  }).filter(Boolean)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-foreground mb-2">
            Your <span className="font-semibold">Personalized Results</span>
          </h1>
          <p className="text-muted-foreground">
            {analysis.skinType} skin with{" "}
            {analysis.concerns.length > 0 ? analysis.concerns.join(", ") : "no specific concerns"}
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-primary hover:opacity-75 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Retake Quiz
        </button>
      </div>

      {/* Your Routine (Only show if we found products for a routine) */}
      {routine.length > 0 && (
        <div className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Your Daily Routine</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {routine.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className="text-4xl font-light text-primary mb-2">{idx + 1}</div>
                <h3 className="font-semibold text-foreground mb-1">{item.step}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.product.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Products */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-8">
          Recommended for You ({recommendedProducts.length})
        </h2>

        {recommendedProducts.length > 0 ? (
          <ProductGrid 
            viewType="grid" 
            products={recommendedProducts} 
            filters={{
              category: [],
              priceRange: [0, 100000], // Wide range to show all
              skinType: [],
              concern: []
            }} 
          />
        ) : (
          <div className="bg-muted rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">No products match your specific preferences perfectly.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your quiz answers to see more results.</p>
            <button
              onClick={onReset}
              className="mt-6 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
