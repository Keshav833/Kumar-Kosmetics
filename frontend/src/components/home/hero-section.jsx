"use client"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    id: 1,
    image: "/product_Header.jpg",
    lines: ["Clean", "Conscious", "Clinical", "Skincare"],
    titleStyles: ["", "", "", "font-thin opacity-90"], // Specific styling per line
    description: (
      <>
        <span className="font-extralight text-gray-600 w-2/3">
          Unreservedly honest products that work, be kind to skin and the planet
        </span>
        <span className="ml-2 px-2 py-1 text-3xl rounded-md italic font-['Bodoni_Moda'] text-gray-700">
          – no exceptions!
        </span>
      </>
    ),
    buttonText: "Shop Collection",
    buttonLink: "/products",
  },
  {
    id: 3,
    image: "/Header2.png.png", // Updated structure
    lines: ["Your Skin.", "Your Routine.", "Perfectly", "Matched."],
    titleStyles: ["text-[#0f3d3e]", "text-[#0f3d3e]", "text-[#0f3d3e]", "text-[#0f3d3e]"], 
    description: (
      <span className="font-extralight text-gray-600 w-2/3">
        Personalized recommendations crafted around your skin type, concerns, and sensitivity.
      </span>
    ),
    buttonText: "Start Analysis",
    buttonLink: "/skin-analyzer", // Assuming this route exists
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 12000) // 5-6 seconds per slide
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slides[current].image}
              alt="Hero Slide"
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 to-transparent mix-blend-overlay opacity-20"></div>
          </div>

          {/* Text Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-black mb-6 mt-10">
                {slides[current].lines.map((line, index) => (
                  <motion.span
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                    className={`block drop-shadow-md ${slides[current].titleStyles[index] || ""}`}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-xl md:text-2xl font-sans w-2/3 text-black leading-relaxed max-w-2xl drop-shadow-sm"
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="mt-8"
              >
                <Link
                  to={slides[current].buttonLink}
                  className="group relative w-[280px] inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-medium rounded-full text-white bg-black hover:bg-gray-800 shadow-md transition-all duration-300"
                >
                  <span className="pointer-events-none">{slides[current].buttonText}</span>
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 
                                 bg-white text-black rounded-full p-2.5 md:p-3
                                 flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5 arrow-icon" />
                  </span>
                </Link>
                {/* Arrow Animation Style */}
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
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-black scale-125" : "bg-gray-400 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
