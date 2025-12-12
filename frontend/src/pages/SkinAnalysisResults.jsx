import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import RecommendedProducts from "@/components/product/recommended-products";
import { useAuthStore } from "@/store/useAuthStore";
import axiosInstance from "@/lib/axios";
import { Loader } from "lucide-react";

const SkinAnalysisResults = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (authUser) {
          // Fetch from backend if logged in
          const res = await axiosInstance.get("/skin-analysis/profile");
          if (res.data && res.data.recommendations && res.data.recommendations.length > 0) {
            setAnalysis(res.data);
          } else {
            // No results found, redirect to quiz
            navigate("/skin-analyzer");
          }
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        navigate("/skin-analyzer");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [authUser, navigate]);

  const handleRetake = () => {
    // For logged in users, we just redirect with state to skip the check.
    navigate("/skin-analyzer", { state: { retake: true } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <RecommendedProducts analysis={analysis} onReset={handleRetake} />
      <Footer />
    </main>
  );
};

export default SkinAnalysisResults;
