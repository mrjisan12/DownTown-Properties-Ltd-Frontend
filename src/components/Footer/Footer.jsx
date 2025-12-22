import { Phone, Mail, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Company Info */}
        <div>

          <div className="flex items-center mb-1.5">
          <img
            src="/src/assets/dwntwn.png"
            alt="Downtown Properties Ltd"
            className="h-10 object-contain"
          />
        </div>
          {/* <h2 className="text-xl font-semibold text-white mb-3">
            Downtown Properties Ltd
          </h2> */}
          <p className="text-sm leading-relaxed">
            We provide trusted real estate solutions including apartments,
            lands, and commercial properties across Bangladesh.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-white">About</NavLink></li>
            <li><NavLink to="/projects" className="hover:text-white">Projects</NavLink></li>
            <li><NavLink to="/gallery" className="hover:text-white">Gallery</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white">Contact</NavLink></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Our Services
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Residential Apartments</li>
            <li>Commercial Space</li>
            <li>Land Development</li>
            <li>Property Consultancy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Contact Us
          </h3>

          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Dhanmondi, Dhaka
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> 01712-345667
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> info@downtownproperties.com
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Downtown Properties Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
