import { Outlet } from "react-router";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

const App = () => {
  return (
    <div className="mx-auto">
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default App;
