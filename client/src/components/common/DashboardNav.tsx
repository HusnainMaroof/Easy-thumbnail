"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelLeftClose,
  PanelLeft,
  User,
  X,
  Menu,
  ArrowRight,
  Zap,
  Crown,
  Settings,
  LogOut,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { navItems } from "@/src/static data/navbarData";
import { useAuthContext } from "@/src/context/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";
import Link from "next/link";

const DashboardNavBar = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        setScrolled(window.scrollY > 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed w-full top-0 z-100 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b-[3px] border-black shadow-[0_4px_20px_rgba(0,0,0,0.05)] py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* LEFT: Brand Logo */}
          <div className="flex items-center gap-6 lg:gap-10">
            <div
              className={`transition-all duration-300 ${scrolled ? "scale-95" : "scale-100"}`}
            >
              <BrandLogo />
            </div>
          </div>

          {/* RIGHT: Credits & Unified User Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Credits Pill (Hidden on tiny mobile, visible on sm+) */}

            {/* Mobile Go Pro Button */}
            <Link href={"/dashboard/pricing"}>
              {" "}
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
                className={`flex  bg-blue-300 relative cursor-pointer items-center justify-center gap-1.5 p-2 font-black uppercase text-[14px]  border-[3px] text-black border-black transition-colors rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
              >
                <Crown size={18} strokeWidth={3} />
                <span className="whitespace-nowrap">Go Pro</span>
              </motion.button>
            </Link>

            {/* Unified User Menu Toggle */}
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
              className={`flex items-center cursor-pointer gap-2 sm:gap-3 pl-1 pr-3 py-1 bg-white border-[3px] text-black border-black rounded-xl transition-all duration-200 z-120 relative
                ${isOpen ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1" : "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"}`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#B197FC] border-2 border-black flex items-center justify-center overflow-hidden shrink-0">
                <span className="font-black text-white text-[11px] tracking-widest">
                  {getInitials(user?.displayName!)}
                </span>
              </div>

              {isOpen ? (
                <X size={16} strokeWidth={3} className="ml-1 shrink-0" />
              ) : (
                <Menu size={16} strokeWidth={3} className="ml-1 shrink-0" />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* MASTER UNIFIED MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/80 backdrop-blur-sm z-105"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Master Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-100 bg-white border-l-4 border-black shadow-[-8px_0_0_0_rgba(0,0,0,1)] z-110 flex flex-col pt-24 pb-6 px-6 overflow-y-auto"
            >
              {/* Top: User Profile Header */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-zinc-50 border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-14 h-14 rounded-xl bg-[#B197FC] border-[3px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] shrink-0">
                  <span className="font-black text-white text-xl tracking-widest">
                    {getInitials(user?.displayName!)}
                  </span>
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-black text-sm uppercase tracking-widest truncate">
                    {user?.displayName!}
                  </span>
                  <span className="font-bold text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5 truncate">
                    {user?.email}
                  </span>
                  <div className="w-fit flex items-center gap-1 bg-[#F4E041] px-2 py-0.5 rounded border-2 border-black">
                    <Crown size={10} strokeWidth={3} className="text-black" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-black">
                      {user?.SubPlans} PLAN
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle: Navigation Links */}
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 pl-2">
                Navigation Area
              </p>

              <div className="flex flex-col gap-3">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    className="group flex items-center justify-between p-4 text-sm font-black uppercase tracking-widest border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-[#F4E041] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-[#88AAEE] p-2 rounded-xl border-[3px] border-black shadow-[2px_2px_0px_0px_#000] group-hover:shadow-none transition-all">
                        {item.icon}
                      </span>
                      <div className="flex items-center gap-3">
                        {item.name}
                        {item.badge && (
                          <span className="bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_#000] translate-y-1">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight
                      size={20}
                      strokeWidth={3}
                      className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </motion.a>
                ))}

                <div className="h-1 w-full bg-zinc-100 my-2 rounded-full" />

                {/* Settings Link */}
                <motion.a
                  href="#"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group flex items-center gap-3 p-4 text-sm font-black uppercase tracking-widest border-[3px] border-transparent rounded-2xl hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                >
                  <span className="bg-zinc-100 p-2 rounded-xl border-[3px] border-transparent group-hover:border-black group-hover:bg-white transition-all">
                    <Settings size={18} strokeWidth={2.5} />
                  </span>
                  Profile Settings
                </motion.a>
              </div>

              {/* Bottom: Credits & Actions */}
              <div className="mt-auto pt-8 flex flex-col gap-4">
                <div className="bg-zinc-900 border-[3px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_#B197FC]">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">
                    Your Workspace
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#F4E041] p-2 rounded-xl border-2 border-black">
                        <Zap size={20} strokeWidth={3} className="text-black" />
                      </div>
                      <span className="font-black text-white text-lg uppercase tracking-widest">
                        {user?.credits}{" "}
                        <span className="text-xs text-zinc-400">Credits</span>
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-lg border-2 border-black hover:bg-zinc-200 transition-colors cursor-pointer">
                      Top Up
                    </button>
                  </div>
                </div>

                <LogOut />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to push content down when navbar is fixed at top */}
      <div className="h-24 w-full bg-transparent" />
    </>
  );
};

export default DashboardNavBar;
