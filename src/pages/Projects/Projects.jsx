import React, { useMemo, useState } from "react";
import ProjectBanner from "./ProjectBanner/ProjectBanner";
import { useGetHomeProjectsQuery } from "@/redux/api/homeApi";
import FilterSection from "./FilterSection/FilterSection";
import MainProject from "./MainProject/MainProject";

const Projects = () => {
  const { data, isLoading } = useGetHomeProjectsQuery();

  const projects = data?.data || [];

  const [filters, setFilters] = useState({
    status: "",
    type: "",
    location: "",
  });

  // Unique locations
  const locations = useMemo(() => {
    return [...new Set(projects.map((p) => p.location))];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      return (
        (!filters.status || p.status === filters.status) &&
        (!filters.type || p.project_type === filters.type) &&
        (!filters.location || p.location === filters.location)
      );
    });
  }, [projects, filters]);

  if (isLoading) {
    return <div className="text-center py-20">Loading projects...</div>;
  }

  return (
    <>
      <ProjectBanner />
      <FilterSection
        filters={filters}
        setFilters={setFilters}
        locations={locations}
      />
      <MainProject projects={filteredProjects} />
    </>
  );
};

export default Projects;
