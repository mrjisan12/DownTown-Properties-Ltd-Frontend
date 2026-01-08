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
        const targetValue = parseInt(metric.value.replace(/[^0-9]/g, ""));
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
            setAnimatedValues((prev) => ({
              ...prev,
              [metric.id]: Math.floor(start).toLocaleString(),
            }));
          }, 16);
        }
      });
    }
  }, [isInView, metrics]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 md:py-24"
    >
      {/* Background Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-200/50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            style={{ perspective: 1000 }}
            className="relative"
          >
            <motion.div
              animate={{
                rotateY: mousePos.x * 10,
                rotateX: -mousePos.y * 10,
              }}
              className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], x: [0, -10, 0], y: [0, -5, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-full h-[260px] sm:h-[360px] md:h-[440px]"
              >
                <img
                  src={about.banner}
                  alt="Corporate Banner"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Glass Badge */}
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 p-4 md:p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm md:text-lg">
                      Excellence in Service
                    </p>
                    <p className="text-white/80 text-xs md:text-sm italic">
                      Established Corporate Quality
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-3xl -z-10"
            />
          </motion.div>

          {/* CONTENT SECTION */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              <div className="flex items-center gap-3 mb-3 md:mb-4">
                <span className="h-[2px] w-6 md:w-8 bg-primary"></span>
                <span className="text-primary font-bold tracking-widest text-xs md:text-sm uppercase">
                  Legacy & Vision
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                Crafting Exceptional <br />
                <span className="text-primary underline decoration-slate-200 underline-offset-8">
                  Real Estate Experiences
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-slate-600 text-sm md:text-lg leading-relaxed border-l-4 border-slate-100  md:pl-6"
            >
              {about.who_we_are}
            </motion.p>

            {/* METRICS */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2 md:pt-4">
              {metrics.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-slate-50 border border-slate-100 p-4 md:p-6 rounded-xl md:rounded-2xl group hover:bg-primary transition-colors"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-white">
                    {animatedValues[item.id] || 0}
                    <span className="text-primary group-hover:text-white/80">
                      +
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm uppercase font-semibold group-hover:text-white/70">
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
