"use client"

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BrandLogo = () => {
  return (
     <a href="/">
            <motion.div
              initial={{ rotate: -1.5 }}
              whileHover={{ rotate: 1, scale: 1.05 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="flex items-center">
                <span className="text-sm sm:text-lg lg:text-2xl  font-black uppercase tracking-tighter leading-none text-black">
                  EASY
                </span>
                <div className="relative ml-1">
                  <span className="relative z-10 bg-[#88AAEE] text-black px-2 py-1 border-4 border-black text-md lg:text-xl font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#F4E041] transition-colors">
                    THUMBNAIL
                  </span>
                  {/* Shadow Offset Decor */}
                  <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 -z-10 opacity-20"></div>
                </div>
              </div>
            </motion.div>
          </a>
  )
}

export default BrandLogo