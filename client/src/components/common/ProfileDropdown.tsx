"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Eye,
  Star,
  LifeBuoy,
  LogIn,
  Crown,
  Menu,
  X,
  ArrowRight,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";
import { LogoutButton } from "./Logout";

export const ProfileDropdown = () => {
  const { user } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{
          scale: 1.02,
          translateY: -2,
          boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
        }}
        whileTap={{
          scale: 0.98,
          translateY: 0,
          boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
        }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center cursor-pointer gap-2 sm:gap-3 p-1 bg-white border-[3px] text-black border-black rounded-xl transition-all duration-200
          ${isOpen ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1" : "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
      >
        <div className="w-8 h-8 rounded-lg bg-[#B197FC] border-2 border-black flex items-center justify-center overflow-hidden">
          <span className="font-black text-white text-[11px] tracking-widest">
            {getInitials(user?.displayName!)}
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-4 w-72 bg-white border-[3px] text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-120 overflow-hidden rounded-2xl"
          >
            {/* Dropdown Header (Includes Credits for Mobile visibility) */}

            <div className="p-3 flex flex-col gap-1">
              <a
                href="#"
                className="flex items-center gap-3 p-3 font-black text-xs uppercase tracking-widest hover:bg-[#F4E041] rounded-xl group border-2 border-transparent hover:border-black transition-all cursor-pointer"
              >
                <span className="p-1.5 border-2 border-black bg-white text-black rounded-lg shadow-[2px_2px_0px_0px_#000] group-hover:shadow-none transition-all">
                  <LayoutDashboard size={14} strokeWidth={3} />
                </span>
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-3 font-black text-xs uppercase tracking-widest hover:bg-[#88AAEE] rounded-xl group border-2 border-transparent hover:border-black transition-all cursor-pointer"
              >
                <span className="p-1.5 border-2 border-black bg-white text-black rounded-lg shadow-[2px_2px_0px_0px_#000] group-hover:shadow-none transition-all">
                  <Settings size={14} strokeWidth={3} />
                </span>
                Settings
              </a>

              <div className="h-1 w-full bg-zinc-100 my-2 rounded-full" />

              <button className="w-full flex items-center justify-center gap-2 p-3 font-black text-xs uppercase tracking-widest bg-black text-white hover:bg-zinc-800 rounded-xl group border-2 border-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_#B197FC] active:translate-y-1 active:shadow-none">
                <LogOut size={14} strokeWidth={3} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
