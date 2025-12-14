import React from 'react'
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Users, Award, Leaf, Heart, ArrowRight, Microscope, ScanLine, ShieldCheck, Sparkles, FlaskConical, Fingerprint, ShieldAlert } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/about.jpg" 
            alt="About Background" 
            className="w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-white/75" />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none z-10" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto mb-10"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 tracking-tight bg-cover bg-center text-transparent"
              style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/about.jpg')",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Skincare That Understands <br/> Your Skin
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-lg text-muted-foreground leading-relaxed"
            >
              At Kumar Kosmetics, we believe skincare should be personal, transparent, and backed by real science — not trends.
              Every skin is different, and your skincare should be too.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 pb-20 mt-20 px-10">
        
        {/* Why We Started */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-32 max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8 text-left pr-0 md:pr-12">
              <div className="inline-flex items-center space-x-2 text-primary font-semibold tracking-wide uppercase text-sm">
                <span className="w-8 h-[2px] bg-primary"></span>
                <span>Why We Started</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] text-blue-950">
                The Industry Was <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">Missing Something</span>
              </h2>
              
              <p className="text-slate-600 text-lg leading-relaxed font-light">
                The skincare industry is crowded with promises — but too often, products are sold without understanding the person using them.
              </p>
              
              <div className="relative pl-6 border-l-4 border-blue-200">
                <p className="text-blue-900 font-medium text-xl italic">
                  "Kumar Kosmetics was created to change that — by putting skin understanding first."
                </p>
              </div>
            </motion.div>

            {/* Right Image with Overlay Cards */}
            <motion.div variants={itemVariants} className="relative h-[500px] rounded-3xl overflow-hidden group">
              <img 
                src="/image7.avif" 
                alt="Skincare confusion" 
                className="w-full h-full object-cover grayscale-[30%] brightness-[100%] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Overlay Cards */}
              <div className="absolute inset-0 flex flex-col justify-center items-center gap-6 p-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/40 backdrop-blur-sm p-6 rounded-xl shadow-lg w-full max-w-xs transform translate-x-4 border border-white/30"
                >
                  <span className="text-red-500 font-bold text-xl block mb-2">❌ Confusion</span>
                  <p className="text-sm text-gray-700">Struggling to choose the right product for your unique needs.</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/40 backdrop-blur-sm p-6 rounded-xl shadow-lg w-full max-w-xs transform -translate-x-4 border border-white/30"
                >
                  <span className="text-red-500 font-bold text-xl block mb-2">❌ Mystery</span>
                  <p className="text-sm text-gray-700">Not understanding ingredients or what they actually do.</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/40 backdrop-blur-sm p-6 rounded-xl shadow-lg w-full max-w-xs transform translate-x-4 border border-white/30"
                >
                  <span className="text-red-500 font-bold text-xl block mb-2">❌ Reactions</span>
                  <p className="text-sm text-gray-700">Dealing with breakouts caused by wrong formulations.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Approach (Skin Analyzer) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-16 items-center mb-32"
        >
          <motion.div 
            variants={itemVariants}
            className="relative group order-2 md:order-1"
          >
             <div className="absolute inset-0 bg-blue-500/10 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6 duration-300" />
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://assets.conversion.ai/i/01766a4d-d92c-4323-9429-c78d860188c9?utm_source=chatgpt.com" 
                alt="Personalized Skincare Analysis" 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <ScanLine className="w-6 h-6 text-blue-400" />
                    <p className="font-bold text-lg">Smart Skin Analysis</p>
                  </div>
                  <p className="text-white/80 text-sm">Precision recommendations for your unique profile.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8 order-1 md:order-2">
            <div className="inline-flex items-center space-x-2 text-primary font-semibold tracking-wide uppercase text-sm">
              <span className="w-8 h-[2px] bg-primary"></span>
              <span>Our Approach</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] text-blue-950">
              Skin First, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">Always</span>
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed font-light">
              We don’t believe in one-size-fits-all skincare. That’s why we built a Skin Analyzer that looks at:
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-lg font-medium text-blue-900">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Fingerprint className="w-5 h-5" />
                </div>
                Your specific Skin Type
              </li>
              <li className="flex items-center gap-3 text-lg font-medium text-blue-900">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <Microscope className="w-5 h-5" />
                </div>
                Unique Skin Concerns
              </li>
              <li className="flex items-center gap-3 text-lg font-medium text-blue-900">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                Sensitivities & Allergies
              </li>
            </ul>
            <p className="text-muted-foreground text-lg leading-relaxed pt-2">
              Based on this, we recommend products that actually make sense for your skin — not just what’s trending.
            </p>
            <div >
               <Link to="/skin-analyzer" className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all duration-300">
                  <span className="pointer-events-none mr-8">Try the Skin Analyzer</span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-blue-900 rounded-full p-2 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 arrow-icon" />
                  </span>
               </Link>
            </div>
          </motion.div>
        </motion.section>

        {/* Why Us Parallax Section */}
        <section
          className="relative bg-center bg-cover md:bg-fixed mb-32 rounded-3xl overflow-hidden"
          style={{
            backgroundImage: "url('/image10.jpg')"
          }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 text-white font-semibold tracking-wide uppercase text-sm mb-4 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                <span>Why Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-md">
                Science & Transparency
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50 hover:bg-white/90 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <FlaskConical className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">
                  Powered by Science, Kept Simple
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Our formulations are created using dermatologically studied
                  ingredients and clean, well-researched actives.
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Balanced concentrations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Skin-barrier friendly
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    No harsh combinations
                  </li>
                </ul>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50 hover:bg-white/90 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-900">
                  Radical Transparency
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  We believe you deserve to know what you’re putting on your skin. No hidden formulas. No confusing claims.
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Every ingredient listed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Clear purpose explained
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Sensitivity warnings highlighted
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-900">Our Values in Practice</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              More than just words on a page.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              { icon: Award, title: "Quality First", desc: "Every formula is tested for safety, stability, and skin compatibility." },
              { icon: Leaf, title: "Conscious & Responsible", desc: "We choose ingredients and packaging that reduce unnecessary harm." },
              { icon: Users, title: "Inclusive by Design", desc: "Products created for different skin types, tones, and concerns." },
              { icon: Heart, title: "Honest Communication", desc: "We don’t promise overnight miracles. We promise consistency and care." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-card p-8 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Stats
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-32"
        >
          {[
            { number: "50K+", label: "Customers trusting us" },
            { number: "200+", label: "Thoughtfully formulated products" },
            { number: "5+", label: "Years of learning & improving" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="text-center p-8 rounded-2xl bg-secondary/30 backdrop-blur-sm"
            >
              <p className="text-5xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div> */}

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          
          <div className="relative z-10 px-8 py-20 text-center text-primary-foreground max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Built by People Who Care About Skin</h2>
            <p className="text-xl opacity-90 mb-10 leading-relaxed">
              Kumar Kosmetics is built by a team of formulators, technologists, and skincare enthusiasts who believe that better skin starts with better understanding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/skin-analyzer" className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all duration-300">
                <span className="pointer-events-none mr-8">Start Your Skin Analysis</span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-blue-900 rounded-full p-2 flex items-center justify-center">
                  <ScanLine className="w-5 h-5 arrow-icon" />
                </span>
              </Link>
              <Link to="/products" className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all duration-300">
                <span className="pointer-events-none mr-8">Explore Products</span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-blue-900 rounded-full p-2 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 arrow-icon" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
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
    </div>
  )
}
