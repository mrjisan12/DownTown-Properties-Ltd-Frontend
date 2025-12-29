import React, { useState, useEffect } from "react";

const MapDetProject = ({ map, loading }) => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullTitle = "Project Location";
  const typingSpeed = 100; // ms per character
  const cursorBlinkSpeed = 500; // ms

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullTitle.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(prev => prev + fullTitle[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else {
      // After typing completes, start blinking cursor
      const blinkTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, cursorBlinkSpeed);
      
      return () => clearInterval(blinkTimer);
    }
  }, [currentIndex]);

  // Reset effect when component mounts
  useEffect(() => {
    setDisplayedTitle("");
    setCurrentIndex(0);
    setShowCursor(true);
  }, []);

  return (
    <section
      className="relative w-screen -mx-[calc((100vw-100%)/2)] py-20 bg-center bg-cover bg-no-repeat z-50"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), url('/src/assets/map-bg.png')",
        backgroundColor: "#f3f2f1",
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gradient-x"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative w-full mx-auto">
        {/* Header - Full width with centered content */}
        <div className="text-center mb-16 px-6">
          <div className="inline-block relative mb-6">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight">
              {displayedTitle}
              <span 
                className={`inline-block w-[3px] h-16 ml-1 bg-gradient-to-b from-gray-800 to-gray-600 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
              ></span>
            </h2>
            
            {/* Decorative underline with animation */}
            <div className="relative h-1 mt-4 overflow-hidden">
              <div className="absolute left-0 right-0 h-full bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
              <div className="absolute h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed tracking-wide mt-8">
            Discover the precise geographical coordinates and surroundings of this development
          </p>
        </div>

        {/* Map Container - Full width */}
        <div className="relative w-full px-0">
          {/* Container with subtle side gradients */}
          <div className="relative">
            {/* Side gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f3f2f1] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f3f2f1] to-transparent z-10 pointer-events-none"></div>
            
            {/* Map Container with enhanced styling */}
            <div className="relative w-full h-[600px] shadow-2xl overflow-hidden bg-white">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-[6px] border-gray-200" />
                    <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-[6px] border-t-gray-800 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-600 animate-pulse"></div>
                  </div>
                  <p className="mt-6 text-gray-700 font-medium tracking-wide animate-pulse">
                    Loading interactive map...
                  </p>
                </div>
              ) : (
                <>
                  {/* Map Frame Decoration */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 z-20"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 z-20"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800 z-20"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800 z-20"></div>
                  
                  {/* Map corners */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gray-800 z-20"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gray-800 z-20"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gray-800 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gray-800 z-20"></div>
                  
                  {/* Map iframe */}
                  <iframe
                    src={map}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-0 contrast-105 brightness-105 scale-100 hover:scale-[1.01] transition-transform duration-700"
                    title="Project Location Map"
                  />
                  
                  {/* Map overlay label */}
                  <div className="absolute bottom-6 left-6 bg-black/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm z-20">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-sm font-medium tracking-wide">Project Site Location</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional info section */}
      <div className="text-center mt-16 px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl shadow-lg">
          <div className="text-left">
            <p className="text-sm text-gray-600 font-medium">Latitude & Longitude</p>
            <p className="text-gray-900 font-bold">Available on map interaction</p>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="text-left">
            <p className="text-sm text-gray-600 font-medium">Zoom Level</p>
            <p className="text-gray-900 font-bold">Fully interactive</p>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="text-left">
            <p className="text-sm text-gray-600 font-medium">View Mode</p>
            <p className="text-gray-900 font-bold">Satellite & Street View</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapDetProject;