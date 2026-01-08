import React, { useState, useEffect, useRef } from "react";

const MissionVision = ({ about, loading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [missionTyped, setMissionTyped] = useState("");
  const [visionTyped, setVisionTyped] = useState("");
  const sectionRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typing effect for mission
  useEffect(() => {
    if (
      !isVisible ||
      !about?.mission ||
      missionTyped.length === about.mission.length
    )
      return;

    const timeout = setTimeout(() => {
      setMissionTyped(about.mission.substring(0, missionTyped.length + 1));
    }, 20);

    return () => clearTimeout(timeout);
  }, [isVisible, about?.mission, missionTyped]);

  // Typing effect for vision
  useEffect(() => {
    if (
      !isVisible ||
      !about?.vission ||
      visionTyped.length === about.vission.length
    )
      return;

    const timeout = setTimeout(() => {
      setVisionTyped(about.vission.substring(0, visionTyped.length + 1));
    }, 20);

    return () => clearTimeout(timeout);
  }, [isVisible, about?.vission, visionTyped]);

  // Reset typed content when about changes
  useEffect(() => {
    setMissionTyped("");
    setVisionTyped("");
  }, [about]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-b from-black via-gray-900 to-black py-24"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-linear(to right, #ffffff 1px, transparent 1px),
                             linear-linear(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "center top",
          }}
        ></div>
      </div>

      <div className="container relative mx-auto md:px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            Our Purpose
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 relative">
          {/* Mission Card */}
          <div
            ref={missionRef}
            className={`
    relative group backdrop-blur-sm bg-linear-to-br from-gray-900/80 to-black/80
    md:border md:border-gray-800 md:rounded-3xl 
    p-6 md:p-10 overflow-hidden
    transition-all duration-700 ease-out
    ${
      isVisible
        ? "opacity-100 scale-100 translate-y-0"
        : "opacity-0 scale-95 translate-y-10"
    }
    hover:md:border-primary/30 hover:shadow-2xl hover:shadow-primary/10
    transform hover:-translate-y-2
  `}
          >
            {/* Card glow effect */}
            {/* <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-transparent to-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div> */}

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 -translate-x-10 -translate-y-10 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 translate-x-10 translate-y-10 bg-secondary/10 rounded-full blur-xl"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-linear-to-br from-primary to-accent ">
               
                </div>
                <h3 className="text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Our Mission
                </h3>
              </div> */}

              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-2 md:p-3 bg-linear-to-br from-primary to-accent rounded-xl md:">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>

                <h3 className="text-xl md:text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Our Mission
                </h3>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm md:text-lg font-light min-h-[80px] md:min-h-[120px]">
                {missionTyped}
                {missionTyped.length < about.mission.length && (
                  <span className="inline-block w-0.5 md:w-1 h-4 md:h-5 ml-1 bg-primary animate-pulse"></span>
                )}
              </p>

              {/* Progress indicator */}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-accent rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (missionTyped.length / about.mission.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {Math.round(
                    (missionTyped.length / about.mission.length) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div
            ref={visionRef}
            className={`
              relative group backdrop-blur-sm bg-linear-to-br from-gray-900/80 to-black/80 
              md:border md:border-gray-800 md:rounded-3xl p-10 overflow-hidden
              transition-all duration-700 ease-out
              ${
                isVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-10"
              }
              hover:md:border-secondary/30 hover:shadow-2xl hover:shadow-secondary/10
              transform hover:-translate-y-2
            `}
            style={{
              animationDelay: "0.4s",
            }}
          >
            {/* Card glow effect */}
            {/* <div className="absolute -inset-1 bg-linear-to-r from-secondary/20 via-transparent to-primary/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div> */}

            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 translate-x-10 -translate-y-10 bg-secondary/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 -translate-x-10 translate-y-10 bg-accent/10 rounded-full blur-xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-linear-to-br from-secondary to-secondary ">
                  <svg
                    className="w-6 h-6 text-secondary-light"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Our Vision
                </h3>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm md:text-lg font-light min-h-[80px] md:min-h-[120px]">
                {visionTyped}
                {visionTyped.length < about.vission.length && (
                  <span className="inline-block w-0.5 md:w-1 h-4 md:h-5 ml-1 bg-secondary animate-pulse"></span>
                )}
              </p>

              {/* Progress indicator */}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (visionTyped.length / about.vission.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {Math.round(
                    (visionTyped.length / about.vission.length) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-20 flex justify-center gap-4">
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-secondary rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-accent rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
