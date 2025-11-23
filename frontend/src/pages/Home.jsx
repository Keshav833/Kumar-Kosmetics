import Header from "@/components/layout/header"
import HeroSection from "@/components/home/hero-section"
import SearchBar from "@/components/layout/search-bar"
import SkinTypeRecommendation from "@/components/skin-analysis/skin-type-recommendation"
import FeaturedProducts from "@/components/product/featured-products"
import BrandStory from "@/components/home/brand-story"
import Testimonials from "@/components/home/testimonials"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <SearchBar />
      <SkinTypeRecommendation />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <Footer />
    </main>
  )
}
