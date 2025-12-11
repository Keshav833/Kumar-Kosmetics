import { useRef } from "react";
import LogoLoop from "../ui/LogoLoop";

export default function ProductCategoryCircles({ filters, setFilters }) {
  const categories = [
    { name: "Serum", image: "/serum.jpg" },
    { name: "Cleanser", image: "/Cleanser.jpg" },
    { name: "Moisturiser", image: "/moisturiser.jpg" },
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
      <LogoLoop
        logos={categories}
        speed={90} // Adjust speed as needed
        direction="left"
        logoHeight={128} // Approx height for the circle container including padding
        gap={50}
        pauseOnHover={true}
        renderItem={(cat) => {
          const isSelected = filters.category.includes(cat.name);
          return (
            <button
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-center gap-3 m-2 group/btn focus:outline-none"
            >
              <div 
                className={`
                  relative w-20 h-20 md:w-32 md:h-32 rounded-full p-1  transition-all duration-300
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
            </button>
          );
        }}
      />
    </div>
  );
}
