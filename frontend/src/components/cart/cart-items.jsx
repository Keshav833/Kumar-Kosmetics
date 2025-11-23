import { Trash2 } from "lucide-react"

export default function CartItems({ items, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="bg-white rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow">
          <div className="flex gap-6">
            {/* Image */}
            <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
              <p className="text-lg font-semibold text-primary">₹{item.price}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 font-medium">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Subtotal</p>
              <p className="font-semibold text-foreground">₹{item.price * item.quantity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
