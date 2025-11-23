import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import ProductQuickView from "@/components/product/product-quick-view"

export default function ProductGrid({ viewType, filters }) {
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
      image: "/placeholder.svg?key=vcx1l&width=400&height=400",
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
      image: "/placeholder.svg?key=wqp9m&width=400&height=400",
      category: "Skincare",
      skinType: ["Oily"],
      concerns: ["Acne", "Dark Circles"],
      ingredients: ["Salicylic Acid", "Tea Tree", "Zinc"],
      tags: ["Sulfate-free", "Cruelty-free"],
    },
    {
      id: 7,
      name: "Eye Contour Cream",
      price: 1999,
      rating: 4.7,
      reviews: 95,
      image: "/placeholder.svg?key=rvg2h&width=400&height=400",
      category: "Creams",
      skinType: ["All"],
      concerns: ["Dark Circles", "Wrinkles"],
      ingredients: ["Caffeine", "Peptides", "Hyaluronic Acid"],
      tags: ["Fragrance-free", "Dermatologist tested"],
    },
    {
      id: 8,
      name: "Hydrating Face Mask",
      price: 899,
      rating: 4.8,
      reviews: 312,
      image: "/placeholder.svg?key=tgk4p&width=400&height=400",
      category: "Masks",
      skinType: ["Dry", "Sensitive"],
      concerns: ["Dryness"],
      ingredients: ["Honey", "Aloe Vera", "Glycerin"],
      tags: ["Paraben-free", "Vegan"],
    },
    {
      id: 9,
      name: "Premium Moisturizer",
      price: 3499,
      rating: 4.9,
      reviews: 267,
      image: "/placeholder.svg?key=xnm2l&width=400&height=400",
      category: "Creams",
      skinType: ["Dry", "Sensitive", "Normal"],
      concerns: ["Dryness", "Wrinkles"],
      ingredients: ["Shea Butter", "Ceramides", "Vitamin E"],
      tags: ["Paraben-free", "Cruelty-free"],
    },
    {
      id: 10,
      name: "Exfoliating Scrub",
      price: 1299,
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?key=klm9b&width=400&height=400",
      category: "Skincare",
      skinType: ["Oily", "Combination"],
      concerns: ["Dullness", "Acne"],
      ingredients: ["Sugar Crystals", "Mint", "Green Tea"],
      tags: ["Sulfate-free", "Natural"],
    },
    {
      id: 11,
      name: "Radiance Booster",
      price: 2199,
      rating: 4.7,
      reviews: 198,
      image: "/placeholder.svg?key=pqw3r&width=400&height=400",
      category: "Serums",
      skinType: ["All"],
      concerns: ["Dullness", "Pigmentation"],
      ingredients: ["Niacinamide", "Saffron", "Rose Water"],
      tags: ["Paraben-free", "Vegan"],
    },
    {
      id: 12,
      name: "Ultra Repair Balm",
      price: 1799,
      rating: 4.8,
      reviews: 224,
      image: "/placeholder.svg?key=stu5v&width=400&height=400",
      category: "Skincare",
      skinType: ["Dry", "Sensitive"],
      concerns: ["Dryness"],
      ingredients: ["Beeswax", "Calendula", "Vitamin A"],
      tags: ["Fragrance-free", "Natural"],
    },
  ]

  // Filter products based on active filters
  const filteredProducts = allProducts.filter((product) => {
    if (filters.skinType.length > 0 && !filters.skinType.some((type) => product.skinType.includes(type))) {
      return false
    }
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }
    if (filters.concern.length > 0 && !filters.concern.some((concern) => product.concerns.includes(concern))) {
      return false
    }
    return true
  })

  if (viewType === "grid") {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                {/* Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-muted transition-colors">
                    <Heart className="w-5 h-5 text-primary" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                  <h3 className="text-sm font-medium text-foreground mb-2">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-primary">★ {product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1 mb-3 flex-wrap">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">₹{product.price}</span>
                    <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
                      Add to Cart
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

  // List view
  return (
    <>
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="bg-white rounded-2xl p-4 flex gap-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-primary font-medium mb-1">{product.category}</p>
                  <h3 className="font-medium text-foreground mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.ingredients.join(", ")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary">
                    ★ {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button className="p-2 hover:bg-muted rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                </button>
                <div className="text-right">
                  <p className="font-semibold text-foreground mb-2">₹{product.price}</p>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
                    Add to Cart
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
