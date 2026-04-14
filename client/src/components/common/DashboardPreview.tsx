"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  ImageIcon,
  RotateCcw,
  Share2,
  Sliders,
  Sparkles,
  X,
  Monitor,
  Smartphone,
  Expand,
} from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";

const MainButton = ({
  children,
  onClick,
  className = "",
  disabled,
  variant,
}: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_#000] hover:translate-y-px hover:translate-x-px hover:shadow-[1px_1px_0px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center bg-white text-black ${className}`}
  >
    {children}
  </button>
);

const DashboardPreview = () => {
  const { generateForm, thumbnail } = useAuthContext();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"auto" | "pc" | "mobile">(
    "auto",
  );

  const handleDownload = async () => {
    if (!thumbnail) return;
    try {
      const response = await fetch(thumbnail);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `studio-result.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback if fetch fails
      const a = document.createElement("a");
      a.href = thumbnail;
      a.download = `studio-result.jpg`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };
  console.log("thumbnail fom previwer ", thumbnail);

  const getAspectClass = () => {
    return generateForm?.platform === "youtube"
      ? "aspect-video"
      : generateForm?.platform === "instagram"
        ? "aspect-square"
        : "aspect-[9/16]";
  };

  const getWidthClass = () => {
    if (previewMode === "pc") return "max-w-4xl";
    if (previewMode === "mobile") return "max-w-[320px]";
    // Auto Default
    return generateForm?.platform === "youtube"
      ? "max-w-4xl"
      : generateForm?.platform === "instagram"
        ? "max-w-lg"
        : "max-w-sm";
  };

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#fafafa] flex flex-col lg:flex-row overflow-x-hidden">
      {/* PREVIEW CANVAS AREA (Left Side) */}
      <motion.div
        key="review"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 lg:flex-[2] p-4 md:p-8 flex flex-col gap-6 lg:overflow-y-auto"
      >
        <div className="flex justify-between items-center px-2 md:px-4 mt-2 shrink-0">
          <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight">
            Studio Result
          </h2>
          <div className="flex gap-2">
            <MainButton
              variant="white"
              className="px-3! py-2!"
              onClick={handleDownload}
              disabled={!thumbnail}
              title="Download Thumbnail"
            >
              <Download size={16} strokeWidth={2.5} />
            </MainButton>
            <MainButton
              variant="white"
              className="px-3! py-2! hidden sm:flex"
              disabled={!thumbnail}
              title="Share"
            >
              <Share2 size={16} strokeWidth={2.5} />
            </MainButton>
          </div>
        </div>

        {/* Clean container that grows naturally */}
        <div className="bg-white border-2 border-zinc-200 rounded-3xl md:rounded-[3rem] p-4 sm:p-8 md:p-10 flex-1 flex flex-col items-center justify-center min-h-[400px] gap-8">
          {/* Device Toggles */}
          <div className="flex bg-zinc-100 p-1.5 rounded-xl border-2 border-zinc-200 w-full max-w-sm shrink-0 mx-auto">
            <button
              onClick={() => setPreviewMode("auto")}
              className={`flex-1 py-2 flex items-center cursor-pointer justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${previewMode === "auto" ? "bg-white shadow-[2px_2px_0px_0px_#000] border-2 border-black text-black" : "text-zinc-500 hover:text-black border-2 border-transparent"}`}
            >
              <Expand size={14} strokeWidth={2.5} /> Auto
            </button>
            <button
              onClick={() => setPreviewMode("pc")}
              className={`flex-1 py-2 flex items-center cursor-pointer justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${previewMode === "pc" ? "bg-white shadow-[2px_2px_0px_0px_#000] border-2 border-black text-black" : "text-zinc-500 hover:text-black border-2 border-transparent"}`}
            >
              <Monitor size={14} strokeWidth={2.5} /> Desktop
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`flex-1 py-2 flex items-center cursor-pointer justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${previewMode === "mobile" ? "bg-white shadow-[2px_2px_0px_0px_#000] border-2 border-black text-black" : "text-zinc-500 hover:text-black border-2 border-transparent"}`}
            >
              <Smartphone size={14} strokeWidth={2.5} /> Mobile
            </button>
          </div>

          {/* Dynamic Ratio Wrapper */}
          <div
            className={`relative w-full shadow-[6px_6px_0px_0px_#000] border-[3px] border-black rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 flex justify-center items-center hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_#000] bg-zinc-100
              ${getAspectClass()} ${getWidthClass()} max-h-[65vh]
            `}
            onClick={() => setIsPreviewOpen(true)}
          >
            {thumbnail ? (
              <>
                <img
                  src={thumbnail}
                  alt="Generated Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none flex items-center justify-center">
                  <div className="bg-black/80 text-white font-black uppercase tracking-widest text-[10px] px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 duration-300">
                    Click to Enlarge
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 md:p-12 flex flex-col justify-end">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-black text-white uppercase italic leading-none drop-shadow-[0_4px_4px_rgba(0,0,0,1)]"
                >
                  Your Thumbnail
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
      </motion.div>

      {/* REFINE PANEL (Right Side) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-[350px] xl:w-[420px] shrink-0 border-t-2 lg:border-t-0 lg:border-l-2 border-zinc-200 bg-white p-6 md:p-8 lg:overflow-y-auto"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-2">
          <Sliders size={14} className="text-blue-300" strokeWidth={2.5} />{" "}
          Studio Refinement
        </p>

        <div className="space-y-10">
          <section className="space-y-4">
            <div className="flex justify-between font-black text-[9px] uppercase tracking-widest text-zinc-600">
              <span>Saturation Focus</span>
              <span className="text-blue-400">85%</span>
            </div>
            <input
              type="range"
              className="w-full accent-blue-300 h-2 bg-zinc-100 border border-zinc-200 rounded-lg appearance-none cursor-pointer"
            />
          </section>

          <section className="space-y-4">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
              Quick Actions
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <button className="p-4 border-2 border-zinc-200 rounded-2xl flex items-center justify-between hover:border-black transition-all group bg-zinc-50 hover:bg-white cursor-pointer shadow-sm hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5">
                <span className="font-black uppercase tracking-widest text-[10px]">
                  Swap Background
                </span>
                <ImageIcon
                  size={16}
                  strokeWidth={2.5}
                  className="text-zinc-400 group-hover:text-black transition-colors"
                />
              </button>
              <button className="p-4 border-2 border-zinc-200 rounded-2xl flex items-center justify-between hover:border-black transition-all group bg-zinc-50 hover:bg-white cursor-pointer shadow-sm hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5">
                <span className="font-black uppercase tracking-widest text-[10px]">
                  Regenerate Text
                </span>
                <RotateCcw
                  size={16}
                  strokeWidth={2.5}
                  className="text-zinc-400 group-hover:text-black transition-colors group-hover:-rotate-45"
                />
              </button>
            </div>
          </section>

          <section className="p-6 bg-black text-white rounded-3xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(147,197,253,0.4)] relative overflow-hidden">
            {/* Subtle glow effect inside the box using blue-300 color */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-300 rounded-full blur-[50px] opacity-20" />

            <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 text-blue-300">
              <Sparkles
                size={14}
                strokeWidth={2.5}
                className="text-[#F4E041]"
              />{" "}
              Optimization Note
            </h4>
            <p className="text-xs font-bold opacity-90 leading-relaxed">
              Your layout aligns perfectly with the{" "}
              <span className="text-[#F4E041] underline decoration-2 underline-offset-2">
                {generateForm?.category || "selected"}
              </span>{" "}
              niche. AI suggests keeping the text under 4 words for maximum
              mobile legibility.
            </p>
          </section>
        </div>
      </motion.div>

      {/* --- FULLSCREEN IMAGE MODAL --- */}
      <AnimatePresence>
        {isPreviewOpen && thumbnail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[999] p-4 md:p-8"
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-14 right-0 flex gap-3 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="w-10 h-10 cursor-pointer rounded-full bg-[#F4E041] border-[3px] border-black flex items-center justify-center hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_#000]"
                  title="Download Thumbnail"
                >
                  <Download
                    size={18}
                    strokeWidth={2.5}
                    className="text-black"
                  />
                </button>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="w-10 h-10 cursor-pointer text-white bg-black border-[3px] border-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_#000]"
                  title="Close Preview"
                >
                  <X size={20} strokeWidth={3} />
                </button>
              </div>

              <div className="relative w-full h-[85vh] max-h-[85vh] flex justify-center ">
                <img
                  src={thumbnail}
                  alt="Thumbnail Full Preview"
                  className="max-w-full max-h-full object-contain border-[4px] border-black rounded-2xl bg-zinc-900 "
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPreview;
