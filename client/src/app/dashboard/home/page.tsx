import Dashboard from "@/src/components/common/Dashboard";
import MainHeroSection from "@/src/components/common/MainHeroSection";
import { NavBar } from "@/src/components/common/NavBar";
import Onboarding from "@/src/components/common/OnBoarding";
import { getCurrentUser } from "@/src/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();

  if (!user.authsuccess.success) {
    console.log("un authrozied sss");

    redirect("/");
  }

  // console.log(user);

  return (
    <>
      <div className="w-full h-screen  bg-white">
        <NavBar />
        <Dashboard />
      </div>
    </>
  );
};

export default page;
