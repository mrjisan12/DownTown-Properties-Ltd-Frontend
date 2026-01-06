import React, { useState } from "react";
import ContactSection from "@/components/contactSection/contactSection";
import GetInTouchSection from "@/pages/Contact/GetInTouchSection/GetInTouchSection";
import CommonMap from "@/components/commonMap/commonMap";
import {
  useGetSettingsQuery,
  useGetSocialLinksQuery,
} from "@/redux/api/homeApi";
import { useCreateContactMessageMutation } from "@/redux/api/contactApi";
import CommonBanner from "@/components/commonBanner/commonBanner";
import connectImg from "../../assets/BannerImages/connectUs.jpg";
import GetInTouchSectionSkeleton from "@/components/skeletons/getInTouchSectionSkeleton";
import ContactSectionSkeleton from "@/components/skeletons/contactSectionSkeleton";
import MessageSuccess from "@/components/messageSuccess/messageSuccess";

const Contact = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  // SETTINGS
  const { data: settingData, isLoading: settingDataLoading } =
    useGetSettingsQuery();

  // SOCIAL LINKS
  const { data: socialLinksData, isLoading: socialLinksLoading } =
    useGetSocialLinksQuery();

  // CONTACT FORM MUTATION
  const [createContactMessage, { isLoading: contactLoading }] =
    useCreateContactMessageMutation();

  const [showSuccess, setShowSuccess] = useState(false);
  const handleContactSubmit = async (formData) => {
    try {
      await createContactMessage(formData).unwrap();
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to send message!");
    }
  };

  return (
    <div>
      {/* CONNECT SECTION */}

      <CommonBanner
        backgroundImage={connectImg}
        subtitle="Connect with us"
        title="Lets Connect"
        highlight="Excellence"
      />

      <MessageSuccess
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      {/* CONTACT FORM */}

      {settingDataLoading || socialLinksLoading ? (
        <ContactSectionSkeleton />
      ) : (
        <ContactSection
          settings={settingData}
          socials={socialLinksData}
          loading={settingDataLoading || socialLinksLoading}
        />
      )}
      {contactLoading || !settingData ? (
        <GetInTouchSectionSkeleton />
      ) : (
        <GetInTouchSection
          onSubmit={handleContactSubmit}
          loading={contactLoading}
          settings={settingData}
        />
      )}

      {/* MAP */}
      <div className="-mb-20">
        <CommonMap
          google_map_embed={settingData?.data?.[0]?.google_map_embed}
          loading={settingDataLoading}
        />
      </div>
    </div>
  );
};

export default Contact;
