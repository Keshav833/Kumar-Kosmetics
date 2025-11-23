"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Heart, Share2 } from "lucide-react"
import { useState } from "react"

export default function ProductDetailsPage({ params }) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")

  const product = {
    id: params.id,
    name: "Hydrating Essence Serum",
    price: 2499,
    rating: 4.8,
    reviews: 128,
    images: ["/hydrating-essence-serum-cosmetics.jpg", "/placeholder.svg?key=psxh7", "/placeholder.svg?key=w2llu"],
    category: "Serums",
    skinType: ["Dry", "Sensitive"],
    concerns: ["Dryness", "Dullness"],
    ingredients: ["Hyaluronic Acid", "Vitamin E", "Aloe Vera", "Squalane", "Glycerin"],
    tags: ["Paraben-free", "Cruelty-free", "Vegan", "Fragrance-free"],
    description:
      "A lightweight yet powerful hydrating serum that penetrates deep into the skin to provide intense moisture and nourishment. Formulated with hyaluronic acid and vitamin E, this serum helps to lock in moisture and improve skin texture.",
    howToUse:
      "Apply 2-3 drops to clean, damp skin and gently pat in. Follow with your favorite moisturizer. Use morning and night for best results.",
    relatedProducts: [1, 2, 3, 4],
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="bg-muted rounded-2xl overflow-hidden mb-4 h-96">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((img, idx) => (
                <div key={idx} className="bg-muted rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-24 object-cover"
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
              <span className="text-xl text-primary">★ {product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <p className="text-4xl font-semibold text-foreground mb-6">₹{product.price}</p>

            {/* Tags */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Skin Type & Concerns */}
            <div className="mb-8">
              <div className="mb-4">
                <p className="font-semibold text-foreground mb-2">Best for</p>
                <div className="flex gap-2 flex-wrap">
                  {product.skinType.map((type) => (
                    <span key={type} className="text-sm bg-secondary/20 text-foreground px-3 py-1 rounded-lg">
                      {type} Skin
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">Addresses</p>
                <div className="flex gap-2 flex-wrap">
                  {product.concerns.map((concern) => (
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
                <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Add to Cart
                </button>
                <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Heart className="w-5 h-5 text-primary" />
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
                <p className="text-muted-foreground leading-relaxed">{product.howToUse}</p>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div>
              <h3 className="font-semibold text-foreground mb-4">Key Ingredients</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.ingredients.map((ing) => (
                  <div key={ing} className="bg-muted rounded-lg p-4">
                    <p className="font-medium text-foreground text-sm">{ing}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <p className="text-muted-foreground">Reviews coming soon...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
