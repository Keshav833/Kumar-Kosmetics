import { useRef } from "react";

export default function ProductCategoryCircles({ filters, setFilters }) {
  const scrollContainerRef = useRef(null);

  /* 
    Keyframes are defined in the style tag below to ensure they work without global css changes.
    The animation moves the track from 0% to -50% because the content is duplicated.
  */
  const categoriesBase = [
    { name: "Serum", image: "/serum.jpg" },
    { name: "Cleanser", image: "/Cleanser.jpg" },
    { name: "Moisturiser", image: "/moisturiser.jpg" },
    { name: "Mask", image: "/mask.jpg" },
    { name: "Toner", image: "/toner.jpg" },
    { name: "Treatment", image: "/treatment.jpg" },
    { name: "Sunscreen", image: "/sunscreen.jpg" },
  ];
  
  // Duplicate categories for seamless loop
  const categories = [...categoriesBase, ...categoriesBase];

  const handleCategoryClick = (categoryName) => {
    // Toggle logic: if already selected, remove it. If not, add it.
    // NOTE: If you want single-select behavior (radio button style), uncomment the line below and comment out the toggle logic.
    /* 
    const isSelected = filters.category.includes(categoryName);
    setFilters({ ...filters, category: isSelected ? [] : [categoryName] }); 
    */
   
    // Multi-select behavior logic (consistent with sidebar)
    const isSelected = filters.category.includes(categoryName);
    let newCategories;
    if (isSelected) {
      newCategories = filters.category.filter((c) => c !== categoryName);
    } else {
      newCategories = [...filters.category, categoryName];
    }
    setFilters({ ...filters, category: newCategories });
  };

  return (
    <div className="w-full mb-10 overflow-hidden relative group">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
      
      <div 
        ref={scrollContainerRef}
        className="flex w-max animate-scroll"
      >
        {categories.map((cat, index) => {
          const isSelected = filters.category.includes(cat.name);
          
          return (
            <button
              key={`${cat.name}-${index}`} // Use index to generate unique keys for duplicates
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-center gap-3 group flex-shrink-0 focus:outline-none mx-6 md:mx-10 my-3"
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
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>
              </div>
              
              <span 
                className={`
                  text-sm font-medium tracking-wide transition-colors duration-200
                  ${isSelected ? "text-primary font-semibold" : "text-gray-600 hover:text-black"}
                `}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
