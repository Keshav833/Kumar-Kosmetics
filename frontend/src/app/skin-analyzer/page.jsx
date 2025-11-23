"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SkinAnalyzerForm from "@/components/skin-analysis/skin-analyzer-form"
import RecommendedProducts from "@/components/product/recommended-products"
import { useState } from "react"

export default function SkinAnalyzerPage() {
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
