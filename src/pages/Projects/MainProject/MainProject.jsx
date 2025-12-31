import React from "react";
import { useNavigate } from "react-router";

const MainProject = ({ projects }) => {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`
              group rounded-3xl overflow-hidden bg-white  hover:shadow-2xl transition-all duration-500
              ${index % 2 !== 0 ? "md:translate-y-24" : ""} 
            `}
          >
            {/* Seamless Image Container - No boundaries */}
            <div
              onClick={() => navigate(`/project/${project.id}`)}
              className="relative h-100 lg:h-125 overflow-hidden"
            >
              {/* Image with soft fade-out effect */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/10 z-10" />

              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transform transition-all duration-700 
                         group-hover:scale-105 group-hover:brightness-110"
              />

              {/* Floating Status Badge */}
              <span
                className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-black 
                             font-medium text-xs tracking-widest uppercase px-4 py-2 rounded-full 
                             shadow-sm z-20"
              >
                {project.status}
              </span>

              {/* Subtle gradient overlay at bottom for seamless transition */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 
                            bg-linear-to-t from-white via-white/90 to-transparent z-10"
              />
            </div>

            {/* Content Area */}
            <div className="p-8 lg:p-10 space-y-4 -mt-2">
              {" "}
              {/* Negative margin to pull content up */}
              <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                {project.title}
              </h3>
              <p className="text-lg text-gray-500 leading-relaxed">
                {project.short_description}
              </p>
              <div
                className="pt-4 flex justify-between items-center border-t border-gray-100 
                            text-sm font-medium text-gray-400 uppercase tracking-wider"
              >
                <span>{project.location}</span>
                <span className="text-indigo-600">{project.project_type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainProject;
