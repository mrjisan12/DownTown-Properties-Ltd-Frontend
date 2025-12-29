import React from "react";
import BigBanner from "@/components/BigBanner";
import {
  useGetHomeBannerQuery,
  useGetHomeProjectsQuery,
  useGetMiniAboutQuery,
  useGetSettingsQuery,
} from "@/redux/api/homeApi";
import HomeVideo from "./HomeVideo/HomeVideo";
import MiniAbout from "./MiniAbout/MiniAbout";
import HomeBuilding from "./HomeBuilding/HomeBuilding";
import HomeMap from "./HomeMap/HomeMap";
import MiniAboutSkeleton from "@/components/skeletons/miniAboutSkeleton";
import HomeProjects from "./HomeProjects/HomeProjects";
import Contact from "../../components/contact/Contact";

const Home = () => {
  const { data: bannerData, isLoading: bannerLoading } =
    useGetHomeBannerQuery();

  const { data: miniAboutApi, isLoading: miniAboutLoading } =
    useGetMiniAboutQuery();

  const { data: settingData, isLoading: settingDataLoading } =
    useGetSettingsQuery();
  const { data: homeProjectsData, isLoading: homeProjectsLoading } =
    useGetHomeProjectsQuery();
  const images = bannerData?.data?.map((item) => item.image);

  const miniAbout = miniAboutApi?.data?.[0];

  return (
    <>
      <div className="bg-white">
        <div className="flex items-center justify-center py-30">
          <h1 className="text-4xl md:text-9xl -mb-24 font-extralight text-[#3C3C3B] tracking-[0.2em] text-center uppercase">
            setting standards
          </h1>
        </div>

        <BigBanner images={images} loading={bannerLoading} />
        <HomeBuilding />

        <HomeVideo videoId="_vtV8atti84" />

        <HomeProjects
          projects={homeProjectsData?.data}
          loading={homeProjectsLoading}
        />
        {miniAboutLoading || !miniAbout ? (
          <MiniAboutSkeleton />
        ) : (
          <MiniAbout
            title={miniAbout.title}
            description={miniAbout.description}
            image={miniAbout.image}
            metrics={miniAbout.metrics}
          />
        )}
        <div className="">
          <HomeMap
            google_map_embed={settingData?.data?.[0]?.google_map_embed}
            loading={settingDataLoading}
          />
        </div>
        <Contact />
      </div>
    </>
  );
};

export default Home;
