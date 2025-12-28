import React from "react";

const FilterSection = ({ filters, setFilters, locations }) => {
  const selectStyles = "w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-black rounded-none px-4 py-4 text-sm transition-all outline-none appearance-none cursor-pointer";

  return (
    <div className="relative z-30 -mt-24 px-6"> {/* Negative margin pulls it up over banner */}
      <div className="max-w-4xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          
          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Status</label>
            <select
              className={selectStyles}
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Type */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Property Type</label>
            <select
              className={selectStyles}
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="">All Types</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Location</label>
            <select
              className={selectStyles}
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            >
              <option value="">All Locations</option>
              {locations.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Reset Action */}
          <button
            onClick={() => setFilters({ status: "", type: "", location: "" })}
            className="h-[52px] bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;