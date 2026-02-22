import AuthPopUp from "../components/common/AuthPopUp";
import { LogInPopUp } from "../components/common/LogInPopUp";
import MainHeroSection from "../components/common/MainHeroSection";
import Navbar from "../components/common/Navbar";
import { useAuthContext } from "../context/AuthContext";

const page = () => {
  return (
    <div className="w-full h-full">
      <AuthPopUp />
      <LogInPopUp />
      <Navbar />
      <MainHeroSection />
    </div>
  );
};

export default page;
