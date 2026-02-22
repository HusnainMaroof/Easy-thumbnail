"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  UserCircle2,
  LayoutTemplate,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { log } from "console";
import { useAuthContext } from "@/src/context/AuthContext";

const MainHeroSection = () => {
  const [prompt, setPrompt] = useState<string>("");
  const { showAuthPopup, setShowAuthPopup } = useAuthContext();
  console.log(prompt);

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    setShowAuthPopup(true);
    console.log("Prompt:", prompt);
  };
  const isDisabled = prompt.trim().length === 0;
  return (
    <section className="relative  w-full bg-[#FFFFFF] overflow-hidden">
      {/* NEO-BRUTAL GRID BACKGROUND */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10  mx-auto px-4 pt-10 pb-12 flex flex-col items-center text-center">
        {/* UPPER BADGE */}

        {/* MAIN HEADING */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-black mb-6"
        >
          FREE AI <br />
          <span className="bg-[#F4E041] px-4 border-4 border-black inline-block transform -rotate-2">
            THUMBNAIL
          </span>
          <br /> MAKER
        </motion.h1>

        {/* SUBHEADING */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl text-md md:text-lg font-bold text-gray-700 mb-12"
        >
          The only AI designed specifically to generate YouTube thumbnails that
          actually get clicks. AI makes thumbnails while you record more videos.
        </motion.p>

        {/* PROMPT INTERFACE (Neo-Brutalized version of the reference) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-3xl bg-white border-[6px] border-black p-4 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-16 text-left rounded-xl"
        >
          {/* TEXT AREA BOX */}
          <div className="relative mb-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask the AI to create a thumbnail of..."
              className="w-full rounded-xl h-32 md:h-40 text-black bg-gray-50 border-4 border-black p-4 font-bold text-lg focus:outline-none focus:bg-white transition-colors resize-none placeholder:text-gray-400"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <motion.button
                onClick={handleSubmit}
                disabled={isDisabled}
                whileHover={
                  !isDisabled
                    ? {
                        translateX: -4,
                        translateY: -4,
                        boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)",
                      }
                    : {}
                }
                whileTap={
                  !isDisabled
                    ? {
                        translateX: 2,
                        translateY: 2,
                        boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
                      }
                    : {}
                }
                className={` relative flex items-center justify-center gap-2 px-4 py-2 font-black uppercase text-xs md:text-sm border-4  transition-colors rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  
                  ${
                    isDisabled
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed shadow-none"
                      : "bg-black text-white cursor-pointer border-black"
                  }
                `}
              >
                <ArrowUpRight size={18} />
              </motion.button>
            </div>
          </div>

          {/* ACTION BUTTONS GRID */}
        </motion.div>
      </div>
    </section>
  );
};

export default MainHeroSection;
