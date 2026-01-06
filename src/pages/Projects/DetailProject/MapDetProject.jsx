import { getRandomCoordinates } from "@/utils/randomLatLong";
import React, { useState, useEffect } from "react";

const MapDetProject = ({ map, loading }) => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [location, setLocation] = useState(null);

  const fullTitle = "Project Location";
  const typingSpeed = 80; // ms per character
  const cursorBlinkSpeed = 500; // ms

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullTitle.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle((prev) => prev + fullTitle[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // After typing completes, start blinking cursor
      const blinkTimer = setInterval(() => {
        setShowCursor((prev) => !prev);
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
  useEffect(() => {
  // Simulate async loading
    setTimeout(() => {
      setLocation(getRandomCoordinates());
    }, 1000); // 1 second delay for demo
  }, []);

  if (!location) {
    return <div className="text-gray-400 italic">Loading coordinates...</div>;
  }
  return (
    <section
      className="relative w-screen -mx-[calc((100vw-100%)/2)] py-24 bg-center bg-cover bg-no-repeat z-50 overflow-hidden"
      style={{
        background:
          "linear-linear(135deg, #0a192f 0%, #1a365d 50%, #0a192f 100%)",
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-linear-to-r from-secondary to-secondary-light"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-linear(to right, #ffffff 1px, transparent 1px),
            linear-linear(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          {/* Animated accent line */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-linear-to-r from-transparent via-secondary to-transparent relative">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="inline-block relative mb-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-linear-to-r from-blue-100 via-teal-100 to-blue-100 bg-clip-text text-transparent">
                {displayedTitle}
              </span>
              <span
                className={`inline-block w-[2px] h-12 md:h-16 ml-2 bg-linear-to-b from-teal-400 via-blue-400 to-teal-400 align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                } transition-opacity duration-150`}
              ></span>
            </h2>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
              Strategic geographical positioning with precision coordinates and
              comprehensive surroundings analysis
            </p>
          </div>

          {/* Coordinates display */}
          <div className="mt-12 inline-flex items-center gap-6 bg-linear-to-r from-blue-900/30 to-teal-900/30 backdrop-blur-sm rounded-2xl px-8 py-4 border border-gray-700/50">
            <div className="text-left">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-linear-to-r from-teal-400 to-blue-400 animate-pulse"></div>
                <span className="text-sm text-gray-300 font-medium tracking-wider">
                  COORDINATES
                </span>
              </div>
              <p className="mt-2 text-white font-mono text-sm md:text-base">
                {location.longitude}° N,{location.latitude}° W
              </p>
            </div>
            <div className="h-8 w-px bg-linear-to-b from-transparent via-gray-500 to-transparent"></div>
            <div className="text-left">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-linear-to-r from-blue-400 to-teal-400 animate-pulse"></div>
                <span className="text-sm text-gray-300 font-medium tracking-wider">
                  ELEVATION
                </span>
              </div>
              <p className="mt-2 text-white font-mono text-sm md:text-base">
                {location.precision}m ASL
              </p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full">
          {/* Floating elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-linear-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-linear-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-3xl -z-10"></div>

          {/* Map Frame */}
          <div className="relative bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/30 border border-gray-700/50">
            {/* Frame top bar */}
            <div className="h-12 bg-linear-to-r from-gray-800 to-gray-900 border-b border-gray-700/50 flex items-center px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-linear-to-r from-red-500 to-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-linear-to-r from-yellow-500 to-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-linear-to-r from-green-500 to-green-400"></div>
              </div>
              <div className="ml-6 text-sm text-gray-400 font-medium tracking-wide">
                Geographic Analysis Interface
              </div>
            </div>

            {/* Map content */}
            <div className="relative w-full h-[600px] md:h-[700px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full bg-linear-to-br from-gray-800 to-gray-900">
                  {/* Elegant loading spinner */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-gray-700/50"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-transparent border-r-blue-400 border-b-teal-400 border-l-transparent animate-spin"></div>

                    {/* Inner ring */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 border-gray-600/30"></div>
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 border-t-transparent border-r-teal-400/50 border-b-blue-400/50 border-l-transparent animate-spin animation-delay-200"></div>

                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-linear-to-r from-blue-400 to-teal-400 animate-pulse"></div>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-gray-300 font-medium tracking-wider mb-2">
                      INITIALIZING GEOSPATIAL DATA
                    </p>
                    <div className="w-64 h-1 bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-linear-to-r from-blue-400 via-teal-400 to-blue-400 animate-shimmer rounded-full"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Map container with overlay effects */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-900/20 to-teal-900/20 z-10 pointer-events-none"></div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-linear-to-r from-blue-400 to-teal-400 z-20"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-linear-to-r from-teal-400 to-blue-400 z-20"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-linear-to-r from-blue-400 to-teal-400 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-linear-to-r from-teal-400 to-blue-400 z-20"></div>

                  {/* Map iframe with enhanced styling */}
                  <iframe
                    src={map}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="relative z-0 filter saturate-110 contrast-110 brightness-105 hover:brightness-110 transition-all duration-500"
                    title="Project Location Map"
                  />

                  {/* Location marker */}
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="relative group">
                      {/* Pulsing effect */}
                      <div className="absolute -inset-4 bg-linear-to-r from-blue-400/20 to-teal-400/20 rounded-full animate-ping"></div>

                      {/* Marker */}
                      <div className="relative bg-linear-to-r from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm shadow-2xl min-w-[200px]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative">
                            <div className="w-4 h-4 rounded-full bg-linear-to-r from-teal-400 to-blue-400"></div>
                            <div className="absolute inset-0 rounded-full bg-linear-to-r from-teal-400 to-blue-400 animate-ping"></div>
                          </div>
                          <span className="text-sm font-bold text-white tracking-wide">
                            PROJECT SITE
                          </span>
                          <span className="ml-auto text-xs text-teal-300 font-mono px-2 py-1 bg-teal-900/30 rounded">
                            ACTIVE
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400">
                              Latitude
                            </span>
                            <span className="text-sm text-white font-mono">
                              {location.latitude}°
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400">
                              Longitude
                            </span>
                            <span className="text-sm text-white font-mono">
                              {location.longitude}°
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-xs text-gray-400">
                              Precision
                            </span>
                            <span className="text-sm text-green-300 font-mono">
                              {location.precision}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-700/50">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              Last updated
                            </span>
                            <span className="text-xs text-blue-300 font-medium">
                              Just now
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Frame bottom bar */}
            <div className="h-10 bg-linear-to-r from-gray-900 to-gray-800 border-t border-gray-700/50 flex items-center justify-between px-6 text-xs text-gray-500 font-mono">
              <div>GEO:ACTIVE</div>
              <div className="flex items-center gap-4">
                <span>ZOOM: 15x</span>
                <span className="w-px h-4 bg-gray-700"></span>
                <span>RESOLUTION: 4K</span>
                <span className="w-px h-4 bg-gray-700"></span>
                <span>LAYERS: 3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-linear-to-r from-teal-400 to-blue-400"></div>
            <span className="text-sm text-gray-300">Project Site</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-blue-400 bg-blue-900/30"></div>
            <span className="text-sm text-gray-300">Water Bodies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-green-400 bg-green-900/30"></div>
            <span className="text-sm text-gray-300">Green Zones</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-yellow-400 bg-yellow-900/30"></div>
            <span className="text-sm text-gray-300">Development Areas</span>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -20px) rotate(90deg);
          }
          50% {
            transform: translate(0, -40px) rotate(180deg);
          }
          75% {
            transform: translate(-20px, -20px) rotate(270deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .border-linear-to-r {
          border-image: linear-linear(to right, #2dd4bf, #60a5fa) 1;
        }
      `}</style>
    </section>
  );
};

export default MapDetProject;
