import { ArrowLeft, Check, AlertTriangle, Star, Droplets, Sparkles, Sun, Waves, SprayCan, Clock, ShieldAlert, FlaskConical, Download, ShoppingBag, Smile, Lightbulb } from "lucide-react"
import { Link } from "react-router-dom"
import { useCartStore } from "@/store/useCartStore"
import { useAuthStore } from "@/store/useAuthStore"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

export default function RecommendedProducts({ analysis, onReset }) {
  const { addToCart } = useCartStore()
  const { authUser, openAuthModal } = useAuthStore()

  if (!analysis) return null

  const { profile, recommendations, analysisResult } = analysis
  const { insights, routine, skinTypeInfo } = analysisResult || {}

  // Fallback if analysisResult is missing (backward compatibility)
  if (!analysisResult) return <div className="text-center p-10">Please retake the quiz to see the new detailed results.</div>

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    if (!authUser) {
      openAuthModal({ type: "login" })
      return
    }
    addToCart(product._id, 1)
  }

  const iconMap = {
    "Droplets": Droplets,
    "Spray": SprayCan,
    "Sparkles": Sparkles,
    "Waves": Waves,
    "Sun": Sun,
    "Smile": Smile
  };

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20">
      {/* 1. Skin Profile Summary (Hero) */}
      <section className="bg-white border-b border-gray-200 pt-12 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-blue-900">
                    Your Skin Profile
                </h1>
                <div className="text-sm text-muted-foreground">#{profile._id?.slice(-6).toUpperCase()}</div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1">Detected Skin Type</div>
                        <div className="text-3xl font-bold text-primary mb-2">{profile.skinType}</div>
                        {skinTypeInfo?.description && (
                            <p className="text-gray-600 text-sm mb-2">{skinTypeInfo.description}</p>
                        )}
                        {skinTypeInfo?.careFocus && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                <Sparkles className="w-3 h-3" /> Focus: {skinTypeInfo.careFocus}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-2">Primary Concerns</div>
                        <div className="flex flex-wrap gap-2">
                            {profile.concerns.map(c => (
                                <span key={c} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                         {profile.skinType === "Sensitive" || profile.history?.reactions ? (
                            <><AlertTriangle className="w-4 h-4 text-amber-500" /> <span className="text-sm font-medium">Sensitive</span></>
                        ) : (
                            <><Check className="w-4 h-4 text-green-500" /> <span className="text-sm font-medium">Resilient</span></>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        
        {/* 2. Key Insights (Limit to 3) */}
        <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" /> Key Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {insights?.slice(0, 3).map((insight, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                            <span className="text-blue-600 font-bold text-xs">{idx + 1}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{insight}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* 3. Routine Structure */}
        <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-primary" /> Suggested Routine
            </h2>
            <div className="space-y-4">
                {routine?.map((step, idx) => {
                    const Icon = iconMap[step.icon] || Star;
                    return (
                        <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 items-center">
                            <div className="flex items-center gap-3 w-full sm:w-1/4">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase">Step {idx + 1}</div>
                                    <div className="font-semibold text-foreground flex items-center gap-2">
                                        {step.step}
                                        {step.frequency && (step.frequency === "Optional" || step.frequency === "Occasional") && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-blue-900 uppercase tracking-wide">
                                                {step.frequency}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1 w-full">
                                {step.product ? (
                                    <Link to={`/products/${step.product._id}`} className="flex items-center gap-3 group">
                                        <div className="w-12 h-12 bg-gray-50 rounded-md border border-gray-100 p-1">
                                            <img src={step.product.images?.[0]} alt={step.product.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground group-hover:text-primary transition-colors">{step.product.name}</div>
                                            <div className="text-xs text-green-600 font-medium">{step.product.matchScore}% Match</div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="text-sm text-muted-foreground italic">{step.genericAdvice}</div>
                                )}
                            </div>

                            {step.product && (
                                <button 
                                    onClick={(e) => handleAddToCart(e, step.product)}
                                    className="w-full sm:w-auto px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>

        {/* 4. Products Grid */}
        <section>
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> Top Recommendations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((product) => (
                    <Link key={product._id} to={`/products/${product._id}`}>
                        <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative h-48 bg-gray-50 p-4 flex items-center justify-center">
                                <img
                                    src={product.images?.[0] || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-green-100">
                                    <span className="text-xs font-bold text-green-700">{product.matchScore}%</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                                <h3 className="font-medium text-foreground mb-2 line-clamp-1">{product.name}</h3>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="font-semibold">₹{product.price}</span>
                                    <button
                                        onClick={(e) => handleAddToCart(e, product)}
                                        className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* 5. Retake Quiz Button */}
        <div className="flex justify-center pt-8">
            <button 
                onClick={onReset}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-foreground font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
                <ArrowLeft className="w-4 h-4" /> Retake Analysis
            </button>
        </div>

      </div>
    </div>
  )
}
