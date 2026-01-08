import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";

const MainProject = ({ projects }) => {
  const navigate = useNavigate();

  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projectRefs = useRef([]);

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  const handleMouseMove = (index, e) => {
    if (!isDesktop) return;

    const rect = projectRefs.current[index]?.getBoundingClientRect();
    if (!rect) return;

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const resetHover = () => setHoveredProject(null);

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24"
      onMouseLeave={resetHover}
    >
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-3 md:mb-4">
          Featured Projects
        </h2>
        <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-xl md:max-w-2xl mx-auto">
          Discover our carefully crafted projects, each telling a unique story of innovation and design
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
        {projects.map((project, index) => {
          const isHovered = hoveredProject === index;

          return (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className={`
                group relative rounded-2xl md:rounded-3xl overflow-hidden bg-card
                transition-all duration-300
                hover:shadow-2xl hover:shadow-primary/10
                ${index % 2 !== 0 ? "md:translate-y-24" : ""}
                ${isHovered ? "md:scale-[1.02]" : ""}
                border border-border/50
              `}
              onMouseEnter={() => isDesktop && setHoveredProject(index)}
              onMouseLeave={resetHover}
              onMouseMove={(e) => handleMouseMove(index, e)}
            >
              {/* Hover Glow (desktop only) */}
              <div
                className={`absolute inset-0 bg-linear-to-br from-primary/5 to-transparent transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                } hidden md:block`}
              />

              {/* Custom Hover Cursor (desktop only) */}
              {isHovered && isDesktop && (
                <div
                  className="absolute pointer-events-none z-30"
                  style={{
                    left: mousePosition.x - 40,
                    top: mousePosition.y - 40,
                  }}
                >
                  <div className="w-20 h-20 rounded-full border-2 border-primary/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center animate-pulse">
                      <svg
                        className="w-4 h-4 text-primary-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Image */}
              <div
                onClick={() => navigate(`/project/${project.id}`)}
                className="relative h-56 sm:h-72 md:h-96 overflow-hidden cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 bg-card relative z-10 space-y-3 md:space-y-4">
                <span className="text-xs sm:text-sm uppercase tracking-wider text-primary">
                  {project.project_type}
                </span>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                  {project.short_description}
                </p>

                <button
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="mt-2 md:mt-4 text-sm md:text-base text-primary font-semibold uppercase tracking-wide"
                >
                  Explore →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MainProject;
