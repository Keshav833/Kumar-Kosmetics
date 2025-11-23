'use client'

import { X } from 'lucide-react'

export default function ProductQuickView({ product, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-white">
          <h2 className="text-xl font-semibold text-foreground">{product.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="bg-muted rounded-lg overflow-hidden h-48 md:h-64">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-primary font-medium mb-2">{product.category}</p>
              <p className="text-3xl font-semibold text-foreground">₹{product.price}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-primary mb-1">★ {product.rating} ({product.reviews} reviews)</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-2">Key Benefits</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✓ Suitable for {product.skinType.join(', ')} skin</li>
                <li>✓ Helps with {product.concerns.join(', ')}</li>
                {product.tags.map(tag => (
                  <li key={tag}>✓ {tag}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-2">Ingredients</h3>
              <p className="text-sm text-muted-foreground">{product.ingredients.join(', ')}</p>
            </div>

            <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
