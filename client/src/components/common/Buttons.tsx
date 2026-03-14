"use client";

import React, { ReactNode, ButtonHTMLAttributes, JSX } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { LucideIcon } from "lucide-react";

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

type PreviewerIconButtonProps = {
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  title?: string;
  children?: ReactNode;
};

export const PreviewerIconButton = ({
  icon: Icon,
  isActive = false,
  onClick,
  title,
}: PreviewerIconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative group z-110 cursor-pointer p-2 rounded-lg transition-all duration-500 flex items-center justify-center ${
        isActive
          ? "bg-blue-300 text-white shadow-sm"
          : "bg-transparent text-black hover:bg-blue-200"
      }`}
    >
      <Icon size={18} strokeWidth={2} />

       <div className="absolute z-100 bottom-10 text-[8px]   p-1 bg-gray-700 text-white  font-bold leading-relaxed rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all text-center  scale-95 group-hover:scale-100 origin-bottom">
      {title}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
    </div>
    </button>
  );
};

