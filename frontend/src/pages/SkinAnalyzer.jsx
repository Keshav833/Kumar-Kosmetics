import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SkinAnalyzerForm from "@/components/skin-analysis/skin-analyzer-form"
import RecommendedProducts from "@/components/product/recommended-products"

export default function SkinAnalyzer() {
  const [analysis, setAnalysis] = useState(null)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {!analysis ? (
        <SkinAnalyzerForm onAnalysisComplete={setAnalysis} />
      ) : (
        <>
          <RecommendedProducts analysis={analysis} onReset={() => setAnalysis(null)} />
        </>
      )}

      <Footer />
    </main>
  )
}
