import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Kumar Kosmetics changed my skin routine completely. The products are luxurious and truly effective. Highly recommended!",
    author: "Priya Sharma",
    role: "Skincare Enthusiast"
  },
  {
    text: "I have sensitive skin and was hesitant about trying new brands. Kumar Kosmetics was a game-changer for me.",
    author: "Aisha Patel",
    role: "Beauty Blogger"
  },
  {
    text: "The quality is unmatched. My clients absolutely love using these products as their base. Worth every penny!",
    author: "Neha Gupta",
    role: "Makeup Artist"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Testimonials() {
  return (
    <section className="px-8 md:px-16 lg:px-24 py-24 bg-[#fafafa]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-light text-gray-900 mb-4"
        >
          Loved by Thousands
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Real testimonials from our happy customers
        </motion.p>
      </div>

      {/* Testimonials */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition duration-300"
          >
            {/* Added Star Rating as optional enhancement */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-gray-700 leading-relaxed mb-6 font-light">
              “{testimonial.text}”
            </p>

            <div className="border-t border-gray-100 pt-4">
              <p className="font-medium text-gray-900">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
