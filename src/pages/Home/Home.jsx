import React from "react";
import BigBanner from "@/components/BigBanner";
import {
  useGetHomeBannerQuery,
  useGetMiniAboutQuery,
  useGetSettingsQuery,
} from "@/redux/api/homeApi";
import HomeVideo from "./HomeVideo/HomeVideo";
import MiniAbout from "./MiniAbout/MiniAbout";
import HomeBuilding from "./HomeBuilding/HomeBuilding";
import HomeMap from "./HomeMap/HomeMap";
import MiniAboutSkeleton from "@/components/skeletons/miniAboutSkeleton";

const Home = () => {
  const { data: bannerData, isLoading: bannerLoading } =
    useGetHomeBannerQuery();

  const { data: miniAboutApi, isLoading: miniAboutLoading } =
    useGetMiniAboutQuery();

  const { data: settingData, isLoading: settingDataLoading } =
    useGetSettingsQuery();

  const images = bannerData?.data?.map((item) => item.image);

  const miniAbout = miniAboutApi?.data?.[0];

  return (
    <>
      <div className="bg-[#fcfcfc]">
        <div className="flex items-center justify-center py-30">
          <h1 className="text-4xl md:text-9xl -mb-24 font-extralight text-[#3C3C3B] tracking-[0.2em] text-center uppercase">
            setting standards
          </h1>
        </div>

        <BigBanner images={images} loading={bannerLoading} />

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

        <HomeVideo videoId="_vtV8atti84" />

        <HomeBuilding />

        <div className="-mt-82 z-50">
          <HomeMap
            google_map_embed={settingData?.data?.[0]?.google_map_embed}
            loading={settingDataLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
