"use client"
import { useState } from "react"
import { AlertCircle } from "lucide-react"
import Stepper, { Step } from "@/components/ui/Stepper"

export default function SkinAnalyzerForm({ onAnalysisComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
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

  // Options with Local Images
  const skinTypes = [
    { 
      id: "Oily", 
      label: "Oily", 
      desc: "Shiny T-zone, enlarged pores",
      image: "/OilySkin.jpg"
    },
    { 
      id: "Dry", 
      label: "Dry", 
      desc: "Tight, flaky, rough texture",
      image: "/DrySkin.jpg"
    },
    { 
      id: "Combination", 
      label: "Combination", 
      desc: "Oily T-zone, dry cheeks",
      image: "/combinationskin.jpg"
    },
    { 
      id: "Normal", 
      label: "Normal", 
      desc: "Balanced, few imperfections",
      image: "/normalSkin.jpg"
    },
    { 
      id: "Sensitive", 
      label: "Sensitive", 
      desc: "Redness, irritation prone",
      image: "/sensitveSkin.jpg"
    },
  ]

  const concerns = [
    { id: "Acne", label: "Acne", image: "/Acne.jpg", desc: "Inflamed spots and pimples" },
    { id: "Breakouts", label: "Breakouts", image: "/Breakout.jpg", desc: "Sudden appearance of pimples" },
    { id: "Blackheads", label: "Blackheads", image: "/Blackheads.jpg", desc: "Open clogged pores" },
    { id: "Large pores", label: "Large pores", image: "/Largepores.jpg", desc: "Visible skin texture openings" },
    { id: "Pigmentation", label: "Pigmentation", image: "/Pigmentation.jpg", desc: "Dark patches on skin" },
    { id: "Dark spots", label: "Dark spots", image: "/Darkspots.jpg", desc: "Localized dark marks" },
    { id: "Uneven tone", label: "Uneven tone", image: "/UnevenTone.jpg", desc: "Inconsistent skin color" },
    { id: "Dullness", label: "Dullness", image: "/Dullness.jpg", desc: "Lack of radiance/glow" },
    { id: "Uneven texture", label: "Uneven texture", image: "/UnevenTexture.jpg", desc: "Rough or bumpy surface" },
    { id: "Fine lines", label: "Fine lines", image: "/Finelines.jpg", desc: "Small shallow wrinkles" },
    { id: "Wrinkles", label: "Wrinkles", image: "/Wrinkles.jpg", desc: "Deep creases and folds" },
    { id: "Loss of firmness", label: "Loss of firmness", image: "/LossOfFirmness.jpg", desc: "Sagging or loose skin" },
    { id: "Dryness", label: "Dryness", image: "/Dryness.jpg", desc: "Lack of moisture/oil" },
    { id: "Flakiness", label: "Flakiness", image: "/Flakiness.jpg", desc: "Peeling or scaling skin" },
    { id: "Redness", label: "Redness", image: "/Redness.jpg", desc: "Flushed or irritated skin" },
    { id: "Rosacea", label: "Rosacea", image: "/Rosacea.jpg", desc: "Chronic redness and bumps" },
    { id: "Sensitivity", label: "Sensitivity", image: "/sensitveSkin.jpg", desc: "Easily irritated skin" },
    { id: "Dark circles", label: "Dark circles", image: "/Darkcircles.jpg", desc: "Darkness under eyes" },
    { id: "Puffiness", label: "Puffiness", image: "/puffiness.jpg", desc: "Swelling around eyes" }
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

  const isNextDisabled = currentStep === 1 && !answers.skinType;

  return (
    <section className="w-full py-4 max-w-4xl mx-auto ">
      <Stepper
        initialStep={1}
        onStepChange={(step) => setCurrentStep(step)}
        onFinalStepCompleted={() => onAnalysisComplete(answers)}
        backButtonText="Back"
        nextButtonText="Next"
        stepCircleContainerClassName="bg-white"
        isNextDisabled={isNextDisabled}
      >
        <Step>
          <div className="space-y-6 px-[10px]">
            <h2 className="text-2xl font-bold text-foreground">How would you describe your skin type?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {skinTypes.map((type) => {
                const isSelected = answers.skinType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => updateAnswer("skinType", type.id)}
                    className={`group relative rounded-xl border-2 text-left transition-all overflow-hidden min-h-[120px] flex flex-col justify-end ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    {/* Background Image - Always Visible */}
                    <img 
                      src={type.image}
                      alt={type.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Dark Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
                       isSelected ? "opacity-90" : "opacity-60 group-hover:opacity-80"
                    }`} />

                    {/* Content - Slide up on hover/select */}
                    <div className={`relative z-10 p-6 transform transition-all duration-300 ${
                      isSelected 
                        ? "translate-y-0 opacity-100" 
                        : "translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                    }`}>
                      <div className="font-semibold text-lg mb-1 text-white">{type.label}</div>
                      <div className="text-sm text-gray-200">{type.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </Step>

        <Step>
          <div className="space-y-6 px-[10px]">
            <h2 className="text-2xl font-bold text-foreground">What are your main skin concerns?</h2>
            <p className="text-muted-foreground">Select all that apply</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {concerns.map((concern) => (
                <div key={concern.id} className="relative group">
                    <button
                      onClick={() => toggleArrayAnswer("concerns", concern.id)}
                      className={`w-full p-3 rounded-lg border text-sm font-medium transition-all ${
                        answers.concerns.includes(concern.id)
                          ? "border-primary text-primary bg-primary/5 ring-1 ring-primary"
                          : "bg-background text-foreground border-border hover:border-primary"
                      }`}
                    >
                      {concern.label}
                    </button>
                    {/* Hover Card */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 overflow-hidden border border-border translate-y-2 group-hover:translate-y-0">
                        <div className="h-32 w-full">
                            <img src={concern.image} alt={concern.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-2 text-center bg-muted/50">
                            <span className="text-xs font-medium text-muted-foreground">{concern.desc}</span>
                        </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </Step>

        <Step>
          <div className="space-y-6 px-[10px]">
            <h2 className="text-2xl font-bold text-foreground">Any allergies or sensitivities?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {allergies.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => toggleArrayAnswer("allergies", allergy)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    answers.allergies.includes(allergy)
                      ? "border-red-500 text-red-600 bg-red-50 ring-1 ring-red-500"
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
                    ? "border-green-500 text-green-600 bg-green-50 ring-1 ring-green-500"
                    : "bg-background text-foreground border-border hover:border-green-300"
                }`}
              >
                None
              </button>
            </div>
          </div>
        </Step>

        <Step>
          <div className="space-y-8 px-[10px]">
            <h2 className="text-2xl font-bold text-foreground">Lifestyle Check</h2>
            
            <div className="space-y-4">
              <label className="block font-medium">How many hours of sleep do you get?</label>
              <div className="flex gap-3">
                {["< 6 hours", "6-8 hours", "> 8 hours"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => updateAnswer("sleep", opt)}
                    className={`flex-1 p-3 rounded-lg border text-sm transition-all ${
                      answers.sleep === opt ? "border-primary text-primary bg-primary/5 ring-1 ring-primary" : "bg-background border-border hover:border-primary/50"
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
                  className={`flex-1 p-3 rounded-lg border transition-all ${answers.sunscreen === true ? "border-primary text-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  Yes, always
                </button>
                <button
                  onClick={() => updateAnswer("sunscreen", false)}
                  className={`flex-1 p-3 rounded-lg border transition-all ${answers.sunscreen === false ? "border-primary text-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
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
                  className={`flex-1 p-3 rounded-lg border transition-all ${answers.outdoors === true ? "border-primary text-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  Yes
                </button>
                <button
                  onClick={() => updateAnswer("outdoors", false)}
                  className={`flex-1 p-3 rounded-lg border transition-all ${answers.outdoors === false ? "border-primary text-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Step>

        <Step>
          <div className="space-y-6 px-[10px]">
            <h2 className="text-2xl font-bold text-foreground">Current Routine</h2>
            <p className="text-muted-foreground">What active ingredients do you currently use?</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {routineItems.map((item) => (
                <button
                  key={item}
                  onClick={() => toggleArrayAnswer("currentRoutine", item)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    answers.currentRoutine.includes(item)
                      ? "border-primary text-primary bg-primary/5 ring-1 ring-primary"
                      : "bg-background text-foreground border-border hover:border-primary"
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
        </Step>

        <Step>
          <div className="space-y-6 px-[10px]">
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
        </Step>
      </Stepper>
    </section>
  )
}
