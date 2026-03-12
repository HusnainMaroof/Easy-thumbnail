"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MainButton } from "./Buttons";
import {
  Download,
  ImageIcon,
  RotateCcw,
  Share2,
  Sliders,
  Sparkles,
  User,
} from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";
import Image from "next/image";

const DashboardPreview = () => {
  const { generateForm, thumbnail } = useAuthContext();

  return (
    <div>
      {" "}
      <motion.div
        key="review"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col lg:flex-row h-full"
      >
        {/* PREVIEW CANVAS AREA */}
        <div className="flex-2 p-4 md:p-8 flex flex-col gap-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center px-2 md:px-4 mt-2">
            <h2 className="text-xl md:text-2xl font-black uppercase italic">
              Studio Result
            </h2>
            <div className="flex gap-2">
              <MainButton variant="white" className="px-3! py-2!">
                <Download size={16} />
              </MainButton>
              <MainButton
                variant="white"
                className="px-3! py-2! hidden sm:flex"
              >
                <Share2 size={16} />
              </MainButton>
            </div>
          </div>

          <div className="bg-white border-2 border-zinc-100 rounded-4xl md:rounded-[3rem] p-4 md:p-10 flex-1 flex items-center justify-center min-h-100">
            {/* DYNAMIC ASPECT RATIO CONTAINER */}
            <div
              className={`w-full   
                        ${generateForm.platform === "youtube" ? "aspect-9/16 max-h-150 h-full mx-auto" : generateForm.platform === "instagram" ? "aspect-square max-w-125 mx-auto" : "aspect-video w-[95%]"}`}
            >
              {thumbnail ? (
                <Image src={`${thumbnail!}`} alt="thumbnail" />
              ) : (
                <div className="h-full rounded-2xl inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent p-6 md:p-12 flex flex-col justify-end">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-5xl font-black text-white uppercase italic leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,1)]"
                  >
                    Your Thumnail
                  </motion.h1>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4 }}
                    className="origin-left h-6 md:h-8 bg-[#F4E041] w-2/3 border-2 border-black mt-4 shadow-[2px_2px_0px_0px_#000]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* REFINE PANEL */}
        <div className="flex-1 border-t-2 lg:border-t-0 lg:border-l-2 border-zinc-100 bg-white p-6 md:p-8 overflow-y-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-2">
            <Sliders size={14} className="text-[#88AAEE]" /> Studio Refinement
          </p>

          <div className="space-y-10">
            <section className="space-y-4">
              <div className="flex justify-between font-black text-[9px] uppercase">
                <span>Saturation Focus</span>
                <span className="text-[#88AAEE]">85%</span>
              </div>
              <input
                type="range"
                className="w-full accent-[#88AAEE] h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
            </section>

            <section className="space-y-4">
              <label className="text-[9px] font-black uppercase text-zinc-400">
                Quick Actions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <button className="p-4 border-2 border-zinc-200 rounded-2xl flex items-center justify-between hover:border-black transition-all group bg-zinc-50 hover:bg-white">
                  <span className="font-black uppercase text-[10px]">
                    Swap Background
                  </span>
                  <ImageIcon
                    size={16}
                    className="text-zinc-400 group-hover:text-black"
                  />
                </button>
                <button className="p-4 border-2 border-zinc-200 rounded-2xl flex items-center justify-between hover:border-black transition-all group bg-zinc-50 hover:bg-white">
                  <span className="font-black uppercase text-[10px]">
                    Regenerate Text
                  </span>
                  <RotateCcw
                    size={16}
                    className="text-zinc-400 group-hover:text-black"
                  />
                </button>
              </div>
            </section>

            <section className="p-6 bg-black text-white rounded-4xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(136,170,238,0.4)]">
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-[#F4E041]" /> Optimization
                Note
              </h4>
              <p className="text-[11px] font-bold opacity-80 leading-relaxed">
                Your layout aligns perfectly with the{" "}
                <span className="text-[#F4E041]">
                  {generateForm.category || "selected"}
                </span>{" "}
                niche. AI suggests keeping the text under 4 words for maximum
                mobile legibility.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPreview;
