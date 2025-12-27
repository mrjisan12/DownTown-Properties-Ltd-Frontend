import React, { useEffect } from "react";
import BigBanner from "@/components/BigBanner";
import {
  useGetHomeBannerQuery,
  useGetMiniAboutQuery,
  useGetSettingsQuery,
} from "@/redux/api/homeApi";
import HomeVideo from "./HomeVideo/HomeVideo"; // Ensure path is correct
import MiniAbout from "./MiniAbout/MiniAbout";
import HomeBuilding from "./HomeBuilding/HomeBuilding";
import HomeMap from "./HomeMap/HomeMap";

const Home = () => {
  // Banner API
  const { data: bannerData, isLoading: bannerLoading } = useGetHomeBannerQuery();

  // Mini About API
  const { data: miniAboutApi, isLoading: miniAboutLoading } = useGetMiniAboutQuery();

  // Home Map API
  const { data: settingData, isLoading: settingDataLoading } = useGetSettingsQuery();
  
  // Extract banner images
  const apiImages = bannerData?.data?.map((item) => item.image);

  // Extract mini about section
  const miniAbout = miniAboutApi?.data?.[0];

  return (
    <div className="bg-[#fcfcfc]">
      {/* Top Heading */}
      <div className="flex items-center justify-center py-30">
        <h1 className="text-4xl md:text-9xl -mb-24 font-extralight text-[#3C3C3B] tracking-[0.2em] text-center uppercase">
          setting standards
        </h1>
      </div>

      {/* Big Banner */}
      <BigBanner showTitle={false} images={apiImages} loading={bannerLoading} />

      {/* Mini About Section */}
      {!miniAboutLoading && miniAbout && (
        <MiniAbout
          title={miniAbout.title}
          description={miniAbout.description}
          image={miniAbout.image}
        />
      )}

      {/* YouTube Video Section - Using ID from your link */}
      <HomeVideo videoId="_vtV8atti84" />

      {/* Building Section */}
      <HomeBuilding />

      {/* Map Section */}
      <HomeMap google_map_embed={settingData?.data?.[0]?.google_map_embed} loading={settingDataLoading} />

    </div>
  );
};

export default Home;