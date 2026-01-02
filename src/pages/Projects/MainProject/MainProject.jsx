import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";

const MainProject = ({ projects }) => {
  const navigate = useNavigate();

  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projectRefs = useRef([]);

  const handleMouseMove = (index, e) => {
    const rect = projectRefs.current[index]?.getBoundingClientRect();
    if (!rect) return;

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const resetHover = () => {
    setHoveredProject(null);
  };

  return (
    <section
      className="max-w-7xl mx-auto px-6 py-24"
      onMouseLeave={resetHover}
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-4">
          Featured Projects
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our carefully crafted projects, each telling a unique story of innovation and design
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {projects.map((project, index) => {
          const isHovered = hoveredProject === index;

          return (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className={`
                group relative rounded-3xl overflow-hidden bg-card
                transition-all duration-300
                hover:shadow-2xl hover:shadow-primary/10
                ${index % 2 !== 0 ? "md:translate-y-24" : ""}
                ${isHovered ? "scale-[1.02]" : ""}
                border border-border/50
              `}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={resetHover}
              onMouseMove={(e) => handleMouseMove(index, e)}
            >
              {/* Hover Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* ✅ Custom Hover Cursor (CARD ONLY) */}
              {isHovered && (
                <div
                  className="absolute pointer-events-none z-30"
                  style={{
                    left: mousePosition.x - 40,
                    top: mousePosition.y - 40,
                  }}
                >
                  <div className="w-20 h-20 rounded-full border-2 border-primary/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
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
                className="relative h-96 overflow-hidden cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-8 bg-card relative z-10 space-y-4">
                <span className="text-sm uppercase tracking-wider text-primary">
                  {project.project_type}
                </span>

                <h3 className="text-3xl font-bold">{project.title}</h3>

                <p className="text-muted-foreground line-clamp-2">
                  {project.short_description}
                </p>

                <button
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="mt-4 text-primary font-semibold uppercase tracking-wide"
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
