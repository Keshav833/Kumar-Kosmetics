import { useRef } from "react";
import LogoLoop from "../ui/LogoLoop";

export default function ProductCategoryCircles({ filters, setFilters }) {
  const categories = [
    { name: "Serum", image: "/serum.jpg" },
    { name: "Cleanser", image: "/Cleanser.jpg" },
    { name: "Moisturizer", image: "/moisturiser.jpg" },
    { name: "Mask", image: "/mask.jpg" },
    { name: "Toner", image: "/toner.jpg" },
    { name: "Treatment", image: "/treatment.jpg" },
    { name: "Sunscreen", image: "/sunscreen.jpg" },
  ];

  const handleCategoryClick = (categoryName) => {
    // Single-select behavior as requested:
    // If clicking the already selected category, deselect it (toggle off).
    // If clicking a new category, select only that one (replace current selection).
    const isSelected = filters.category.includes(categoryName);
    const newCategories = isSelected ? [] : [categoryName];
      
    setFilters({ ...filters, category: newCategories });
  };

  return (
    <div className="w-full mb-10 overflow-hidden relative group">
      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-white/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-white/40 to-transparent z-10 pointer-events-none" />

      <LogoLoop
        logos={categories}
        speed={90} // Adjust speed as needed
        direction="left"
        logoHeight={128} // Approx height for the circle container including padding
        gap={50}
        pauseOnHover={true}
        renderItem={(cat, key) => {
          const isSelected = filters.category.includes(cat.name);
          // Check if this is a "duplicate" copy created by LogoLoop (copyIndex > 0)
          // key format is usually "copyIndex-itemIndex" e.g. "0-1" or "1-1"
          const isDuplicate = key && key.toString().split('-')[0] !== '0';

          // Use 'div' for duplicates to prevent keyboard focus (fixing aria-hidden error)
          // while keeping mouse interactivity.
          const Component = isDuplicate ? 'div' : 'button';

          return (
            <Component
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-center gap-3 group/btn focus:outline-none cursor-pointer"
              role="button"
              tabIndex={isDuplicate ? -1 : 0}
            >
              <div 
                className={`
                  relative w-20 h-20 md:w-32 md:h-32 rounded-full p-1 transition-all duration-300
                  ${isSelected ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-transparent hover:ring-2 hover:ring-gray-200 hover:ring-offset-2"}
                `}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-sm">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/btn:scale-110"
                  />
                </div>
              </div>
              
              <span 
                className={`
                  text-sm font-medium tracking-wide transition-colors duration-200
                  ${isSelected ? "text-primary font-semibold" : "text-gray-600 group-hover/btn:text-black"}
                `}
              >
                {cat.name}
              </span>
            </Component>
          );
        }}
      />
    </div>
  );
}
