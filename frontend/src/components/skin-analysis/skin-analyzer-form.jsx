"use client"
import { useState } from "react"

export default function SkinAnalyzerForm({ onAnalysisComplete }) {
  const [step, setStep] = useState(1)
  const [analysis, setAnalysis] = useState({
    skinType: "",
    concerns: [],
    allergies: [],
  })

  const skinTypes = ["Oily", "Dry", "Combination", "Sensitive", "Normal"]
  const concerns = ["Acne", "Dullness", "Pigmentation", "Anti-aging", "Redness", "Dark spots", "Uneven skin tone"]
  const allergies = ["Fragrance-free", "Paraben-free", "Sulfate-free", "Silicone-free", "Alcohol-free"]

  const toggleConcern = (concern) => {
    setAnalysis((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter((c) => c !== concern)
        : [...prev.concerns, concern],
    }))
  }

  const toggleAllergy = (allergy) => {
    setAnalysis((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }))
  }

  const handleNext = () => {
    if (step === 1 && !analysis.skinType) return
    if (step < 3) setStep(step + 1)
  }

  const handleComplete = () => {
    onAnalysisComplete(analysis)
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      {/* Progress */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-light text-foreground">
            Find Your <span className="font-semibold">Perfect Products</span>
          </h1>
          <span className="text-sm text-muted-foreground">Step {step} of 3</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-border">
        {/* Step 1: Skin Type */}
        {step === 1 && (
          <div className="slide-up">
            <h2 className="text-2xl font-semibold text-foreground mb-6">What's your skin type?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skinTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setAnalysis((prev) => ({ ...prev, skinType: type }))}
                  className={`p-4 rounded-lg font-medium transition-all ${
                    analysis.skinType === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-border"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              {analysis.skinType && getSkintypeDescription(analysis.skinType)}
            </p>
          </div>
        )}

        {/* Step 2: Concerns */}
        {step === 2 && (
          <div className="slide-up">
            <h2 className="text-2xl font-semibold text-foreground mb-2">What are your main concerns?</h2>
            <p className="text-muted-foreground mb-6">Select all that apply</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {concerns.map((concern) => (
                <button
                  key={concern}
                  onClick={() => toggleConcern(concern)}
                  className={`p-4 rounded-lg font-medium transition-all border-2 ${
                    analysis.concerns.includes(concern)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Allergies/Preferences */}
        {step === 3 && (
          <div className="slide-up">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Any preferences?</h2>
            <p className="text-muted-foreground mb-6">Select attributes you look for</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {allergies.map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => toggleAllergy(allergy)}
                  className={`p-4 rounded-lg font-medium transition-all border-2 ${
                    analysis.allergies.includes(allergy)
                      ? "border-secondary bg-secondary/10 text-secondary"
                      : "border-border text-foreground hover:border-secondary"
                  }`}
                >
                  {allergy}
                </button>
              ))}
            </div>

            <div className="bg-accent/10 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Your Profile:</span> {analysis.skinType} skin |{" "}
                {analysis.concerns.length > 0 ? analysis.concerns.join(", ") : "No concerns selected"}
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              step === 1
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-muted text-foreground hover:bg-border"
            }`}
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={step === 1 && !analysis.skinType}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                step === 1 && !analysis.skinType
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex-1 px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-colors"
            >
              See My Recommendations
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function getSkintypeDescription(skinType) {
  const descriptions = {
    Oily: "Skin that tends to produce excess oil, especially in the T-zone. Best suited for lightweight, oil-free products.",
    Dry: "Skin that lacks moisture and may feel tight. Benefits from rich, nourishing formulations.",
    Combination: "Skin that is oily in some areas and dry in others. Requires balanced care.",
    Sensitive: "Skin prone to irritation and redness. Needs gentle, fragrance-free products.",
    Normal: "Balanced skin with minimal sensitivity. Versatile for most product types.",
  }
  return descriptions[skinType] || ""
}
