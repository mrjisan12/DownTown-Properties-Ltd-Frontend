import React from "react";
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


const Contact = () => {
  // SETTINGS
  const { data: settingData, isLoading: settingDataLoading } =
    useGetSettingsQuery();

  // SOCIAL LINKS
  const { data: socialLinksData, isLoading: socialLinksLoading } =
    useGetSocialLinksQuery();

  // CONTACT FORM MUTATION
  const [createContactMessage, { isLoading: contactLoading }] =
    useCreateContactMessageMutation();

  const handleContactSubmit = async (formData) => {
    try {
      await createContactMessage(formData).unwrap();
      alert("Message sent successfully!");
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
      <ContactSection
        settings={settingData}
        socials={socialLinksData}
        loading={settingDataLoading || socialLinksLoading}
      />

      {/* CONTACT FORM */}
      <GetInTouchSection
        onSubmit={handleContactSubmit}
        loading={contactLoading}
        settings={settingData}
      />

      {/* MAP */}
      <CommonMap
        google_map_embed={settingData?.data?.[0]?.google_map_embed}
        loading={settingDataLoading}
      />
    </div>
  );
};

export default Contact;
