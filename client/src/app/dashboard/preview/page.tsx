import React from "react";
import Previewer from "@/src/components/common/Previewer";
import { NavBar } from "@/src/components/common/NavBar";

const page = () => {
  return (
    <div className="bg-white h-screen">
      <NavBar />
      <Previewer />
    </div>
  );
};

export default page;
