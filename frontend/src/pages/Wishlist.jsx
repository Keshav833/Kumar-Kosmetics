import { useEffect } from "react"
import { useWishlistStore } from "@/store/useWishlistStore"
import ProductGrid from "@/components/product/product-grid"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"

export default function Wishlist() {
  const { wishlist, getWishlist, loading } = useWishlistStore()

  useEffect(() => {
    getWishlist()
  }, [getWishlist])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-primary fill-primary" />
          <h1 className="text-3xl font-light text-foreground">My Wishlist</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : wishlist.length > 0 ? (
          <ProductGrid 
            viewType="grid" 
            products={wishlist} 
            filters={{
              category: [],
              priceRange: [0, 10000],
              skinType: [],
              concern: []
            }} 
          />
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-border">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start saving your favorite products to build your skincare routine.</p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
