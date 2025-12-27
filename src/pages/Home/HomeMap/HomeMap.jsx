import React, { useState } from "react";

const HomeMap = ({ google_map_embed, loading }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selected, setSelected] = useState({
    location: "All Location",
    status: "Project Status",
    type: "Project Type",
  });

  const dropdownMenus = {
    location: ["All Location", "Location 1", "Location 2"],
    status: ["Project Status", "Completed", "In Progress", "Pending"],
    type: ["Project Type", "Residential", "Commercial", "Industrial"],
  };

  const handleSelect = (dropdown, value) => {
    setSelected((prev) => ({ ...prev, [dropdown]: value }));
    setOpenDropdown(null);
  };

  return (
    <section
      className="relative w-full py-24 bg-center bg-cover"
      style={{
        backgroundImage: "url('/src/assets/map-bg.png')",
        backgroundColor: "#d7d2ce",
      }}
    >
      {/* soft white overlay */}
      <div className="absolute inset-0 bg-white/0"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Find Us
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Visit our office or locate us on the map
        </p>

        {/* Map */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-14 h-14 rounded-full border-4 border-t-blue-600 border-gray-300 animate-spin" />
            <p className="mt-3 text-gray-600">Loading map...</p>
          </div>
        ) : (
          <div className="w-full h-[600px] bg-white shadow-lg rounded-sm overflow-hidden border border-gray-200">
            <iframe
              src={google_map_embed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* 3 Dropdowns - Bottom Left (Light gray menu background) */}
            <div className="absolute bottom-6 left-6 flex space-x-3 z-10">
              {["location", "status", "type"].map((key) => (
                <div key={key} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === key ? null : key)
                    }
                    className="flex items-center justify-between w-44 px-4 py-3 bg-white border border-gray-300 shadow-md text-sm font-medium text-gray-700"
                  >
                    {selected[key]}
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform ${
                        openDropdown === key ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu opens upward with soft light gray background */}
                  {openDropdown === key && (
                    <ul className="absolute left-0 bottom-full mb-1 w-44 bg-gray-100 border border-gray-200 shadow-lg">
                      {dropdownMenus[key].map((item) => (
                        <li
                          key={item}
                          onClick={() => handleSelect(key, item)}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeMap;
