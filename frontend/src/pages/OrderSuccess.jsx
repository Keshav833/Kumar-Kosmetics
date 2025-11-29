import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card rounded-2xl p-8 border border-border text-center shadow-lg">
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Order Confirmed!</h2>
          <p className="text-muted-foreground">Thank you for your purchase</p>
        </div>

        <p className="text-sm text-muted-foreground mb-8">
          You'll receive a confirmation email shortly with order details and tracking information.
        </p>

        <div className="flex gap-3">
          <Link
            to="/"
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
          >
            Back to Home
          </Link>
          <Link
            to="/products"
            className="flex-1 bg-muted text-foreground py-3 rounded-lg font-medium hover:bg-border transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
