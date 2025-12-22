import { ArrowLeft, Check, AlertTriangle, Star, Droplets, Sparkles, Sun, Waves, SprayCan, Clock, ShieldAlert, FlaskConical, Download, ShoppingBag, Smile, Lightbulb } from "lucide-react"
import { Link } from "react-router-dom"
import { useCartStore } from "@/store/useCartStore"
import { useAuthStore } from "@/store/useAuthStore"
import { motion } from "framer-motion"

export default function RecommendedProducts({ analysis, onReset, isEmbedded = false }) {
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



  const skinImages = {
      "Oily": "/OilySkin.jpg",
      "Dry": "/DrySkin.jpg",
      "Combination": "/combinationskin.jpg",
      "Normal": "/normalSkin.jpg",
      "Sensitive": "/sensitveSkin.jpg"
  };

  const SkinImage = skinImages[profile.skinType] || NormalSkinImg;

  return (
    <div className={`min-h-screen ${isEmbedded ? 'bg-transparent pb-0' : 'bg-gray-50/30 pb-20'}`}>
      {/* 1. Skin Profile Summary (Hero) */}
      <section className={`${isEmbedded ? 'pt-0 pb-6 px-0' : 'bg-white border-b border-gray-200 pt-12 pb-8 px-4'}`}>
        <div className={`mx-auto ${isEmbedded ? 'max-w-full' : 'max-w-4xl'}`}>
            {!isEmbedded && (
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-blue-900">
                        Your Skin Profile
                    </h1>
                    <div className="text-sm text-muted-foreground">#{profile._id?.slice(-6).toUpperCase()}</div>
                </div>
            )}
            
            <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm ${isEmbedded ? '' : 'p-6'}`}>
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/3 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 relative min-h-[200px] md:min-h-full">
                        <img 
                            src={SkinImage} 
                            alt={`${profile.skinType} Skin`} 
                            className="absolute rounded-2xl inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/50 text-center">
                            <span className="font-bold text-orange-400 block">{profile.skinType} Skin</span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex flex-col gap-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-sm text-blue-900 font-medium uppercase tracking-wider">Analysis Result</div>
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                        {profile.skinType === "Sensitive" || profile.history?.reactions ? (
                                            <><AlertTriangle className="w-3 h-3 text-amber-500" /> <span className="text-xs font-bold text-amber-700">Sensitive</span></>
                                        ) : (
                                            <><Check className="w-3 h-3 text-green-500" /> <span className="text-xs font-bold text-green-700">Resilient</span></>
                                        )}
                                    </div>
                                </div>
                                
                                {skinTypeInfo?.description && (
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{skinTypeInfo.description}</p>
                                )}
                                
                                {skinTypeInfo?.careFocus && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                                        <Sparkles className="w-3.5 h-3.5" /> 
                                        <span>Focus: <span className="font-bold">{skinTypeInfo.careFocus}</span></span>
                                    </div>
                                )}
                            </div>
                            
                            <div>
                                <div className="text-xs font-bold text-blue-900/80 uppercase tracking-wider mb-2">Primary Concerns</div>
                                <div className="flex flex-wrap gap-2">
                                    {profile.concerns.map(c => (
                                        <span key={c} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <div className={`mx-auto space-y-8 ${isEmbedded ? 'max-w-full px-0 py-4' : 'max-w-4xl px-4 py-12'}`}>
        
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
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="text-sm text-muted-foreground italic">{step.genericAdvice}</div>
                                )}
                            </div>

                            {step.product && (
                                <button 
                                    onClick={(e) => handleAddToCart(e, step.product)}
                                    className="p-2.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
                                    title="Add to Cart"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>

        {/* 4. Products Grid */}
        <section>
            <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> Top Recommendations
            </h2>
            
            {(() => {
                // Group products by category
                const groups = {};
                const cats = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen", "Mask"];
                
                recommendations.forEach(product => {
                    // Fuzzy match product category to one of our main types
                    // If product.description or category contains "Cleanser", put it in Cleanser group.
                    const pCat = (product.category || "").toLowerCase();
                    const mainCat = cats.find(c => pCat.includes(c.toLowerCase()));
                    
                    const groupKey = mainCat || product.category || "Other";
                    
                    if (!groups[groupKey]) groups[groupKey] = [];
                    groups[groupKey].push(product);
                });

                // Get categories present in groups, sorting by our preferred order if found
                const presentCats = Object.keys(groups).sort((a, b) => {
                    const idxA = cats.findIndex(c => a.toLowerCase().includes(c.toLowerCase()));
                    const idxB = cats.findIndex(c => b.toLowerCase().includes(c.toLowerCase()));
                    // If both known, sort by index. If one unknown, put at end.
                    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                    if (idxA !== -1) return -1;
                    if (idxB !== -1) return 1;
                    return a.localeCompare(b);
                });

                return presentCats.map(category => (
                    <div key={category} className="mb-10">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 px-1">{category}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groups[category].map((product) => (
                                <Link key={product._id} to={`/products/${product._id}`}>
                                    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                                        <div className="relative h-48 bg-gray-50 p-4 flex items-center justify-center">
                                            {/* Match Badge */}
                                            {product.matchScore && (
                                                <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                                                    <Sparkles className="w-3 h-3" />
                                                    {product.matchScore}% Match
                                                </div>
                                            )}
                                            <img
                                                src={product.images?.[0] || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                                            <h3 className="font-medium text-foreground mb-1 line-clamp-1">{product.name}</h3>
                                            
                                            {/* Benefits / Reasons */}
                                            {product.matchReasons && product.matchReasons.length > 0 && (
                                                <div className="mb-3">
                                                    <p className="text-[10px] text-indigo-600 font-medium bg-indigo-50 inline-block px-1.5 py-0.5 rounded">
                                                        {product.matchReasons[0]}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mt-auto">
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
                    </div>
                ));
            })()}
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
