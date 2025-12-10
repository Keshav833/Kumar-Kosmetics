import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "../../lib/axios"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products")
        // Get first 4 products, preferably featured ones if marked, otherwise just first 4
        // Assuming backend returns { products: [] }
        const allProducts = res.data.products || []
        const featured = allProducts.filter(p => p.featured)
        // If we have featured products, use them, otherwise use generic slice
        const displayProducts = featured.length > 0 ? featured.slice(0, 4) : allProducts.slice(0, 4)
        setProducts(displayProducts)
      } catch (error) {
        console.error("Error fetching featured products:", error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (products.length > 0 && sectionRef.current) {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from(".featured-header > *", {
                scrollTrigger: {
                    trigger: ".featured-header",
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                clearProps: "all"
            })

            // Product cards animation
            gsap.from(".featured-card", {
                scrollTrigger: {
                    trigger: ".featured-grid",
                    start: "top 75%",
                },
                x: 100, // Come from right
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                clearProps: "all"
            })
            
            // Button animation 
            gsap.from(".view-all-btn", {
                 scrollTrigger: {
                    trigger: ".view-all-btn",
                    start: "top 90%",
                 },
                 y: 20,
                 opacity: 0,
                 duration: 0.6,
                 delay: 0.4,
                 clearProps: "all"
            })

        }, sectionRef)
        return () => ctx.revert()
    }
  }, [products])

  if (products.length === 0) return null;

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-b from-primary/2 to-background">
      <div className="text-center mb-12 featured-header">
        <style>{`
          @keyframes arrow-slide {
            0% { transform: translateX(0); opacity: 1; }
            45% { transform: translateX(100%); opacity: 0; }
            50% { transform: translateX(-100%); opacity: 0; }
            55% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .group:hover .arrow-icon {
            animation: arrow-slide 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}</style>
        <h2 className="text-5xl font-light text-foreground mb-3">
          Our <span className="font-semibold">Featured Collection</span>
        </h2>
        <p className="text-muted-foreground">Handpicked products loved by thousands</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 featured-grid">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer block group featured-card"
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-50 overflow-hidden p-4">
              <img
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-300 mix-blend-multiply"
              />
              {/* Badge - could be based on newness or stock */}
              {product.stock < 5 && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium z-10">
                  Low Stock
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-foreground mb-2 truncate group-hover:text-primary transition-colors">{product.name}</h3>

              {/* Rating Placeholder - real rating would come from reviews */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-primary">★ {4.5}</span>
                <span className="text-xs text-muted-foreground">(120+)</span>
              </div>

              {/* Price and Button */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">₹{product.price}</span>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
                  View
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center view-all-btn">
  <Link
    to="/products"
    className="group relative w-[300px] inline-flex items-center justify-center px-6 py-3 
               md:px-10 md:py-4 text-base md:text-lg font-medium rounded-full 
               text-white bg-gray-700 hover:bg-gray-800 shadow-md"
  >
    {/* Centered Text */}
    <span className="pointer-events-none">View All</span>

    {/* Right Circle Arrow */}
    <span 
      className="absolute right-2 top-1/2 -translate-y-1/2 
                 bg-white text-black rounded-full p-3
                 flex items-center justify-center"
    >
      <ArrowRight className="w-5 h-5 arrow-icon" />
    </span>
  </Link>
</div>
    </section>
  )
}
