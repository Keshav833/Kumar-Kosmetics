import { Link } from "react-router-dom"
import axiosInstance from "@/lib/axios"
import { toast } from "react-hot-toast"

export default function CartSummary({ 
    items, 
    onCheckout, 
    couponCode, 
    setCouponCode, 
    isCouponApplied, 
    setIsCouponApplied, 
    discount, 
    setDiscount 
}) {
  const inclusiveSubtotal = items.reduce((sum, item) => sum + ((item.product?.price || 0) * item.quantity), 0)
  const tax = Math.round(inclusiveSubtotal - (inclusiveSubtotal / 1.18))
  const subtotal = inclusiveSubtotal - tax
  
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const standardShipping = totalQuantity * 50
  const shipping = inclusiveSubtotal > 1500 ? 0 : standardShipping
  
  const total = inclusiveSubtotal + shipping - discount

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
        const res = await axiosInstance.post("/cart/validate-coupon", { code: couponCode });
        if (res.data.valid) {
            setIsCouponApplied(true);
            if (res.data.type === 'free_delivery') {
                if (shipping > 0) {
                    setDiscount(shipping);
                    toast.success(res.data.message);
                } else {
                    toast.success("Free delivery already applied on orders above ₹1500!");
                    setDiscount(0);
                }
            }
        }
    } catch (error) {
        console.error("Coupon error:", error);
        toast.error(error.response?.data?.message || "Invalid Coupon Code");
        setIsCouponApplied(false);
        setDiscount(0);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-border h-fit sticky top-24">
      <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>

      {/* Breakdown */}
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground font-medium">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (18%)</span>
          <span className="text-foreground font-medium">₹{tax}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-primary' : 'text-foreground'}`}>
            {shipping === 0 ? 'Free' : `₹${shipping}`}
          </span>
        </div>
        {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
                <span>Discount (Coupon)</span>
                <span>-₹{discount}</span>
            </div>
        )}
      </div>

      {shipping === 0 ? (
        <div className="bg-primary/10 rounded-lg p-3 mt-4 mb-4 text-xs text-primary font-medium">
          Free shipping applied!
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-3 mt-4 mb-4 text-xs text-muted-foreground font-medium">
          Add items worth ₹{1500 - inclusiveSubtotal} more for free shipping
        </div>
      )}


      {/* Total */}
      <div className="flex justify-between mb-6 pt-4">
        <span className="text-lg font-semibold text-foreground">Total</span>
        <div className="text-right">
            {discount > 0 && (
                <span className="block text-sm text-muted-foreground line-through">₹{total + discount}</span>
            )}
            <span className="text-2xl font-bold text-primary">₹{total}</span>
        </div>
      </div>

      {/* Promo Code */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-foreground mb-2">Promo Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={isCouponApplied}
            className="flex-1 px-3 py-2 border border-border rounded-lg text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button 
            onClick={handleApplyCoupon}
            disabled={isCouponApplied || !couponCode}
            className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-border transition-colors disabled:opacity-50"
          >
            {isCouponApplied ? "Applied" : "Apply"}
          </button>
        </div>
        {isCouponApplied && (
            <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                <span className="text-sm">✓</span> Coupon applied successfully!
            </p>
        )}
      </div>

      {/* Checkout Button */}
      <button 
        onClick={onCheckout}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mb-3"
      >
        Proceed to Checkout
      </button>

      {/* Continue Shopping */}
      <Link to="/products" className="block">
        <button className="w-full bg-muted text-foreground py-3 rounded-lg font-semibold hover:bg-border transition-colors">
          Continue Shopping
        </button>
      </Link>

      {/* Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-xs text-muted-foreground space-y-2">
          <p>✓ Secure checkout</p>
          <p>✓ 14-day return policy</p>
          <p>✓ Customer support available</p>
        </div>
      </div>
    </div>
  )
}
