"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  HelpCircle,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
  Twitter,
  Github,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="relative z-10 border-t-2 border-black bg-white mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            © {new Date().getFullYear()} Thumbnail Builder. Built with{" "}
            <Heart size={12} fill="#FF0000" className="text-[#FF0000]" />
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="#"
            className="text-[10px] font-black text-zinc-500 hover:text-[#a855f7] uppercase tracking-widest transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[10px] font-black text-zinc-500 hover:text-[#a855f7] uppercase tracking-widest transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-[10px] font-black text-zinc-500 hover:text-[#a855f7] uppercase tracking-widest transition-colors"
          >
            System Status
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
