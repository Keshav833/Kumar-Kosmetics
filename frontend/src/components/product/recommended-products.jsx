"use client"

import { ArrowLeft, Heart, Eye } from "lucide-react"
import { useState } from "react"
import ProductQuickView from "@/components/product/product-quick-view"

export default function RecommendedProducts({ analysis, onReset }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const allProducts = [
    {
      id: 1,
      name: "Hydrating Essence Serum",
      price: 2499,
      rating: 4.8,
      reviews: 128,
      image: "/hydrating-essence-serum-cosmetics.jpg",
      category: "Serums",
      skinType: ["Dry", "Sensitive"],
      concerns: ["Dryness", "Dullness"],
      ingredients: ["Hyaluronic Acid", "Vitamin E", "Aloe Vera"],
      tags: ["Paraben-free", "Cruelty-free"],
    },
    {
      id: 2,
      name: "Gentle Cleansing Balm",
      price: 1899,
      rating: 4.9,
      reviews: 256,
      image: "/cleansing-balm-skincare-product.jpg",
      category: "Skincare",
      skinType: ["Oily", "Combination", "Sensitive"],
      concerns: ["Acne", "Dullness"],
      ingredients: ["Coconut Oil", "Jojoba", "Chamomile"],
      tags: ["Sulfate-free", "Cruelty-free"],
    },
    {
      id: 3,
      name: "Luminous Day Cream",
      price: 3299,
      rating: 4.7,
      reviews: 89,
      image: "/day-cream-luminous-skincare.jpg",
      category: "Creams",
      skinType: ["Dry", "Normal"],
      concerns: ["Dryness", "Dullness"],
      ingredients: ["Saffron", "Gold Leaf", "Rose Water"],
      tags: ["Paraben-free", "SPF 30"],
    },
    {
      id: 4,
      name: "Nourishing Night Mask",
      price: 2699,
      rating: 4.6,
      reviews: 142,
      image: "/night-mask-skincare-product.jpg",
      category: "Masks",
      skinType: ["Dry", "Sensitive", "Normal"],
      concerns: ["Wrinkles", "Dryness"],
      ingredients: ["Hyaluronic Acid", "Retinol", "Peptides"],
      tags: ["Fragrance-free", "Cruelty-free"],
    },
    {
      id: 5,
      name: "Brightening Vitamin C",
      price: 2899,
      rating: 4.8,
      reviews: 203,
      image: "/placeholder.svg?key=vcx1l",
      category: "Serums",
      skinType: ["Oily", "Combination"],
      concerns: ["Pigmentation", "Dullness"],
      ingredients: ["Vitamin C", "Ferulic Acid", "Turmeric"],
      tags: ["Paraben-free", "Vegan"],
    },
    {
      id: 6,
      name: "Anti-Acne Treatment",
      price: 1599,
      rating: 4.5,
      reviews: 178,
      image: "/placeholder.svg?key=wqp9m",
      category: "Skincare",
      skinType: ["Oily"],
      concerns: ["Acne", "Dark Circles"],
      ingredients: ["Salicylic Acid", "Tea Tree", "Zinc"],
      tags: ["Sulfate-free", "Cruelty-free"],
    },
  ]

  // Filter products based on analysis
  const recommendedProducts = allProducts.filter((product) => {
    const isSkinTypeMatch = product.skinType.includes(analysis.skinType) || product.skinType.includes("All")
    const hasConcernMatch =
      analysis.concerns.length === 0 || product.concerns.some((c) => analysis.concerns.includes(c))
    const noAllergyConflict = !product.tags.some((tag) => analysis.allergies.includes(tag))
    return isSkinTypeMatch && hasConcernMatch && noAllergyConflict
  })

  const routine = [
    { step: "Cleanse", product: "Gentle Cleansing Balm", id: 2 },
    { step: "Treat", product: "Hydrating Essence Serum", id: 1 },
    { step: "Protect", product: "Luminous Day Cream", id: 3 },
    { step: "Nourish", product: "Nourishing Night Mask", id: 4 },
  ]

  return (
    <>
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

        {/* Your Routine */}
        <div className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Your Daily Routine</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {routine.map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 text-center">
                <div className="text-4xl font-light text-primary mb-2">{idx + 1}</div>
                <h3 className="font-semibold text-foreground mb-1">{item.step}</h3>
                <p className="text-sm text-muted-foreground">{item.product}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Products */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            Recommended for You ({recommendedProducts.length})
          </h2>

          {recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-muted">
                      <Heart className="w-5 h-5 text-primary" />
                    </button>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="absolute bottom-3 right-3 bg-primary text-primary-foreground rounded-full p-2 hover:opacity-90"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                    <h3 className="text-sm font-medium text-foreground mb-2">{product.name}</h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-primary">★ {product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">₹{product.price}</span>
                      <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-medium hover:opacity-90">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">No products match your preferences. Try adjusting your filters.</p>
              <button
                onClick={onReset}
                className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  )
}
