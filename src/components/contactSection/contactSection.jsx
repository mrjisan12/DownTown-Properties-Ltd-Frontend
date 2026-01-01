import React, { useState, useEffect, useMemo, useRef } from "react";

const ContactSection = ({ settings, socials }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      // Calculate movement from center
      const x = (clientX - window.innerWidth / 2) / 50;
      const y = (clientY - window.innerHeight / 2) / 50;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const data = settings?.data?.[0];
  const sortedSocials = useMemo(() => {
    if (!socials?.data) return [];
    return [...socials.data].sort((a, b) => Number(a.position) - Number(b.position));
  }, [socials]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center py-20 overflow-hidden bg-[#faf9f6]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-[-10%] left-[-5%] w-125 h-125  rounded-full blur-[120px] opacity-20 transition-transform duration-1000 ease-out"
          style={{ 
            background: '#978c21',
            transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)` 
          }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-5%] w-150 h-150  rounded-full blur-[150px] opacity-20 transition-transform duration-1000 ease-out"
          style={{ 
            background: '#b3a732',
            transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)` 
          }}
        />
      </div>

      <div className="w-full mx-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: CONTENT --- */}
          <div className={`space-y-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase text-[#978c21] bg-[#978c21]/10 rounded-full">
                Get In Touch
              </span>
              <h2 className="text-6xl md:text-8xl font-light leading-tight text-gray-900 tracking-tighter">
                Let’s start <br /> 
                <span className="font-serif italic text-[#978c21]">something.</span>
              </h2>
            </div>

            <div className="grid gap-6">
              {[
                { label: "Email Us", val: data?.primary_email || "hello@luxury.com", icon: "📧" },
                { label: "Call Us", val: data?.primary_phone || "+1 234 567 890", icon: "📱" },
                { label: "Visit Us", val: data?.address || "123 Design St. New York", icon: "📍" }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="group flex items-center p-6 bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl transition-all hover:bg-white/80 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#978c21] text-white rounded-2xl text-xl mr-6 shadow-lg shadow-[#978c21]/20">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">{item.label}</p>
                    <p className="text-lg font-medium text-gray-800">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-6">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Follow:</p>
              <div className="flex gap-4">
                {sortedSocials.map((social) => (
                  <a 
                    key={social.id} 
                    href={social.url} 
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-white hover:bg-[#978c21] hover:scale-110 transition-all duration-300"
                  >
                    <img src={social.icon} alt="" className="w-5 h-5 invert group-hover:invert-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CINEMATIC IMAGE --- */}
          <div className={`relative group transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative rounded-[40px] overflow-hidden aspect-4/5 shadow-2xl">
              {/* Image with subtle zoom on hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2073&q=80')",
                  transform: `scale(1.05) translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
                }}
              />
              
              {/* Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-[#978c21]/10 mix-blend-overlay" />

            </div>

            {/* Decorative Elements around image */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-[12px] border-[#978c21]/20 rounded-full animate-spin-slow" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#978c21]/5 rounded-full blur-3xl" />
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;