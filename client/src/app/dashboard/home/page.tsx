import Dashboard from "@/src/components/common/Dashboard";
import { LogoutButton } from "@/src/components/common/Logout";
import MainHeroSection from "@/src/components/common/MainHeroSection";
import Navbar from "@/src/components/common/Navbar";
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
      <div className="w-full h-screen ">
        <Navbar />
        <Dashboard/>
      </div>
    </>
  );
};

export default page;
