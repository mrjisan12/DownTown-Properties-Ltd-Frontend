import { useGetDetailProjectsQuery } from "@/redux/api/projectApi";
import React from "react";
import { useParams } from "react-router-dom";

import BannerDetProject from "./BannerDetProject";
import AboutDetProject from "./AboutDetProject";
import MapDetProject from "./MapDetProject";

const DetailProject = () => {
  const { id } = useParams();

  const { data, isLoading, isError } =
    useGetDetailProjectsQuery(id);

  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center py-20">Something went wrong</p>;
  }

  const project = data?.data;

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
      {/* Banner */}
      <BannerDetProject
        banner={project.banner}
        title={project.title}
        status={project.status}
      />

      {/* About */}
      <AboutDetProject project={project} />

      {/* Map */}
      {project.google_map && (
        <MapDetProject map={project.google_map} />
      )}
    </section>
  );
};

export default DetailProject;
