import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Phone, X, ArrowRight, Share2, ExternalLink, Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
// eslint-disable-next-line no-unused-vars
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
  default: <ExternalLink size={20} />,
};

const Navbar = ({socialLinks}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef(null);
  

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 50) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const getPlatformIcon = (platform) => {
    const key = platform.toLowerCase();
    return platformIcons[key] || platformIcons.default;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-60"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-70"
      >
        <div className="h-0.5 w-full bg-linear-to-r from-transparent via-primary/40 to-transparent" />
        
        <div className="mx-auto px-6 h-24 flex items-center justify-between bg-background/80 backdrop-blur-2xl border-b border-white/5">
          
          {/* Logo - Positioned Left */}
          <motion.div 
            className="flex-1 flex justify-start"
            whileHover={{ scale: 1.02 }}
          >
            <NavLink to="/">
              <img 
                src="/src/assets/dwntwn.png" 
                alt="Logo" 
                className="h-12 w-auto drop-shadow-2xl" 
              />
            </NavLink>
          </motion.div>

          {/* New Centered Title - Desktop & Tablet */}
          <div className="hidden sm:flex flex-2 flex-col items-center justify-center text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl font-bold tracking-[0.15em] uppercase bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent"
            >
              Down Town Properties LTD
            </motion.h1>
            <div className="h-1px w-24 bg-linear-to-r from-transparent via-primary to-transparent mt-1 opacity-50" />
          </div>

          {/* Menu Toggle - Positioned Right */}
          <div className="flex-1 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="group flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-foreground/70">Menu</span>
              <div className="w-6 h-4 flex flex-col justify-between items-end">
                <motion.span 
                   animate={{ width: isOpen ? "100%" : "100%", rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
                   className="h-0.5 bg-primary w-full rounded-full origin-right" 
                />
                <motion.span 
                   animate={{ opacity: isOpen ? 0 : 1 }}
                   className="h-0.5 bg-primary w-2/3 rounded-full" 
                />
                <motion.span 
                   animate={{ width: isOpen ? "100%" : "100%", rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
                   className="h-0.5 bg-primary w-full rounded-full origin-right" 
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Slide-out Menu (Sidebar) */}
      <motion.div
        ref={menuRef}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-screen w-full max-w-105 bg-card/95 backdrop-blur-3xl border-l border-white/10 shadow-2xl z-80 overflow-y-auto"
      >
        <div className="relative flex flex-col h-full p-10">
          <div className="flex justify-between items-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-black">Navigation</span>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    group flex items-center justify-between py-4 text-3xl font-light tracking-tighter
                    ${isActive ? "text-primary" : "text-foreground/60 hover:text-foreground"}
                    transition-all duration-300
                  `}
                >
                  {item.label}
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                </NavLink>
              </motion.div>
            ))}
          </nav>

          <div className="mt-auto pt-10">
            <div className="grid grid-cols-4 gap-4 mb-10">
              {socialLinks.map((social) => (
                <a 
                  key={social.id} 
                  href={social.url} 
                  target="_blank" 
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/50 hover:text-primary transition-all"
                >
                  {getPlatformIcon(social.platform)}
                </a>
              ))}
            </div>
            
            <a
              href="tel:01712345667"
              className="flex text-white items-center justify-center gap-4 bg-primary  p-5 rounded-2xl font-bold hover:scale-[1.02] transition-transform"
            >
              <Phone size={20} />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;