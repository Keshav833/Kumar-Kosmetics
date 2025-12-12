import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SkinAnalyzerForm from "@/components/skin-analysis/skin-analyzer-form"
import { useAuthStore } from "@/store/useAuthStore"
import axiosInstance from "@/lib/axios"
import toast from "react-hot-toast"

export default function SkinAnalyzer() {
  const [loading, setLoading] = useState(true)
  const { authUser } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // If user clicked "Retake", skip the check
    if (location.state?.retake) {
        setLoading(false);
        return;
    }

    const checkSavedResults = async () => {
      setLoading(true);
      try {
        if (authUser) {
          // Fetch from backend if logged in
          const res = await axiosInstance.get("/skin-analysis/profile");
          // If profile exists and has recommendations, redirect to results
          if (res.data && res.data.recommendations && res.data.recommendations.length > 0) {
             navigate("/skin-analyzer/results");
          }
        }
      } catch (error) {
        // Ignore 404s
      } finally {
        setLoading(false);
      }
    };

    checkSavedResults();
  }, [authUser, navigate, location.state]);

  const handleAnalysisComplete = async (answers) => {
      try {
          // Call the evaluate endpoint
          const response = await axiosInstance.post("/skin-analysis/evaluate", { 
              answers,
              userId: authUser?._id 
          });
          
          toast.success("Analysis complete!");
          navigate("/skin-analyzer/results");
      } catch (error) {
          console.error("Analysis failed", error);
          toast.error("Failed to analyze skin profile. Please try again.");
      }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <SkinAnalyzerForm onAnalysisComplete={handleAnalysisComplete} />
      <Footer />
    </main>
  )
}
