import { useState, useEffect } from "react"
import axios from "../lib/axios"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"
import ProductFilters from "../components/product/product-filters"
import ProductGrid from "../components/product/product-grid"
import { Grid, List, Loader, Search, X } from "lucide-react"

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewType, setViewType] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    skinType: [],
    category: [],
    priceRange: [0, 5000],
    concern: [],
  })

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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl mb-3">
            Our <span className="font-semibold">Collection</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Discover scientifically formulated skincare designed for your unique skin needs.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Sticky */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <ProductFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center bg-opacity-80 backdrop-blur-md sticky top-20 z-10 transition-all">
              
              {/* Search Bar */}
              <div className="relative w-full sm:max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search products, brands, categories..."
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </button>
                )}
              </div>

              {/* View Controls & Count */}
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm text-gray-500 font-medium whitespace-nowrap hidden sm:block">
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
      </main>

      <Footer />
    </div>
  )
}
