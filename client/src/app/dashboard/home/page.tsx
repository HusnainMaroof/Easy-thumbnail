import Dashboard from "@/src/components/common/Dashboard";
import DashboardNavBar from "@/src/components/common/DashboardNav";
import MainHeroSection from "@/src/components/common/MainHeroSection";
import { getCurrentUser } from "@/src/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    console.log("un authrozied");

    redirect("/");
  }

  return (
    <>
      <div className="w-full h-screen  bg-white">
        <DashboardNavBar />
        <Dashboard />
      </div>
    </>
  );
};

export default page;
