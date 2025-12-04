import { useState, useEffect } from "react"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ProductGrid from "@/components/product/product-grid"
import ProductFilters from "@/components/product/product-filters"

export default function Products() {
  const [filters, setFilters] = useState({
    skinType: [],
    category: [],
    priceRange: [0, 5000],
    concern: [],
  })
  console.log("Vercel API URL:", import.meta.env.VITE_API_URL);
  const [viewType, setViewType] = useState("grid")
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on active filters
  const filteredProducts = products.filter((product) => {
    const productSkinTypes = product.skinType || [];
    const productConcerns = product.skinConcerns || product.concerns || [];
    const productPrice = product.price || 0;

    if (filters.skinType.length > 0 && !filters.skinType.some((type) => productSkinTypes.includes(type))) {
      return false
    }
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false
    }
    if (productPrice < filters.priceRange[0] || productPrice > filters.priceRange[1]) {
      return false
    }
    if (filters.concern.length > 0 && !filters.concern.some((concern) => productConcerns.includes(concern))) {
      return false
    }
    return true
  })

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-b border-border">
        <h1 className="text-4xl font-light text-foreground mb-3">
          Our <span className="font-semibold">Collections</span>
        </h1>
        <p className="text-muted-foreground">Discover products tailored to your skin needs</p>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <ProductFilters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-2 rounded-lg transition-colors ${viewType === "grid" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-border"}`}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-2 rounded-lg transition-colors ${viewType === "list" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-border"}`}
                >
                  ☰
                </button>
              </div>
            </div>

            <ProductGrid 
              viewType={viewType} 
              filters={{
                skinType: [],
                category: [],
                priceRange: [0, 1000000],
                concern: [],
              }} 
              products={filteredProducts} 
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
