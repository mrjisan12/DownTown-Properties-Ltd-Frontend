import React from "react";
import BigBanner from "@/components/BigBanner";
import {
  useGetHomeBannerQuery,
  useGetHomeBuildingQuery,
  useGetMiniAboutQuery,
  useGetSettingsQuery,
} from "@/redux/api/homeApi";
import HomeVideo from "./HomeVideo/HomeVideo";
import HomeBuilding from "./HomeBuilding/HomeBuilding";
import HomeProjects from "./HomeProjects/HomeProjects";
import ContactSection from "../../components/contactSection/contactSection";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import CommonMap from "../../components/commonMap/commonMap";
import BigBannerSkeleton from "@/components/skeletons/bigBannerSkeleton";
import HomeBuildingSkeleton from "@/components/skeletons/homeBuildingSkeleton";
import HomeMiniAbout from "./HomeMiniAbout/HomeMiniAbout";
import HomeMiniAboutSkeleton from "@/components/skeletons/homeMiniAboutSkeleton";
import CommonBanner from "@/components/commonBanner/commonBanner";
import aboutImg from "../../assets/BannerImages/About.png";

const Home = () => {
  const { data: bannerData, isLoading: bannerLoading } =
    useGetHomeBannerQuery();

  const { data: miniAboutApi, isLoading: miniAboutLoading } =
    useGetMiniAboutQuery();

  const { data: settingData, isLoading: settingDataLoading } =
    useGetSettingsQuery();

  const { data: homeBuildingData, isLoading: homeBuildingDataLoading } =
    useGetHomeBuildingQuery();

  const { data: homeProjectsData, isLoading: homeProjectsLoading } =
    useGetAllProjectsQuery();

    const images = bannerData?.data?.map((item) => item.image);
    
    const miniAbout = miniAboutApi?.data?.[0];
    
    return (
      <>
      <div className="bg-white">
        <HomeProjects
          projects={homeProjectsData?.data}
          loading={homeProjectsLoading}
        />
        {/* <div className="flex items-center justify-center py-30">
          <h1 className="text-4xl md:text-9xl -mb-24 font-extralight text-[#3C3C3B] tracking-[0.2em] text-center uppercase">
            setting standards
          </h1>
        </div>
        {bannerLoading ? (
          <BigBannerSkeleton />
        ) : (
          <BigBanner images={images} loading={bannerLoading} />
        )} */}

        {/* <CommonBanner
          backgroundImage={aboutImg}
          subtitle="Our Team"
          title="About Us"
          highlight="Excellence"
        /> */}

        {homeBuildingDataLoading || !homeBuildingData ? (
          <HomeBuildingSkeleton />
        ) : (
          <HomeBuilding
            loading={homeBuildingDataLoading}
            data={homeBuildingData?.data?.[0]}
          />
        )}

        <HomeVideo
          videoId={homeBuildingData?.data?.[0]?.videoID || "_vtV8atti84"}
        />

        {miniAboutLoading || !miniAbout ? (
          <HomeMiniAboutSkeleton />
        ) : (
          <HomeMiniAbout
            title={miniAbout.title}
            description={miniAbout.description}
            image={miniAbout.image}
            metrics={miniAbout.metrics}
          />
        )}


        <CommonMap
          google_map_embed={settingData?.data?.[0]?.google_map_embed}
          loading={settingDataLoading}
        />

        <ContactSection settings={settingData} loading={settingDataLoading} />
      </div>
    </>
  );
};

export default Home;
