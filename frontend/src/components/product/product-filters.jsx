import { ChevronDown, SlidersHorizontal, RefreshCw } from "lucide-react"
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

  const resetFilters = () => {
    setFilters({
      skinType: [],
      category: [],
      priceRange: [0, 5000],
      concern: [],
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-foreground">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg">Filters</h2>
        </div>
        <button 
          onClick={resetFilters}
          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Reset
        </button>
      </div>

      <div className="space-y-1">
        
        {/* Skin Type Filter */}
        <div className="py-2">
          <button
            onClick={() => toggleSection('skinType')}
            className="flex items-center justify-between w-full py-2 group"
          >
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Skin Type</h3>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expandedSections.skinType ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`space-y-2 mt-2 transition-all duration-300 overflow-hidden ${expandedSections.skinType ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            {skinTypes.map(type => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded-lg transition-colors -mx-1.5">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={filters.skinType.includes(type)}
                    onChange={() => handleSkinTypeChange(type)}
                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-primary checked:border-primary transition-colors"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-sm transition-colors ${filters.skinType.includes(type) ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-foreground'}`}>
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-100 my-2"></div>

        {/* Category Filter */}
        <div className="py-2">
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full py-2 group"
          >
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Category</h3>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expandedSections.category ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`space-y-2 mt-2 transition-all duration-300 overflow-hidden ${expandedSections.category ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded-lg transition-colors -mx-1.5">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-primary checked:border-primary transition-colors"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-sm transition-colors ${filters.category.includes(cat) ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-foreground'}`}>
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-100 my-2"></div>

        {/* Price Range Filter */}
        <div className="py-2">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full py-2 group"
          >
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Price Range</h3>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expandedSections.price ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`mt-4 px-1 transition-all duration-300 overflow-hidden ${expandedSections.price ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
             <div className="flex justify-between items-center mb-4">
                <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm font-medium text-gray-700">₹{filters.priceRange[0]}</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">to</div>
                <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm font-medium text-gray-700">₹{filters.priceRange[1]}</div>
             </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)]
              })}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        <div className="h-px bg-gray-100 my-2"></div>

        {/* Concerns Filter */}
        <div className="py-2">
          <button
            onClick={() => toggleSection('concern')}
            className="flex items-center justify-between w-full py-2 group"
          >
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">Concerns</h3>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expandedSections.concern ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`space-y-2 mt-2 transition-all duration-300 overflow-hidden ${expandedSections.concern ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
            {concerns.map(concern => (
              <label key={concern} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-1.5 rounded-lg transition-colors -mx-1.5">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={filters.concern.includes(concern)}
                    onChange={() => handleConcernChange(concern)}
                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded checked:bg-primary checked:border-primary transition-colors"
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-sm transition-colors ${filters.concern.includes(concern) ? 'text-primary font-medium' : 'text-gray-600 group-hover:text-foreground'}`}>
                  {concern}
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
