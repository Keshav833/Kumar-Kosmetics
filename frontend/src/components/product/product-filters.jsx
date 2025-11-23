import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function ProductFilters({ filters, setFilters }) {
  const [expandedSections, setExpandedSections] = useState({
    skinType: true,
    category: true,
    price: true,
    concern: true,
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
  const categories = ['Skincare', 'Cosmetics', 'Masks', 'Serums', 'Creams']
  const concerns = ['Acne', 'Pigmentation', 'Dullness', 'Wrinkles', 'Dark Circles', 'Dryness']

  const handleSkinTypeChange = (type) => {
    setFilters({
      ...filters,
      skinType: filters.skinType.includes(type)
        ? filters.skinType.filter((t) => t !== type)
        : [...filters.skinType, type]
    })
  }

  const handleCategoryChange = (cat) => {
    setFilters({
      ...filters,
      category: filters.category.includes(cat)
        ? filters.category.filter((c) => c !== cat)
        : [...filters.category, cat]
    })
  }

  const handleConcernChange = (concern) => {
    setFilters({
      ...filters,
      concern: filters.concern.includes(concern)
        ? filters.concern.filter((c) => c !== concern)
        : [...filters.concern, concern]
    })
  }

  return (
    <div className="space-y-6">
      {/* Skin Type Filter */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleSection('skinType')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-foreground">Skin Type</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.skinType ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.skinType && (
          <div className="space-y-2">
            {skinTypes.map(type => (
              <label key={type} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.skinType.includes(type)}
                  onChange={() => handleSkinTypeChange(type)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm text-foreground">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-foreground">Category</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm text-foreground">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-foreground">Price Range</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="5000"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)]
              })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Concerns Filter */}
      <div className="border border-border rounded-lg p-4">
        <button
          onClick={() => toggleSection('concern')}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-semibold text-foreground">Concerns</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.concern ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.concern && (
          <div className="space-y-2">
            {concerns.map(concern => (
              <label key={concern} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.concern.includes(concern)}
                  onChange={() => handleConcernChange(concern)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm text-foreground">{concern}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => setFilters({
          skinType: [],
          category: [],
          priceRange: [0, 5000],
          concern: [],
        })}
        className="w-full bg-muted text-foreground py-2 rounded-lg font-medium hover:bg-border transition-colors"
      >
        Reset Filters
      </button>
    </div>
  )
}
