import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import ThreeDProductCard from "./ThreeDProductCard"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedProducts() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (sectionRef.current) {
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
  }, [])

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 py-26 bg-gradient-to-b from-primary/2 to-background">
      <div className="text-center mb-16 featured-header">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16 gap-16 featured-grid justify-items-center">
        <ThreeDProductCard 
          title="Sun Screen" 
          price="899.00" 
          image="/sunscreen.png" 
          bgImage="/sunscreen.jpg" 
          category="Sunscreen"
          className="featured-card"
        />
        <ThreeDProductCard 
          title="Toner" 
          price="699.00" 
          image="/toner.png" 
          bgImage="/toner.jpg" 
          category="Toner"
          className="featured-card"
        />
        <ThreeDProductCard 
          title="Serum" 
          price="999.00" 
          image="/serum.png" 
          bgImage="/serum.jpg" 
          category="Serum"
          className="featured-card"
        />
        <ThreeDProductCard 
          title="Moisturiser" 
          price="499.00" 
          image="/moisturiser.png" 
          bgImage="/moisturiser.jpg" 
          category="Moisturizer"
          className="featured-card"
        />
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
