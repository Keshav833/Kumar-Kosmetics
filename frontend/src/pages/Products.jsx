import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import axios from "../lib/axios"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"
import ProductFilters from "../components/product/product-filters"
import ProductGrid from "../components/product/product-grid"
import { Grid, List, Loader, Search, X } from "lucide-react"

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

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "")
  }, [searchParams])

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
            <div className=" p-4 mb-8 flex flex-col sm:flex-row gap-4 justify-end items-center transition-all">
              
              {/* Search Bar Removed */}

              {/* View Controls & Count */}
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
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
      </main>

      <Footer />
    </div>
  )
}
