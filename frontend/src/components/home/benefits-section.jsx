import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Sparkles, Microscope, ShieldCheck, Leaf } from "lucide-react"

export default function BenefitsSection() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Layer 1: Background moves slow (20% speed)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  
  // Layer 2: Main Screen moves slightly slower than scroll
  const mainY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"])

  // Layer 3: Cards move FAST (200% speed)
  // Moving from lower down to way up
  const cardsY = useTransform(scrollYProgress, [0, 1], ["40%", "-100%"])

  return (
    <div className="w-full bg-gray-50">
       {/* Header Content - Separate and Static */}
       <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-24 pb-2 text-left z-20 relative">
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 drop-shadow-sm">
              Explore Your Pathway <br/> <span className="italic font-serif">to Flawless Skin</span>
          </h2>
    
          <p className="text-gray-900/80 text-lg leading-relaxed max-w-lg font-medium">
              From brightening and hydrating to refining and rejuvenating overnight.
          </p>
       </div>

      <style>
        {`
          .mask-effect {
            mask-image: radial-gradient(ellipse 48% 65% at 50% 50%, black 60%, transparent 62%);
            -webkit-mask-image: radial-gradient(ellipse 48% 65% at 50% 50%, black 60%, transparent 62%);
          }
        `}
      </style>

      <section ref={containerRef} className="relative w-full h-[150vh] overflow-hidden flex justify-center ">
        
        {/* Central Masked Image - Bigger, Tilted, Static */}
        <motion.div 
           className="relative z-10 w-[700px] h-[850px] mask-effect"
           style={{ y: backgroundY, rotate: 45 }}
        >
           <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/image2.png')" }}
          />
        </motion.div>
  
        {/* Layer 3: Floating Cards (Scattered Randomly) */}
        <div className="absolute  inset-0 z-20 pointer-events-none overflow-hidden">
            <motion.div 
               style={{ y: cardsY }}
               className="relative w-full h-full max-w-7xl mx-auto pointer-events-auto"
            >
              {/* Card 1: Top Left */}
              <div className="absolute text-center top-[45%] left-[5%] md:left-[10%] w-80 p-6 bg-gray-200/50 backdrop-blur-xl shadow-lg rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
                   <Sparkles className="w-6 h-6 text-gray-800" />
                </div>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Clean, Beyond Reproach</h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  No black boxes, no hidden actives, no vague claims. Every formula is transparently disclosed — ingredient by ingredient — so you always know exactly what you're putting on your skin and why it works.
                </p>
              </div>
    
              {/* Card 2: Top Right */}
              <div className="absolute text-center top-[50%] right-[5%] md:right-[10%] w-80 p-6 bg-gray-200/50 backdrop-blur-xl shadow-lg rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
                   <Microscope className="w-6 h-6 text-gray-800" />
                </div>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Potent & Scientifically Designed</h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Powered by dermatologist-approved actives and plant-based innovation, our formulations are crafted to deliver visible, measurable results — without compromising your skin barrier or long-term health.
                </p>
              </div>
    
              {/* Card 3: Bottom Left, shifted down */}
              <div className="absolute text-center top-[80%] left-[8%] md:left-[15%] w-80 p-6 bg-gray-200/50 backdrop-blur-xl shadow-lg rounded-2xl border border-white/20">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
                   <ShieldCheck className="w-6 h-6 text-gray-800" />
                </div>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Dermat-Backed Expertise</h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Each product is developed with dermatological insight, ensuring optimal safety, compatibility, and efficacy. Your skincare routine is supported by experts — from the very first step to your final glow.
                </p>
              </div>
    
              {/* Card 4: Bottom Right, shifted down */}
              <div className="absolute text-center top-[85%] right-[8%] md:right-[12%] w-80 p-6 bg-gray-200/50 backdrop-blur-xl shadow-lg rounded-2xl border border-white/20">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
                   <Leaf className="w-6 h-6 text-gray-800" />
                </div>
                <h3 className="text-lg font-bold mb-1 text-gray-900">Conscious & Responsible</h3>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Formulated with clean, verified ingredients and responsibly sourced components. Every product is PETA-certified vegan & cruelty-free — gentle on your skin and kind to the planet we all share.
                </p>
              </div>
            </motion.div>
        </div>
  
      </section>
    </div>
  )
}
