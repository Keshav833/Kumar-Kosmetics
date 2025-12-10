import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "../lib/axios"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"
import ProductFilters from "../components/product/product-filters"
import ProductGrid from "../components/product/product-grid"
import ProductCategoryCircles from "../components/product/product-category-circles"
import { Grid, List, Loader, Search, X, Filter } from "lucide-react"

export default function Products() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewType, setViewType] = useState("grid")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [filters, setFilters] = useState({
    skinType: [],
    category: [],
    priceRange: [0, 5000],
    concern: [],
  })
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "")
  }, [searchParams])

  const productsSectionRef = useRef(null)

  useEffect(() => {
    if (searchQuery && productsSectionRef.current) {
      // Scroll to products if we have a query and we are above the section
      const offsetTop = productsSectionRef.current.offsetTop - 100; // 100px buffer for header
      if (window.scrollY < offsetTop) {
        window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      }
    }
  }, [searchQuery])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products")
        setProducts(res.data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter by search query first
  const searchedProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      
      
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/product_Header.jpg" 
            alt="Clean Conscious Clinical Skincare" 
            className="w-full h-full object-cover"
          />
          {/* Overlay Gradient for consistency and readability */}
          <div className="absolute inset-0  to-transparent"></div>
        </div>

        {/* Text Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <style>{`
            @keyframes slideInLeft {
              from { opacity: 0; transform: translateX(-100px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .animate-slide-in-left {
              animation: slideInLeft 1s ease-out forwards;
              opacity: 0; /* Ensures it starts invisible */
            }
          `}</style>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl  lg:text-7xl text-black mb-6 mt-10  " >
              <span className="block drop-shadow-md animate-slide-in-left">Clean</span>
              <span className="block drop-shadow-md animate-slide-in-left">Conscious</span>
              <span className="block drop-shadow-md animate-slide-in-left">Clinical</span>
              <span className="block font-thin opacity-90 animate-slide-in-left">Skincare</span>
            </h1>
            <p className="text-xl md:text-2xl font-sans w-1/2 text-black leading-relaxed max-w-2xl drop-shadow-sm animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
              <span className="font-extralight text-gray-600 w-1/2">
                Unreservedly honest products that work, be kind to skin and the planet
              </span>
            
              <span className="ml-2 px-2 py-1 text-3xl rounded-md italic font-['Bodoni_Moda'] text-gray-700" >
                – no exceptions!  
              </span>
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <ProductCategoryCircles filters={filters} setFilters={setFilters} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Sticky (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1" ref={productsSectionRef}>
            {/* Toolbar */}
            <div className="p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center transition-all">
              <h2 className="text-4xl font-bold text-gray-700 tracking-tight">Products</h2>
              
              {/* View Controls & Count */}
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50"
                  aria-label="Filter"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                <span className="text-sm  text-gray-500 font-medium whitespace-nowrap hidden sm:block">
                  {searchedProducts.length} Results
                </span>

                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewType("grid")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewType === "grid" 
                        ? "bg-white text-primary shadow-sm ring-1 ring-black/5" 
                        : "text-gray-500 hover:text-black hover:bg-gray-200/50"
                    }`}
                    aria-label="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewType("list")}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewType === "list" 
                        ? "bg-white text-primary shadow-sm ring-1 ring-black/5" 
                        : "text-gray-500 hover:text-black hover:bg-gray-200/50"
                    }`}
                    aria-label="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="flex flex-col justify-center items-center h-96">
                <Loader className="w-8 h-8 animate-spin text-primary mb-4" />
                <p className="text-sm text-gray-500 font-light tracking-wide animate-pulse">Loading collection...</p>
              </div>
            ) : (
              <ProductGrid viewType={viewType} filters={filters} products={searchedProducts} />
            )}
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <div className={`fixed inset-0 z-50 lg:hidden ${mobileFiltersOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileFiltersOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMobileFiltersOpen(false)}
          />
          {/* Drawer */}
          <div 
            className={`
              absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl
              max-h-[85vh] overflow-y-auto transform transition-transform duration-300 ease-in-out
              ${mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full'}
            `}
          >
            <div className="sticky top-0 bg-white z-10 px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button 
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close Filters"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 pb-10">
              <ProductFilters filters={filters} setFilters={setFilters} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
