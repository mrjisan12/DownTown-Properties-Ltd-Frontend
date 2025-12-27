import React, { useEffect } from "react";
import BigBanner from "@/components/BigBanner";
import {
  useGetHomeBannerQuery,
  useGetMiniAboutQuery,
} from "@/redux/api/homeApi";
import HomeVideo from "./HomeVideo/HomeVideo";
import MiniAbout from "./MiniAbout/MiniAbout";
import HomeBuilding from "./HomeBuilding/HomeBuilding";
import videoSrc from "../../../src/assets/ShantaAssets/HomeVideo.mp4";

const Home = () => {
  // Banner API
  const { data: bannerData, isLoading: bannerLoading } =
    useGetHomeBannerQuery();

  // Mini About API
  const { data: miniAboutApi, isLoading: miniAboutLoading } =
    useGetMiniAboutQuery();
  console.log("miniAboutApi",miniAboutApi);
  // Extract banner images
  const apiImages = bannerData?.data?.map((item) => item.image);

  // Extract mini about section
  const miniAbout = miniAboutApi?.data?.[0];

  useEffect(() => {
    if (bannerData) {
      console.log("Home Banner API Response:", bannerData);
      console.log("Extracted Banner Images:", apiImages);
    }

    if (miniAboutApi) {
      console.log("Mini About API Response:", miniAboutApi);
    }
  }, [bannerData, miniAboutApi, apiImages]);

  return (
    <>
      {/* Top Heading */}
      <div className="flex items-center justify-center py-20">
        <h1 className="text-4xl md:text-9xl -mb-24 font-extralight text-[#3C3C3B] tracking-[0.2em] text-center uppercase">
          setting standards
        </h1>
      </div>

      {/* Big Banner */}
      <BigBanner showTitle={false} images={apiImages} loading={bannerLoading} />

      {/* Mini About Section (API Driven) */}
      {!miniAboutLoading && miniAbout && (
        <MiniAbout
          title={miniAbout.title}
          description={miniAbout.description}
          image={miniAbout.image}
        />
      )}

      {/* Video Section */}
      <HomeVideo videoSrc={videoSrc} />

      {/* Building Section */}
      <HomeBuilding />
    </>
  );
};

export default Home;
