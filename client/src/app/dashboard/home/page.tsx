import { LogoutButton } from "@/src/components/common/Logout";
import { getCurrentUser } from "@/src/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();

  // console.log(user);

  if (!user) {
    console.log("un authrozied");

    redirect("/");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px] bg-black/20 backdrop-blur-sm" />

      <div className="relative w-full max-w-md max-h-[95vh] overflow-y-auto scrollbar-custom bg-white border-[6px] border-black rounded-[2.5rem] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 ">
        <div className="flex items-center justify-center">
          <h1 className="text-md md:text-xl  font-black uppercase tracking-tighter leading-[0.9] text-black mb-6 text-center">
            Well <br />
            <span className="bg-[#F4E041] px-4 border-4 border-black inline-block transform -rotate-2">
              Come
            </span>
            <br /> Pajee
          </h1>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
};

export default page;
