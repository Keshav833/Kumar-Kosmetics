export default function OrderReview({ items, subtotal, tax, shipping, total }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border h-fit sticky top-24">
      <h2 className="text-xl font-semibold text-foreground mb-6">Order Review</h2>

      {/* Items */}
      <div className="space-y-4 pb-6 border-b border-border">
        {items.map((item, index) => (
          <div key={item.id || index} className="flex gap-3">
            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-border">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-foreground">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Breakdown */}
      <div className="space-y-3 py-6 border-b border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (18%)</span>
          <span className="text-foreground">₹{tax}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">₹{shipping}</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-6">
        <span className="font-semibold text-foreground">Total</span>
        <span className="text-2xl font-bold text-primary">₹{total}</span>
      </div>
    </div>
  )
}
