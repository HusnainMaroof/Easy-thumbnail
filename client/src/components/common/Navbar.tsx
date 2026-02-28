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
  Sparkles,
  ArrowRight,
  PersonStanding,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { navItems } from "@/src/static data/navbarData";
import { useAuthContext } from "@/src/context/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";

const Navbar = () => {
  const { setShowLoginPopup, user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navHeight = navRef.current.offsetHeight;
        setScrolled(window.scrollY > navHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  console.log(scrolled);

  return (
    <nav
      ref={navRef}
      className={`w-full ${!scrolled && "bg-white"}  border-b-4 border-black sticky top-0 z-50 transition-all duration-300 py-3`}
    >
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* LEFT: BRAND LOGO */}
          <div className={`${scrolled && " bg-white  text-black"} `}>
            <BrandLogo />
          </div>

          {/* MIDDLE: NAV ITEMS */}
          {!scrolled && (
            <div className="hidden lg:flex items-center gap-1 bg-gray-100/80 backdrop-blur-sm border-2 border-black p-1 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="no-underline">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="relative px-4 py-2 font-black text-[11px] uppercase flex items-center gap-2 text-black hover:bg-black rounded-md hover:text-white transition-all group  cursor-pointer"
                  >
                    {item.icon}
                    <span className="hidden lg:inline">{item.name}</span>

                    {item.badge && (
                      <span className="absolute -top-3 -right-2 bg-[#FF6B6B] text-white text-[9px] px-1.5 py-0.5 border-2 border-black font-black   rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                </a>
              ))}
            </div>
          )}

          {/* RIGHT: ACTIONS */}
          <div className="flex items-center gap-2 lg:gap-4">
            {!user && (
              <a
                onClick={() => setShowLoginPopup(true)}
                className="hidden md:block no-underline text-black"
              >
                <motion.div
                  whileHover={{ x: -3 }}
                  className="flex items-center gap-2 font-black uppercase text-xs px-4 py-2 hover:underline cursor-pointer"
                >
                  <LogIn size={16} />
                  Login
                </motion.div>
              </a>
            )}

            <motion.button
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
              className={` hidden md:flex secondary-var relative cursor-pointer items-center justify-center gap-2 px-5 py-2.5 font-black uppercase text-xs md:text-sm border-4 border-black transition-colors text-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
            >
              <Crown size={18} className="hidden lg:block" />
              <span className="whitespace-nowrap">Go Pro</span>
            </motion.button>

            {user && <ProfileDropdown />}

            {/* MOBILE TOGGLE */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 border-4 cursor-pointer border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2  hover:translate-y-0.5 transition-all duration-150 rounded-lg"
            >
              {isOpen ? (
                <X size={24} color="black" />
              ) : (
                <Menu size={24} color="black" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-22 lg:hidden bg-[#FDFDFF] z-40 flex flex-col p-6 border-t-4 border-black"
          >
            <div className="flex flex-col gap-5 overflow-y-auto pb-8">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                Navigation
              </p>
              {navItems.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.name}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="no-underline text-black"
                  >
                    <div className="flex items-center justify-between p-5 text-xl font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                      <div className="flex items-center gap-4">
                        <span className="bg-[#88AAEE] p-2 border-2 border-black">
                          {item.icon}
                        </span>
                        {item.name}
                      </div>
                      <ArrowRight size={24} />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4 ">
              {!user && (
                <motion.button
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
                  onClick={() => setShowLoginPopup(true)}
                  className={` flex md:hidden outline-va relative cursor-pointer items-center justify-center gap-2 px-5 py-4 font-black uppercase text-xs md:text-sm border-4 border-black transition-colors text-black  rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <LogIn size={20} /> Login
                </motion.button>
              )}
              <motion.button
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
                className={` flex md:hidden secondary-var relative cursor-pointer items-center justify-center gap-2 px-5 py-4 font-black uppercase text-xs md:text-sm border-4  text-black  border-black transition-colors rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
              >
                <Crown size={18} className="flex md:hidden" />
                <span className="whitespace-nowrap">Go Pro</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
