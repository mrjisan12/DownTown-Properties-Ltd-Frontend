import { Outlet } from "react-router";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";
import { useGetSocialLinksQuery } from "./redux/api/homeApi";

const App = () => {
  const { data: socialLinksData } = useGetSocialLinksQuery();

  // ALWAYS ARRAY
  const socialLinks = socialLinksData?.data || [];

  return (
    <div className="mx-auto">
      <Navbar socialLinks={socialLinks} />
      <Outlet />
      <Footer socialLinks={socialLinks} />
    </div>
  );
};

export default App;
