import React from "react";

const AboutDetProject = ({ project }) => {
    console.log(project)
  return (
    <div className="space-y-16">
      {/* Project Description */}
      <div>
        <h2 className="text-2xl font-bold mb-4">About Project</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {project.description || project.short_description}
        </p>
      </div>

      {/* General Info */}
      <div>
        <h3 className="text-xl font-semibold mb-4">General Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Info label="Location" value={project.location} />
          <Info label="Type" value={project.project_type} />
          <Info label="Status" value={project.status} />
          <Info label="Starting Price" value={`৳ ${project.starting_price}`} />
          <Info label="Handover Date" value={project.handover_date} />
          <Info label="Rajuk Approval" value={project.rajuk_approval_no} />
        </div>
      </div>

      {/* Land Details */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Land Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Info label="Land Area" value={project.land_area} />
          <Info label="Speciality" value={project.speciality_of_land} />
          <Info label="Front Road Width" value={project.front_road_width} />
          <Info label="Face of Land" value={project.face_of_land || "N/A"} />
        </div>
      </div>

      {/* Building / Apartments Details */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Building Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Info label="Floors" value={project.no_of_floors} />
          <Info label="Apartments" value={project.no_of_apartments} />
          <Info label="Basements" value={project.no_of_basements} />
          <Info label="Parking Spaces" value={project.no_of_parking} />
          <Info label="Size of Apartments" value={project.size_of_apartments} />
        </div>
      </div>
    </div>
  );
};

// Info card for consistent styling
const Info = ({ label, value }) => (
  <div className="bg-white border rounded-xl p-4 shadow-sm">
    <p className="text-xs text-gray-400 uppercase">{label}</p>
    <p className="font-semibold text-gray-900">{value || "N/A"}</p>
  </div>
);

export default AboutDetProject;
