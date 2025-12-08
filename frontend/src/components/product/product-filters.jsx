import { ChevronRight } from "lucide-react"
import { useState } from "react"

export default function ProductFilters({ filters, setFilters }) {
  const [expandedSections, setExpandedSections] = useState({
    skinType: false,
    category: false,
    price: false,
    concern: false,
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      skinType: false,
      category: false,
      price: false,
      concern: false,
      [section]: !prev[section]
    }))
  }

  const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal']
  const categories = ['Skincare', 'Cosmetics', 'Masks', 'Serums', 'Creams']
  const concerns = ['Acne', 'Pigmentation', 'Dullness', 'Wrinkles', 'Dark Circles', 'Dryness']

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: filters[key].includes(value)
        ? filters[key].filter((item) => item !== value)
        : [...filters[key], value]
    })
  }

  const clearAll = () => {
    setFilters({
      skinType: [],
      category: [],
      priceRange: [0, 5000],
      concern: [],
    })
  }

  const hasActiveFilters = 
    filters.skinType.length > 0 || 
    filters.category.length > 0 || 
    filters.concern.length > 0 || 
    filters.priceRange[0] !== 0 || 
    filters.priceRange[1] !== 5000;

  return (
    <div className="sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar font-sans px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xs font-bold tracking-wider text-gray-400">FILTERS</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-[10px] text-gray-400 hover:text-gray-600 underline tracking-wider transition-colors"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Skin Type Section */}
      <div className="border-b border-gray-200 pb-1 mb-4">
        <button
          onClick={() => toggleSection('skinType')}
          className="w-full flex justify-between items-center text-left mb-2 group"
        >
          <span className="text-xs tracking-wider text-gray-400 uppercase">Skin Type</span>
          <ChevronRight 
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out ${expandedSections.skinType ? 'rotate-90' : 'rotate-0'}`} 
          />
        </button>

        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.skinType ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="space-y-3 pt-3">
              {skinTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleFilterChange('skinType', type)}
                  className={`block w-full text-left text-xs tracking-wide transition-colors ${
                    filters.skinType.includes(type)
                      ? 'font-bold text-black'
                      : 'font-normal text-black hover:text-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="border-b border-gray-200 pb-1 mb-4">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex justify-between items-center text-left mb-2 group"
        >
          <span className="text-xs tracking-wider text-gray-400 uppercase">Category</span>
          <ChevronRight 
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out ${expandedSections.category ? 'rotate-90' : 'rotate-0'}`} 
          />
        </button>

        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.category ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="space-y-3 pt-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange('category', cat)}
                  className={`block w-full text-left text-xs tracking-wide transition-colors ${
                    filters.category.includes(cat)
                      ? 'font-bold text-black'
                      : 'font-normal text-black hover:text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Concerns Section */}
      <div className="border-b border-gray-200 pb-1 mb-4">
        <button
          onClick={() => toggleSection('concern')}
          className="w-full flex justify-between items-center text-left mb-2 group"
        >
          <span className="text-xs tracking-wider text-gray-400 uppercase">Concerns</span>
          <ChevronRight 
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out ${expandedSections.concern ? 'rotate-90' : 'rotate-0'}`} 
          />
        </button>

        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.concern ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="space-y-3 pt-3">
              {concerns.map((concern) => (
                <button
                  key={concern}
                  onClick={() => handleFilterChange('concern', concern)}
                  className={`block w-full text-left text-xs tracking-wide transition-colors ${
                    filters.concern.includes(concern)
                      ? 'font-bold text-black'
                      : 'font-normal text-black hover:text-gray-600'
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Price Range Section */}
      <div className="pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex justify-between items-center text-left mb-2 group"
        >
          <span className="text-xs tracking-wider text-gray-400 uppercase">Price Range</span>
          <ChevronRight 
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out ${expandedSections.price ? 'rotate-90' : 'rotate-0'}`} 
          />
        </button>

        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${expandedSections.price ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="pt-4">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-black font-medium">₹{filters.priceRange[0]}</span>
                  <span className="text-xs text-black font-medium">₹{filters.priceRange[1]}</span>
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
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
