// About.jsx
import CommonBanner from "@/components/commonBanner/commonBanner";
import { useGetAboutQuery, useGetAllstaffQuery } from "@/redux/api/aboutApi";
import React from "react";
import aboutImg from "../../assets/BannerImages/About.png";
import MiniAbout from "./MiniAbout/MiniAbout";
import MissionVision from "./MissionVision/MissionVision";
import Staff from "./Staff/Staff";
import { useGetMiniAboutQuery } from "@/redux/api/homeApi";
import MiniAboutSkeleton from "@/components/skeletons/miniAboutSkeleton";
import MissionVisionSkeleton from "@/components/skeletons/missionVisionSkeleton";
import StaffSkeleton from "./Staff/Staff";

const About = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const { data: aboutData, isLoading: aboutLoading } = useGetAboutQuery();
  const { data: staffData, isLoading: staffLoading } = useGetAllstaffQuery();
  const { data: miniAboutApi, isLoading: miniAboutLoading } =
    useGetMiniAboutQuery();

  const about = aboutData?.data?.[0];
  const staffList = staffData?.data || [];
  const miniAbout = miniAboutApi?.data?.[0];

  return (
    <>
      <CommonBanner
        backgroundImage={about?.banner || aboutImg}
        subtitle="Our Team"
        title="About Us"
        highlight="Excellence"
      />

      {/* MiniAbout Section */}
      {miniAboutLoading || !miniAbout ? (
        <MiniAboutSkeleton />
      ) : (
        <MiniAbout
          loading={aboutLoading || miniAboutLoading}
          about={about}
          metrics={miniAbout?.metrics || []}
        />
      )}

      {/* MissionVision Section */}
      {aboutLoading || !about ? (
        <MissionVisionSkeleton/>
      ) : (
        <MissionVision loading={aboutLoading} about={about} />
      )}

      {/* Staff Section */}
    
        <Staff loading={staffLoading} staff={staffList} />
    </>
  );
};

export default About;
