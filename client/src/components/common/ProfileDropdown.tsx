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

export const ProfileDropdown = ({}) => {
  const { user } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // event.target is of type EventTarget, so we need to assert it's a Node
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

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
      href: "/dashboard/home",
    },
    {
      label: "Profile Settings",
      icon: <Settings size={16} />,
      href: "/settings",
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer gap-2 px-3 py-2 bg-white border-4 text-black border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2  hover:translate-y-0.5 transition-all"
      >
        <div className="w-6 h-6 rounded-full bg-[#B197FC] border-2 border-black flex items-center justify-center overflow-hidden">
          {user?.displayName ? (
            <img
              src={user.displayName}
              alt="pfp"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={14} className="text-white" />
          )}
        </div>
        <span className="hidden lg:block font-black text-[10px] uppercase tracking-wider truncate max-w-20">
          {user?.displayName || "Creator"}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-56 bg-white border-4 text-black border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-60 overflow-hidden rounded-xl"
          >
            <div className="p-4 border-b-4 border-black bg-gray-50 font-black text-[10px] uppercase text-black">
              Account Menu
            </div>
            <div className="p-2">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 p-3 font-black text-xs uppercase hover:bg-[#B197FC] hover:text-white transition-colors rounded-lg group"
                >
                  <span className="p-1.5 border-2 border-black bg-white group-hover:bg-white text-black rounded-md">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              ))}
              <LogoutButton />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
