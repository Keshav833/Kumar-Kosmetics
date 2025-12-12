"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react"

export default function SkinAnalyzerForm({ onAnalysisComplete }) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    skinType: "",
    concerns: [],
    allergies: [],
    sleep: "",
    outdoors: false,
    sunscreen: false,
    currentRoutine: [],
    reactions: false,
    medications: "",
    goal: "",
  })

  const totalSteps = 6

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
    else onAnalysisComplete(answers)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const updateAnswer = (field, value) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayAnswer = (field, value) => {
    setAnswers(prev => {
      const current = prev[field]
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  // Options with Unsplash Images
  const skinTypes = [
    { 
      id: "Oily", 
      label: "Oily", 
      desc: "Shiny T-zone, enlarged pores",
      image: "https://images.unsplash.com/photo-1508759073847-9ca702bd4d2b?q=80&w=600&auto=format&fit=crop"
    },
    { 
      id: "Dry", 
      label: "Dry", 
      desc: "Tight, flaky, rough texture",
      image: "https://images.unsplash.com/photo-1508759073847-9ca702bd4d2b?q=80&w=600&auto=format&fit=crop"
    },
    { 
      id: "Combination", 
      label: "Combination", 
      desc: "Oily T-zone, dry cheeks",
      image: "https://images.unsplash.com/photo-1508759073847-9ca702bd4d2b?q=80&w=600&auto=format&fit=crop"
    },
    { 
      id: "Normal", 
      label: "Normal", 
      desc: "Balanced, few imperfections",
      image: "https://images.unsplash.com/photo-1508759073847-9ca702bd4d2b?q=80&w=600&auto=format&fit=crop"
    },
    { 
      id: "Sensitive", 
      label: "Sensitive", 
      desc: "Redness, irritation prone",
      image: "https://images.unsplash.com/photo-1508759073847-9ca702bd4d2b?q=80&w=600&auto=format&fit=crop"
    },
  ]

  const concerns = [
    "Acne", "Breakouts", "Blackheads", "Large pores",
    "Pigmentation", "Dark spots", "Uneven tone",
    "Dullness", "Uneven texture",
    "Fine lines", "Wrinkles", "Loss of firmness",
    "Dryness", "Flakiness",
    "Redness", "Rosacea", "Sensitivity",
    "Dark circles", "Puffiness"
  ]

  const allergies = [
    "Parabens", "Sulfates", "Fragrance", "Alcohol", "Silicones", "Essential-oils"
  ]

  const routineItems = [
    "Vitamin C", "Retinol", "AHAs/BHAs", "Niacinamide", "Hyaluronic Acid", "None"
  ]

  const goals = [
    "Hydration", "Glow & Brightening", "Anti-ageing", "Reduce Breakouts", "Even Tone"
  ]

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">How would you describe your skin type?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skinTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateAnswer("skinType", type.id)}
                  className={`group relative p-6 rounded-xl border-2 text-left transition-all overflow-hidden min-h-[160px] flex flex-col justify-end ${
                    answers.skinType === type.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {/* Background Image on Hover/Active */}
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                      answers.skinType === type.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    style={{ backgroundImage: `url(${type.image})` }}
                  />
                  
                  {/* Gradient Overlay for text readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent transition-opacity duration-300 ${
                     answers.skinType === type.id || "group-hover:opacity-100"
                  }`} />

                  <div className="relative z-10">
                    <div className="font-semibold text-lg mb-1">{type.label}</div>
                    <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{type.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">What are your main skin concerns?</h2>
            <p className="text-muted-foreground">Select all that apply</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {concerns.map((concern) => (
                <button
                  key={concern}
                  onClick={() => toggleArrayAnswer("concerns", concern)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    answers.concerns.includes(concern)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Any allergies or sensitivities?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {allergies.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => toggleArrayAnswer("allergies", allergy)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    answers.allergies.includes(allergy)
                      ? "bg-red-100 text-red-700 border-red-500"
                      : "bg-background text-foreground border-border hover:border-red-300"
                  }`}
                >
                  {allergy}
                </button>
              ))}
              <button
                onClick={() => updateAnswer("allergies", [])}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  answers.allergies.length === 0
                    ? "bg-green-100 text-green-700 border-green-500"
                    : "bg-background text-foreground border-border hover:border-green-300"
                }`}
              >
                None
              </button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground">Lifestyle Check</h2>
            
            <div className="space-y-4">
              <label className="block font-medium">How many hours of sleep do you get?</label>
              <div className="flex gap-3">
                {["< 6 hours", "6-8 hours", "> 8 hours"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => updateAnswer("sleep", opt)}
                    className={`flex-1 p-3 rounded-lg border text-sm ${
                      answers.sleep === opt ? "bg-primary text-primary-foreground" : "bg-background"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block font-medium">Do you use sunscreen daily?</label>
              <div className="flex gap-3">
                <button
                  onClick={() => updateAnswer("sunscreen", true)}
                  className={`flex-1 p-3 rounded-lg border ${answers.sunscreen === true ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Yes, always
                </button>
                <button
                  onClick={() => updateAnswer("sunscreen", false)}
                  className={`flex-1 p-3 rounded-lg border ${answers.sunscreen === false ? "bg-primary text-primary-foreground" : ""}`}
                >
                  No / Sometimes
                </button>
              </div>
            </div>

             <div className="space-y-4">
              <label className="block font-medium">Do you spend a lot of time outdoors?</label>
              <div className="flex gap-3">
                <button
                  onClick={() => updateAnswer("outdoors", true)}
                  className={`flex-1 p-3 rounded-lg border ${answers.outdoors === true ? "bg-primary text-primary-foreground" : ""}`}
                >
                  Yes
                </button>
                <button
                  onClick={() => updateAnswer("outdoors", false)}
                  className={`flex-1 p-3 rounded-lg border ${answers.outdoors === false ? "bg-primary text-primary-foreground" : ""}`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Current Routine</h2>
            <p className="text-muted-foreground">What active ingredients do you currently use?</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {routineItems.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleArrayAnswer("currentRoutine", item)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    answers.currentRoutine.includes(item)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Safety Check</p>
                    <p>Have you ever had a severe reaction to skincare products?</p>
                    <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                checked={answers.reactions === true} 
                                onChange={() => updateAnswer("reactions", true)}
                                className="accent-yellow-600"
                            />
                            Yes
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="radio" 
                                checked={answers.reactions === false} 
                                onChange={() => updateAnswer("reactions", false)}
                                className="accent-yellow-600"
                            />
                            No
                        </label>
                    </div>
                </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">What is your primary goal?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => updateAnswer("goal", goal)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    answers.goal === goal
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-semibold text-lg">{goal}</div>
                </button>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-6 md:p-10 min-h-[500px] flex flex-col">
        <div className="flex-1">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>
        </div>

        <div className="flex justify-between mt-10 pt-6 border-t border-border">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              step === 1
                ? "text-muted-foreground cursor-not-allowed"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>

          <button
            onClick={handleNext}
            disabled={step === 1 && !answers.skinType} // Basic validation for step 1
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            {step === totalSteps ? "Analyze Profile" : "Next"}
            {step !== totalSteps && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </section>
  )
}
