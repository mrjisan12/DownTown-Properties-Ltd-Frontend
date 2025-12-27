import BigBanner from "@/components/BigBanner";
import React from "react";

const About = () => {
  const apiImages = [
    "/src/assets/banner1.jpeg",
    "/src/assets/banner2.jpeg",
    "/src/assets/banner3.jpeg",
  ];
  return (
    <>
      <BigBanner title="Our Story" showTitle={true} images={apiImages} />   
    </>
  );
};
                                                                            
export default About;
