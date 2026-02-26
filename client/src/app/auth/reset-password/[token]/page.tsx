import EmailPopUp from "@/src/components/common/EmailPopUp";
import ResetPassword from "@/src/components/common/ResetPassword";

const page = () => {
  return (
    <div className="relative  w-full h-screen bg-[#FFFFFF] overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.05] "
        style={{
          backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <ResetPassword />
    </div>
  );
};

export default page;
