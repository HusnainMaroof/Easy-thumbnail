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
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { navItems } from "@/src/static data/navbarData";
import { useAuthContext } from "@/src/context/AuthContext";
import { ProfileDropdown } from "./ProfileDropdown";

const DashboardNavBar = () => {
  const { user } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  // Handle scroll effect
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className={`w-full  top-0 z-110 transition-all duration-300 pt-1 bg-white`}
    >
      <div className="mx-auto px-2 lg:px-6 flex justify-between items-center h-16">
        {/* LEFT: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <div className="w-fit rounded-lg sm:p-2 sm:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <BrandLogo />
          </div>
        </div>

        {/* RIGHT: Profile & Mobile Menu */}
        <div className="flex items-center gap-4">
          {user && <ProfileDropdown />}

          {/* Mobile toggle */}
          <motion.button
            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border-4 cursor-pointer text-black border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-0.5 transition-all duration-150 rounded-lg"
          >
            {isOpen ? <X size={24} className=" " /> : <Menu size={24} />}
          </motion.button>
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
            className="fixed inset-0 top-16 z-110 bg-white flex flex-col p-6 border-t-4 border-black overflow-y-auto"
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
              Navigation
            </p>
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="no-underline text-black mb-3"
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
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default DashboardNavBar;
