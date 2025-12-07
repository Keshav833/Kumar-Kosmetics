import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SkinAnalyzerForm from "@/components/skin-analysis/skin-analyzer-form"
import RecommendedProducts from "@/components/product/recommended-products"
import { useAuthStore } from "@/store/useAuthStore"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast"

export default function SkinAnalyzer() {
  const [analysis, setAnalysis] = useState(null)
  const { authUser } = useAuthStore()

  const handleAnalysisComplete = async (result) => {
      setAnalysis(result);
      
      // Save to backend if logged in
      if (authUser) {
          try {
              await axiosInstance.put("/auth/profile/skin", result);
              toast.success("Skin profile saved!");
          } catch (error) {
              console.error("Failed to save skin profile", error);
          }
      }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {!analysis ? (
        <SkinAnalyzerForm onAnalysisComplete={handleAnalysisComplete} />
      ) : (
        <>
          <RecommendedProducts analysis={analysis} onReset={() => setAnalysis(null)} />
        </>
      )}

      <Footer />
    </main>
  )
}
