import { redirect } from "next/navigation";
import AuthPopUp from "../components/common/AuthPopUp";
import EmailPopUp from "../components/common/EmailPopUp";
import { LogInPopUp } from "../components/common/LogInPopUp";
import MainHeroSection from "../components/common/MainHeroSection";
import { getCurrentUser } from "../lib/auth";
import { NavBar } from "../components/common/NavBar";

const page = async () => {
  const user = await getCurrentUser();


  if (user.authsuccess.success) {
    redirect("/dashboard/home");
  }

  return (
    <div className="w-full h-screen bg-white">
      <EmailPopUp />
      <AuthPopUp />
      <LogInPopUp />
      <NavBar />
      <MainHeroSection />
    </div>
  );
};

export default page;
