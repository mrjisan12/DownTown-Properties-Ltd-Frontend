import React from "react";
import CommonBanner from "@/components/commonBanner/commonBanner";
import testimonialImg from "../../assets/BannerImages/Testimonial.avif";
import { useGetAllTestimonialQuery } from "@/redux/api/clientApi";
import MainTestimonial from "./MainTestimonial/MainTestimonial";
import ChairmanSpeech from "./ChairmanSpeech/ChairmanSpeech";
import CommonBannerSkeleton from "@/components/skeletons/commonBannerSkeleton";

const Testimonial = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const { data: testimonialData, isLoading } = useGetAllTestimonialQuery();

  if (isLoading) {
    return <CommonBannerSkeleton />;
  }

  // ✅ Safety check
  const dataArray = testimonialData?.data || [];

  // ✅ First item → Chairman Speech
  const chairmanData = dataArray[0];

  // ✅ Rest → Testimonials
  const testimonialList = dataArray.slice(1);

  return (
    <div>
      <CommonBanner
        backgroundImage={testimonialImg}
        subtitle="Our Testimonial"
        title="Feedback Us"
        highlight="Excellence"
      />

      {chairmanData && <ChairmanSpeech data={chairmanData} />}

      {testimonialList.length > 0 && <MainTestimonial data={testimonialList} />}
    </div>
  );
};

export default Testimonial;
