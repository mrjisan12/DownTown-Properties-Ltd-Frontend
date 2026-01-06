import React from "react";
import { motion } from "framer-motion";

const ChairmanSpeech = ({ data }) => {
  // Animation variants for the typing effect
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.02,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-20 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Text Content */}
        <div className="w-full md:w-3/5 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-4 block">
              Leadership Message
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              {data?.name}
            </h2>
          </motion.div>

          {/* Typing Effect Description */}
          <div className="relative">
            <span className="absolute -top-10 -left-8 text-8xl font-serif text-gray-100 select-none">
              “
            </span>
            <motion.div
              variants={sentence}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed italic"
            >
              {data?.description?.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Signature / Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-10 pt-8 border-t border-gray-100 flex items-center gap-6"
          >
            {data?.signature ? (
              <img src={data.signature} alt="Signature" className="h-16 object-contain" />
            ) : (
              <div className="h-1 bg-gray-900 w-12" />
            )}
            <p className="text-gray-500 font-medium">Chairman of the Board</p>
          </motion.div>
        </div>

        {/* Right Side: Cinematic Image */}
        <div className="w-full md:w-2/5 relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 group"
          >
            {/* The Floating Image */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white"
            >
              <img
                src={data?.image}
                alt={data?.name}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay linear for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Background Decorative Shapes */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full -z-10 opacity-60"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-100 rounded-lg -z-10 rotate-12" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ChairmanSpeech;