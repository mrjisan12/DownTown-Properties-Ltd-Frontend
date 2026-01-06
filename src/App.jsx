import { Outlet } from "react-router";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";
import {
  useGetSettingsQuery,
  useGetSocialLinksQuery,
} from "./redux/api/homeApi";
import PageLoader from "./components/pageLoader/pageLoader";

const App = () => {
  const { data: socialLinksData } = useGetSocialLinksQuery();
  const { data: settingData, isLoading: settingDataLoading } =
    useGetSettingsQuery();

  // ALWAYS ARRAY
  const socialLinks = socialLinksData?.data || [];

  return (
    <div className="mx-auto min-h-screen flex flex-col">
      {/* GLOBAL PAGE LOADER */}
      {/* <PageLoader /> */}

      <Navbar socialLinks={socialLinks} settingData={settingData} />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer socialLinks={socialLinks} />
    </div>
  );
};

export default App;
