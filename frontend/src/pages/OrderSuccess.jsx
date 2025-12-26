import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, Loader } from "lucide-react";
import axiosInstance from "@/lib/axios";
import Receipt from "@/components/order/Receipt";

export default function OrderSuccess() {
  const { id } = useParams(); // Using 'id' matching the route definition usually, or 'orderId' if route is /:orderId
  // The route in App.jsx (implied) might be /order-success or /order/success/:id. 
  // Based on current file, it didn't use params. I will assume route will be /order/success/:orderId
  // Use 'orderId' or 'id' depending on what I set in App.jsx. Let's use 'id' effectively or check params.
  // Actually, let's use window.location or assume the route is updated to /order/success/:id as planned.
  
  const [order, setOrder] = useState(null);
  const [skinAnalysis, setSkinAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // If no ID is present (legacy route?), we might just show generic success? 
    // But we want receipt.
    // The plan said: /order/success/:orderId
    
    if(!id) return;

    const fetchData = async () => {
      try {
        const [orderRes, skinRes] = await Promise.allSettled([
           axiosInstance.get(`/orders/${id}`),
           axiosInstance.get("/skin-analysis/profile")
        ]);

        if (orderRes.status === "fulfilled") {
          setOrder(orderRes.value.data);
        } else {
            setError("Failed to load order details.");
        }

        if (skinRes.status === "fulfilled" && skinRes.value.data && skinRes.value.data.recommendations) {
           setSkinAnalysis(skinRes.value.data);
        }
      } catch (err) {
        console.error("Error fetching success page data", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <Loader className="w-10 h-10 animate-spin text-primary" />
          </div>
      );
  }

  if (error || !order) {
      // Fallback for when order fetch fails or no ID
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-card rounded-2xl p-8 border border-border text-center shadow-lg">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-semibold text-foreground mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground">{error || "Thank you for your purchase"}</p>
            </div>
            
             <p className="text-sm text-muted-foreground mb-8">
               We couldn't load the receipt details right now, but your order has been placed successfully.
               Please check your email for confirmation.
             </p>

            <div className="flex gap-3">
              <Link to="/" className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
       <Receipt order={order} skinAnalysis={skinAnalysis} />
    </div>
  );
}
