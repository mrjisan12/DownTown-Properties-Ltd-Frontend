import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  Phone, X, ArrowRight, ExternalLink, 
  Instagram, Facebook, Twitter, Linkedin, Youtube 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const platformIcons = {
  instagram: <Instagram size={20} />,
  facebook: <Facebook size={20} />,
  twitter: <Twitter size={20} />,
  linkedin: <Linkedin size={20} />,
  youtube: <Youtube size={20} />,
  whatsapp: <Phone size={20} />,
  default: <ExternalLink size={20} />,
};

const Navbar = ({ socialLinks = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const sortedSocialLinks = [...socialLinks].sort((a, b) => a.position - b.position);

  const getPlatformIcon = (platform) => {
    const key = platform?.toLowerCase();
    return platformIcons[key] || platformIcons.default;
  };

  // Scroll logic solely for showing/hiding the bar, not for changing transparency
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[60]" // Dark overlay for the menu only
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-[70] bg-transparent border-none"
      >
        <div className="mx-auto px-6 h-24 flex items-center justify-between">
          
          {/* Logo */}
          <motion.div className="flex-1 flex justify-start" whileHover={{ scale: 1.02 }}>
            <NavLink to="/">
              <img 
                src="/src/assets/dwntwn.png" 
                alt="Logo" 
                className="h-12 w-auto drop-shadow-xl" 
              />
            </NavLink>
          </motion.div>

          {/* Centered Title */}
          <div className="hidden sm:flex flex-[2] flex-col items-center justify-center text-center">
            <motion.h1 
              className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase text-white drop-shadow-lg"
            >
              Down Town Properties LTD
            </motion.h1>
          </div>

          {/* Menu Toggle Button */}
          <div className="flex-1 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            >
              <span className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-white">Menu</span>
              <div className="w-5 h-3 flex flex-col justify-between items-end">
                <motion.span 
                   animate={{ width: "100%", rotate: isOpen ? 45 : 0, y: isOpen ? 5.5 : 0 }}
                   className="h-[1.5px] bg-primary w-full rounded-full origin-right" 
                />
                <motion.span 
                   animate={{ opacity: isOpen ? 0 : 1 }}
                   className="h-[1.5px] bg-primary w-2/3 rounded-full" 
                />
                <motion.span 
                   animate={{ width: "100%", rotate: isOpen ? -45 : 0, y: isOpen ? -5.5 : 0 }}
                   className="h-[1.5px] bg-primary w-full rounded-full origin-right" 
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="fixed top-0 right-0 h-screen w-full max-w-[450px] bg-neutral-950 border-l border-white/10 shadow-2xl z-[80] overflow-y-auto"
      >
        <div className="relative flex flex-col h-full p-12">
          <div className="flex justify-between items-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.5em] text-primary font-black">Navigation</span>
            <button onClick={() => setIsOpen(false)} className="p-3 text-white hover:bg-white/5 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 30 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    group flex items-center justify-between py-5 text-4xl font-light tracking-tighter
                    ${isActive ? "text-primary" : "text-white/60 hover:text-white"}
                    transition-all duration-300
                  `}
                >
                  {item.label}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-primary" size={28} />
                </NavLink>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            <div className="grid grid-cols-5 gap-3 mb-8">
              {sortedSocialLinks.map((social) => (
                <a 
                  key={social.id} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all"
                >
                  {getPlatformIcon(social.platform)}
                </a>
              ))}
            </div>
            
            <a
              href="tel:01712345667"
              className="flex items-center justify-center gap-4 bg-primary text-white py-5 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              <Phone size={18} />
              <span className="uppercase tracking-widest text-xs text-white">Contact Support</span>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;