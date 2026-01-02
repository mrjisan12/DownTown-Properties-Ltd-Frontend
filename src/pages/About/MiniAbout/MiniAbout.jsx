import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const MiniAbout = ({ about, metrics = [], loading }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [animatedValues, setAnimatedValues] = useState({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse move effect for 3D image tilt
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  // Counter animation logic
  useEffect(() => {
    if (isInView && metrics.length > 0) {
      metrics.forEach((metric) => {
        const targetValue = parseInt(metric.value.replace(/[^0-9]/g, ''));
        if (!isNaN(targetValue)) {
          let start = 0;
          const duration = 2000;
          const increment = targetValue / (duration / 16);
          const counter = setInterval(() => {
            start += increment;
            if (start >= targetValue) {
              start = targetValue;
              clearInterval(counter);
            }
            setAnimatedValues(prev => ({
              ...prev,
              [metric.id]: Math.floor(start).toLocaleString()
            }));
          }, 16);
        }
      });
    }
  }, [isInView, metrics]);

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-slate-200/50 rounded-full blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* IMAGE SECTION - "Moving Video" Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            style={{
              perspective: 1000
            }}
            className="relative"
          >
            <motion.div
              animate={{
                rotateY: mousePos.x * 10,
                rotateX: -mousePos.y * 10,
              }}
              className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100"
            >
              {/* Ken Burns Moving Image Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  x: [0, -10, 0],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-full h-137.5"
              >
                <img
                  src={about.banner}
                  alt="Corporate Banner"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Glassmorphism Badge */}
              <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm11 10H5a1 1 0 01-1-1v-4a1 1 0 011-1h10a1 1 0 011 1v4a1 1 0 01-1 1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Excellence in Service</p>
                    <p className="text-white/80 text-sm italic">Established Corporate Quality</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Floating Squares */}
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-3xl -z-10" 
            />
          </motion.div>

          {/* CONTENT SECTION */}
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[2px] w-8 bg-primary"></span>
                <span className="text-primary font-bold tracking-widest text-sm uppercase">Legacy & Vision</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Crafting Exceptional <br /> 
                <span className="text-primary underline decoration-slate-200 underline-offset-8">Real Estate Experiences</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-slate-600 text-lg leading-relaxed border-l-4 border-slate-100 pl-6 py-2"
            >
              {about.who_we_are}
            </motion.p>

            {/* METRICS GRID - Professional Solid Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {metrics.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-slate-50 border border-slate-100 p-6 rounded-2xl group hover:bg-primary transition-colors duration-500"
                >
                  <h3 className="text-3xl font-bold text-slate-900 group-hover:text-white transition-colors">
                    {animatedValues[item.id] || 0}
                    <span className="text-primary group-hover:text-white/80">+</span>
                  </h3>
                  <p className="text-slate-500 text-sm uppercase font-semibold group-hover:text-white/70 transition-colors">
                    {item.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MiniAbout;