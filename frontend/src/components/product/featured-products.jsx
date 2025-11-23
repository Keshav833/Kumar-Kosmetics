"use client"

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Hydrating Essence Serum",
      price: "₹2,499",
      rating: 4.8,
      reviews: 128,
      image: "/hydrating-essence-serum-cosmetics.jpg",
      badge: "Bestseller",
    },
    {
      id: 2,
      name: "Gentle Cleansing Balm",
      price: "₹1,899",
      rating: 4.9,
      reviews: 256,
      image: "/cleansing-balm-skincare-product.jpg",
      badge: "New",
    },
    {
      id: 3,
      name: "Luminous Day Cream",
      price: "₹3,299",
      rating: 4.7,
      reviews: 89,
      image: "/day-cream-luminous-skincare.jpg",
      badge: "Premium",
    },
    {
      id: 4,
      name: "Nourishing Night Mask",
      price: "₹2,699",
      rating: 4.6,
      reviews: 142,
      image: "/night-mask-skincare-product.jpg",
      badge: "Bestseller",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-primary/2 to-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-foreground mb-3">
          Our <span className="font-semibold">Featured Collection</span>
        </h2>
        <p className="text-muted-foreground">Handpicked products loved by thousands</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 bg-muted overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              {product.badge && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-foreground mb-2">{product.name}</h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-primary">★ {product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>

              {/* Price and Button */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{product.price}</span>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
