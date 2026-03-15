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
  CrownIcon,
  LogIn,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { dashboardNavItem, navItems } from "@/src/static data/navbarData";
import { useAuthContext } from "@/src/context/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";
import Link from "next/link";
import { LogoutButton } from "./Logout";
import { redirect } from "next/navigation";

export const NavBar = () => {
  const { user, setShowLoginPopup } = useAuthContext();
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

  const getInitials = (name: string | undefined | null): string => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed w-full top-0 z-100 transition-all duration-300 bg-white ${
          scrolled
            ? " backdrop-blur-md border-b-[3px] border-black shadow-[0_4px_20px_rgba(0,0,0,0.05)] py-2"
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
                className={`hidden sm:flex  bg-blue-300 relative cursor-pointer items-center justify-center gap-1.5 p-2 font-black uppercase text-[14px]  border-[3px] text-black border-black transition-colors rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
              >
                <Crown size={18} strokeWidth={3} />
                <span className="whitespace-nowrap">Go Pro</span>
              </motion.button>
            </Link>{" "}
            {!user && (
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
                onClick={() => setShowLoginPopup(true)}
                className={`flex  bg-blue-300 relative cursor-pointer items-center justify-center gap-1.5 p-2 font-black uppercase text-[14px]  border-[3px] text-black border-black transition-colors rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
              >
                <LogIn size={18} strokeWidth={3} />

                <span className="whitespace-nowrap">Login</span>
              </motion.button>
            )}
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
              className="fixed inset-y-0 right-0 w-full sm:w-100 bg-white border-l-4 border-black shadow-[-8px_0_0_0_rgba(0,0,0,1)] z-110 flex flex-col py-2.5  px-6 overflow-y-auto"
            >
              <span
                onClick={() => setIsOpen(false)}
                className="text-black py-5  text-xl underline flex items-center gap-2"
              >
                <PanelLeftClose /> Back{" "}
              </span>
              {/* Top: User Profile Header */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-zinc-50 border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-14 h-14 rounded-xl bg-blue-200  text-black border-[3px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] shrink-0">
                  <span className="font-black  text-xl tracking-widest">
                    {getInitials(user?.displayName!)}
                  </span>
                </div>
                <div className="flex flex-col overflow-hidden text-black!">
                  <span className="font-black text-sm uppercase tracking-widest truncate">
                    {user?.displayName!}
                  </span>
                  <span className="font-semibold text-[10px] text-black uppercase tracking-widest mb-1.5 truncate">
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
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-black mb-4 pl-2">
                Navigation Area
              </p>

              <div className="flex flex-col gap-3 text-black!">
                {dashboardNavItem.map((item, idx) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    className="group flex items-center justify-between p-3 text-sm font-black uppercase tracking-widest border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-[#F4E041] transition-all cursor-pointer"
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

                <div className="h-1 w-full bg-gray-400 my-2 rounded-full" />

                {/* Settings Link */}
              </div>

              {/* Bottom: Credits & Actions */}
              <div className="mt-auto pt-8 flex flex-col gap-4 w-full">
                {" "}
                <motion.button
                  onClick={() => {
                    window.location.replace("/dashboard/pricing");
                  }}
                  whileHover={{
                    translateX: -4,
                    translateY: -4,
                    boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
                  }}
                  whileTap={{
                    translateX: 2,
                    translateY: 2,
                    boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
                  }}
                  className={`group text-black flex items-center justify-between p-3 text-sm font-black w-full uppercase tracking-widest border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white active:translate-x-1 active:translate-y-1 active:shadow-none hover:bg-[#F4E041] transition-all cursor-pointer`}
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-[#88AAEE] p-2 rounded-xl border-[3px] border-black shadow-[2px_2px_0px_0px_#000] group-hover:shadow-none transition-all">
                      <CrownIcon />
                    </span>
                    <div className="flex items-center gap-3">Go Pro</div>
                  </div>
                  <ArrowRight
                    size={20}
                    strokeWidth={3}
                    className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </motion.button>
                <LogoutButton />
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
