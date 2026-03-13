"use client";

import React, { ReactNode, ButtonHTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
  variant?:
    | "purple"
    | "white"
    | "google"
    | "disabled"
    | "green"
    | "yellow"
    | "blue"
    | "black";
}

export const MainButton = ({
  children,
  className = "",
  variant = "purple",
  disabled,
  ...props
}: ButtonProps) => {
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    blue: "bg-[#88AAEE] text-white border-black shadow-[4px_4px_0px_0px_#000]",
    yellow:
      "bg-[#F4E041] text-black border-black shadow-[4px_4px_0px_0px_#000]",
    white: "bg-white text-black border-black shadow-[3px_3px_0px_0px_#000]",
    green: "bg-[#A7F3D0] text-black border-black shadow-[4px_4px_0px_0px_#000]",
    google: "bg-white text-black border-4 border-black hover:bg-gray-50",
    purple: "bg-[#B197FC] text-white hover:bg-[#a085ed]",
    black:
      "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(136,170,238,0.5)]",
    disabled:
      "bg-zinc-100 text-zinc-400 border-zinc-200  cursor-not-allowed shadow-none translate-x-0 translate-y-0 ",
  };

  return (
    <motion.button
      {...props}
      whileHover={
        disabled
          ? {}
          : { translateY: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }
      }
      whileTap={
        disabled
          ? {}
          : { translateY: 1, boxShadow: "1px 1px 0px 0px rgba(0,0,0,1)" }
      }
      disabled={disabled}
      className={`
        relative w-full py-3.5 border-4 border-black rounded-2xl
        font-black uppercase text-xs md:text-sm tracking-widest transition-all
        shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3 bg-[#6193f8de]
        ${variants[disabled ? "disabled" : variant]} ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export const PreviewerIconButton = ({
  icon: Icon,
  isActive = false,
  onClick,
}: any) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${isActive ? `bg-[#a855f7] text-white shadow-sm` : `bg-transparent text-zinc-500 hover:bg-zinc-100`}`}
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );
};
