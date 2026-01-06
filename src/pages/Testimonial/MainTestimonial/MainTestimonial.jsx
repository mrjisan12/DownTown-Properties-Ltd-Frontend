import React from "react";
import { motion } from "framer-motion";

const MainTestimonial = ({ data }) => {
  // Animation variants for the container (staggering children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-xl ${i < rating ? "text-amber-400" : "text-gray-200"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="relative py-24 px-0 overflow-hidden bg-white">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            Voices of <span className="italic font-light text-gray-500">Excellence</span>
          </h2>
          <div className="w-24 h-1 bg-gray-900 mx-auto rounded-full" />
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14"
        >
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`relative group bg-white border border-gray-100 p-10 md:p-14 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] ${
                index % 3 === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Floating Quote Icon */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <span className="text-white text-4xl font-serif">“</span>
              </div>

              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Rating */}
                  <div className="flex gap-1 mb-8">
                    {renderStars(item.star)}
                  </div>

                  {/* Big Text Body */}
                  <blockquote className="text-2xl md:text-3xl font-light text-gray-800 leading-snug mb-10 italic">
                    {item.description}
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-6 mt-auto">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border-2 border-gray-100 p-1"
                    />
                    <div className="absolute inset-0 rounded-full ring-4 ring-gray-900/5 group-hover:ring-gray-900/10 transition-all" />
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 uppercase tracking-widest">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 font-medium">
                      {item.short_description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute bottom-10 right-10 opacity-5 group-hover:opacity-20 transition-opacity">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H14.017C13.4647 8 13.017 8.44772 13.017 9V15C13.017 17.2091 14.8079 19 17.017 19H17.017" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MainTestimonial;