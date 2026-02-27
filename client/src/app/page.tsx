import { redirect } from "next/navigation";
import AuthPopUp from "../components/common/AuthPopUp";
import EmailPopUp from "../components/common/EmailPopUp";
import { LogInPopUp } from "../components/common/LogInPopUp";
import MainHeroSection from "../components/common/MainHeroSection";
import Navbar from "../components/common/Navbar";
import { useAuthContext } from "../context/AuthContext";
import { getCurrentUser } from "../lib/auth";

const page = async () => {
  const user = await getCurrentUser();


  if (user) {
    redirect("/dashboard/home");
  }

  return (
    <div className="w-full h-full">
      <EmailPopUp />
      <AuthPopUp />
      <LogInPopUp />
      <Navbar />
      <MainHeroSection />
    </div>
  );
};

export default page;
