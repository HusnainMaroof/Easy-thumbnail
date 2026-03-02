"use client";

import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
  variant?: "purple" | "white" | "google" | "disabled" | "green" | "yellow" |"blue";
}

export const MainButton = ({
  children,
  className = "",
  variant = "purple",
  ...props
}: ButtonProps) => {
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
     blue: "bg-[#88AAEE] text-black hover:bg-[#6193f8de]",
    yellow: "bg-[#F4E041] text-black hover:bg-[#eedb48d7]",
    purple: "bg-[#B197FC] text-white hover:bg-[#a085ed]",
    white: "bg-white text-black hover:bg-gray-50",
    green: "bg-[#A7F3D0] text-black hover:bg-[#a7f3d0c2] ",
    google: "bg-white text-black border-4 border-black hover:bg-gray-50",
    disabled:
      "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed shadow-none translate-x-0 translate-y-0 ",
  };

  return (
    <motion.button
      {...props}
      whileHover={{ scale: 1.02, boxShadow: "0px 6px 0px 0px rgba(0,0,0,1)" }}
      whileTap={{ scale: 0.98, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
      className={`
        relative w-full py-3.5 border-4 border-black rounded-2xl
        font-black uppercase text-xs md:text-sm tracking-widest transition-all
        shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3 bg-[#6193f8de]
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </motion.button>
  );
};
