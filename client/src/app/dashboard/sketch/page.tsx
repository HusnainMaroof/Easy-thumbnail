import { NavBar } from "@/src/components/common/NavBar";
import Sketch from "@/src/components/common/Sketch";
import React from "react";

const page = () => {
  return (
    <div className="bg-white w-full h-screen">
      <NavBar />
      <Sketch />
    </div>
  );
};

export default page;
