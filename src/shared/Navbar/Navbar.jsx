import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/src/assets/dwntwn.png"
            alt="Downtown Properties Ltd"
            className="h-13 object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Contact Icons */}
          <div className="flex items-center gap-2">
            <a
              href="tel:01712345667"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Phone size={16} /> 01712345667
            </a>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-600"
            >
              {item.label}
            </NavLink>
          ))}

          {/* Mobile Contact Icons */}
          <div className="flex flex-col gap-2 mt-2">
            <a
              href="tel:01712345667"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Phone size={16} /> Call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
