import React from "react";
import { Link } from "react-router-dom";

// Helper to ensure paths are somewhat standard if passed correctly
// Accepting title, price, image, bgImage as props to make it reusable
const ThreeDProductCard = ({ 
  title = "Sun Screen", 
  price = "899.00", 
  image = "/sunscreen.png", 
  bgImage = "/sunscreen.jpg",
  category = "All",
  className = ""
}) => {
  return (
    <Link to={`/products?category=${category}`} className={`perspective-[2500px] w-fit ${className} block`}>
      
      <div className="group relative w-[240px] h-[340px] flex items-end justify-center p-4 transition-transform duration-500 ease-out hover:scale-[0.98] preserve-3d">
        
   
        <div className="absolute inset-0 p-2 preserve-3d">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:rotate-x-[45deg] preserve-3d">
            <img
              src={bgImage}
              className="w-full h-full object-cover"
              alt={`${title} Background`}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
        </div>

        <img
          src={image}
          alt={`${title} Product`}
          className="absolute w-[60%] scale-[1] bottom-24 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:-translate-y-8 translate-z-160 z-20 preserve-3d"
        />
        
        <div className="absolute bottom-12 w-[90%] h-6 bg-black/90 blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <div className="relative z-30 w-full text-center text-white opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:-translate-y-12 translate-y-2 translate-z-140 preserve-3d">
          <h3 className="text-2xl font-bold tracking-tight mb-8 drop-shadow-md">{title}</h3>
          {/* <p className="text-sm font-medium opacity-90 mb-3 drop-shadow-sm">₹{price}</p> */}
        </div>

        {/* Cart Button */}
        {/* FIX 5: Button Z=140 */}
        {/* <button className="absolute bottom-4 right-4 z-40 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 translate-y-4 group-hover:-translate-y-16 translate-z-140 preserve-3d">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </button> */}
      </div>
    </Link>
  );
};

export default ThreeDProductCard;
