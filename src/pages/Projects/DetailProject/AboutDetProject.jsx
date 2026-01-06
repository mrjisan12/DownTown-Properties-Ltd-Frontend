import React from "react";
import { motion } from "framer-motion";
import { 
  Maximize, Navigation, Map, ShieldCheck, Info, Layers 
} from "lucide-react";

const AboutDetProject = ({ project }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="bg-[#FAF9F6] overflow-x-hidden">
      
      {/* --- SECTION 1: LARGE IMAGE LEFT / TEXT OFFSET RIGHT --- */}
      <section className="relative w-full min-h-screen flex items-center pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex-row w-full items-center gap-12 lg:gap-0">
          
          {/* MASSIVE IMAGE LEFT (70% width on desktop) */}
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-[65%] h-[60vh] lg:h-[85vh] relative z-10"
          >
            <img
              src={project.image || project.banner}
              alt="Architecture"
              className="w-full h-full object-cover shadow-2xl"
            />
          </motion.div>

          {/* TEXT BOX OFFSET RIGHT (Floating over the gap) */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-[45%] px-8 lg:px-20 lg:-ml-[10%] z-20 bg-[#FAF9F6]/90 backdrop-blur-sm py-16"
          >
            <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-slate-400 block mb-6">
              The Concept
            </span>
            <h1 className="text-5xl md:text-8xl font-serif leading-[0.9] mb-8 text-slate-900">
              True <br />
              <span className="italic font-light text-slate-400">Elegance</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-md">
              {project.description || "A statement of architectural mastery, blending the boundaries between nature and urban structure."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: THE SPECS (STAGGERED CENTER-RIGHT) --- */}
      <section className="w-full py-32 px-8 lg:px-24">
        <div className="flex flex-col lg:flex-row-reverse items-start gap-20">
          
          {/* SMALLER SECONDARY IMAGE (The "Stagger") */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-[40%] h-125"
          >
            <img 
              src={project.secondary_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-xl"
              alt="Detail"
            />
          </motion.div>

          {/* THE GRID */}
          <div className="w-full lg:w-[50%]">
             <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20"
            >
              <DetailBox icon={<Map size={20}/>} label="LAND AREA" value={project.land_area || "20 Kathas"} />
              <DetailBox icon={<Navigation size={20}/>} label="ORIENTATION" value={project.orientation || "South Facing"} />
              <DetailBox icon={<Info size={20}/>} label="PROJECT TYPE" value={project.project_type || "Residential"} />
              <DetailBox icon={<Maximize size={20}/>} label="FRONT ROAD" value={project.front_road_width || "60 Feet"} />
              <DetailBox 
                icon={<ShieldCheck size={20}/>} 
                label="RAJUK APPROVAL" 
                value={project.rajuk_approval_no || "106/34/308/19"} 
                isFull 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: FULL WIDTH BOLD STATS --- */}
      <section className="bg-secondary py-32 text-white">
        <div className="w-full px-8 lg:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4">
            <BigStat number={project.no_of_floors || "G+13"} label="Storeys" />
            <BigStat number={project.no_of_apartments || "12"} label="Units" />
            <BigStat number={project.no_of_basements || "02"} label="Basements" />
            <BigStat number={project.no_of_parking || "36"} label="Parking" />
          </div>
        </div>
      </section>
    </div>
  );
};

const DetailBox = ({ icon, label, value, isFull }) => (
  <div className={`group ${isFull ? 'md:col-span-2' : ''}`}>
    <div className="flex items-center gap-3 text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
      {icon}
      {label}
    </div>
    <p className="text-4xl font-light text-secondary tracking-tight border-b border-slate-200 pb-6 group-hover:border-secondary transition-colors duration-500">
      {value}
    </p>
  </div>
);

const BigStat = ({ number, label }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="border-l border-slate-700 pl-8"
  >
    <span className="text-6xl md:text-8xl font-serif block mb-2">{number}</span>
    <span className="text-[10px] tracking-[0.5em] font-bold text-slate-500 uppercase">
      {label}
    </span>
  </motion.div>
);

export default AboutDetProject;