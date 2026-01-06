import { useGetDetailProjectsQuery } from "@/redux/api/projectApi";
import React from "react";
import { useParams } from "react-router-dom";

import BannerDetProject from "./BannerDetProject";
import AboutDetProject from "./AboutDetProject";
import MapDetProject from "./MapDetProject";
import GalleryDetProject from "./GalleryDetProject";
import CommonBannerSkeleton from "@/components/skeletons/commonBannerSkeleton";

const DetailProject = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const { id } = useParams();

  const { data, isLoading, isError } = useGetDetailProjectsQuery(id);

  if (isLoading) {
    return <CommonBannerSkeleton />;
  }

  if (isError) {
    return <p className="text-center py-20">Something went wrong</p>;
  }

  const project = data?.data;
  return (
    <section className="mx-auto px-6  space-y-24">
      {/* Banner */}
      <BannerDetProject
        banner={project.banner || project.image}
        title={project.title}
        status={project.status}
      />

      {/* About */}
      <AboutDetProject project={project} />

      <GalleryDetProject project_gallery={project.project_gallery} />
      {/* Map */}
      <div className="-mb-20">
        {" "}
        {project.google_map && <MapDetProject map={project.google_map} />}{" "}
      </div>
    </section>
  );
};

export default DetailProject;
