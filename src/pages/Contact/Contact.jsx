import ContactSection from '@/components/ContactSection/ContactSection';
import GetInTouchSection from '@/components/GetInTouchSection/GetInTouchSection';
import React from 'react'
import HomeMap from '../Home/HomeMap/HomeMap';
import { useGetSettingsQuery } from '@/redux/api/homeApi';


const Contact = () => {

  const { data: settingData, isLoading: settingDataLoading } =
      useGetSettingsQuery();

  return (
    <div>
      <ContactSection />
      <GetInTouchSection/>
       <div className="">
          <HomeMap
            google_map_embed={settingData?.data?.[0]?.google_map_embed}
            loading={settingDataLoading}
          />
        </div>
    </div>
  )
}

export default Contact;
