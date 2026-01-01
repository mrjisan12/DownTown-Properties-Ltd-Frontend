import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Facebook, 
  Linkedin, 
  Award, 
  Users,
  X
} from "lucide-react";

const Staff = ({ staff = [], loading }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const designations = ["all", ...new Set(staff.map(member => member.designation))];
  const filteredStaff = activeFilter === "all" 
    ? staff 
    : staff.filter(member => member.designation === activeFilter);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[450px] bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (!staff.length) return null;

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-20 pointer-events-none" />

      <div className="container relative mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Our Leadership</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            The Experts Driving <span className="text-primary">Our Success</span>
          </h2>
          
          {/* Professional Filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {designations.map((designation) => (
              <button
                key={designation}
                onClick={() => setActiveFilter(designation)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeFilter === designation
                    ? "bg-primary border-primary text-white shadow-md"
                    : "bg-transparent border-slate-200 text-slate-600 hover:border-primary/50"
                }`}
              >
                {designation === "all" ? "View All" : designation}
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredStaff.map((member) => (
            <motion.div
              key={member.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative"
              onMouseEnter={() => setHoveredCard(member.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative h-130 bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-pointer">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Absolute Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <p className="text-primary font-bold text-xs uppercase tracking-wider mb-2">
                    {member.designation}
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                    {member.description}
                  </p>

                  {/* Socials - Simple & Solid */}
                  <div className="flex gap-3 pt-4 border-t border-slate-50">
                    {member.email && <SocialIcon icon={<Mail size={16} />} href={`mailto:${member.email}`} color="bg-primary" />}
                    {member.linkedin_url && <SocialIcon icon={<Linkedin size={16} />} href={member.linkedin_url} color="bg-slate-800" />}
                    {member.facebook_url && <SocialIcon icon={<Facebook size={16} />} href={member.facebook_url} color="bg-secondary" />}
                  </div>
                </div>

                {/* Professional Bottom Accent */}
                <div className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ${hoveredCard === member.id ? 'w-full' : 'w-0'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simplified Stats Bar */}
        {/* <div className="mt-24 py-12 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem label="Specialists" value={staff.length} color="text-primary" />
          <StatItem label="Years Experience" value="15+" color="text-slate-900" />
          <StatItem label="Projects" value="200+" color="text-slate-900" />
          <StatItem label="Client Rating" value="4.9/5" color="text-secondary" />
        </div> */}
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex flex-col md:flex-row">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-slate-50"
                >
                  <X size={20} />
                </button>
                <div className="w-full md:w-1/2 h-80 md:h-auto">
                  <img src={selectedMember.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="p-8 md:w-1/2">
                  <span className="text-primary font-bold text-xs uppercase">{selectedMember.designation}</span>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">{selectedMember.name}</h3>
                  <p className="text-slate-600 leading-relaxed mb-8">{selectedMember.description}</p>
                  <div className="flex flex-col gap-3">
                    <a href={`mailto:${selectedMember.email}`} className="flex items-center gap-3 text-slate-700 hover:text-primary transition-colors">
                      <div className="p-2 bg-slate-100 rounded-lg"><Mail size={18} /></div>
                      {selectedMember.email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const SocialIcon = ({ icon, href, color }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer"
    className={`p-2 rounded-lg text-white ${color} hover:opacity-80 transition-all`}
  >
    {icon}
  </a>
);

const StatItem = ({ label, value, color }) => (
  <div className="text-center md:text-left">
    <div className={`text-3xl font-bold ${color} mb-1`}>{value}</div>
    <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">{label}</div>
  </div>
);

export default Staff;