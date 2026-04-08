"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelLeftClose,
  Search,
  Download,
  Trash2,
  ExternalLink,
  Filter,
  Image as ImageIcon,
  MoreVertical,
  Wand2,
  X,
} from "lucide-react";

// --- Mock Data ---
const MOCK_THUMBNAILS = [
  {
    id: 1,
    title: "How to Build a SaaS in 2024",
    date: "Oct 24, 2024",
    category: "Tech",
    color: "#F4E041",
    views: "1.2k",
  },
  {
    id: 2,
    title: "The Truth About AI Agents",
    date: "Oct 22, 2024",
    category: "AI",
    color: "#a855f7",
    views: "850",
  },
  {
    id: 3,
    title: "My Minimalist Desk Setup",
    date: "Oct 18, 2024",
    category: "Vlog",
    color: "#10b981",
    views: "3.4k",
  },
  {
    id: 4,
    title: "React vs Next.js: Which is better?",
    date: "Oct 15, 2024",
    category: "Tech",
    color: "#3b82f6",
    views: "2.1k",
  },
  {
    id: 5,
    title: "I Tried Quitting Coffee for 30 Days",
    date: "Oct 10, 2024",
    category: "Vlog",
    color: "#ef4444",
    views: "5.6k",
  },
  {
    id: 6,
    title: "Mastering Framer Motion",
    date: "Oct 05, 2024",
    category: "Design",
    color: "#f97316",
    views: "920",
  },
  {
    id: 7,
    title: "Is Devin the ultimate AI?",
    date: "Oct 01, 2024",
    category: "AI",
    color: "#a855f7",
    views: "4.2k",
  },
  {
    id: 8,
    title: "Figma Tips & Tricks 2024",
    date: "Sep 28, 2024",
    category: "Design",
    color: "#ec4899",
    views: "1.8k",
  },
];

const CATEGORIES = ["All", "Tech", "AI", "Vlog", "Design"];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};



export default function ThumbnailGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter Logic
  const filteredThumbnails = MOCK_THUMBNAILS.filter((thumb) => {
    const matchesSearch = thumb.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || thumb.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h- h-full w-full bg-[#fafafa] text-black font-sans selection:bg-[#F4E041] relative flex flex-col overflow-x-hidden pb-20 ">
      {/* --- TOP NAV --- */}
  

      {/* --- HEADER & CONTROLS --- */}
      <div className="relative z-10 px-4 md:px-8 mx-auto w-full mt-12 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-2 leading-tight uppercase drop-shadow-sm">
              My Gallery
            </h1>
            <div className="inline-flex items-center justify-center border px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest mt-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
              {MOCK_THUMBNAILS.length} Total Generations
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative group w-full sm:w-[320px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#a855f7] transition-colors">
                <Search size={18} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Search thumbnails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-[3px] border-black rounded-xl py-3.5 pl-12 pr-10 text-sm font-bold text-black outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] focus:shadow-[4px_4px_0px_0px_#a855f7] transition-all placeholder:text-zinc-400"
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-zinc-200 hover:bg-zinc-300 text-zinc-600 rounded-full p-1 transition-colors"
                  >
                    <X size={14} strokeWidth={3} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Filter Button */}
            <button className="flex items-center justify-center gap-2 bg-white border-[3px] border-black rounded-xl px-5 py-3.5 text-sm font-black uppercase tracking-widest hover:bg-zinc-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_#000]">
              <Filter size={18} strokeWidth={2.5} /> Filter
            </button>
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mt-10 overflow-x-auto pb-4 scrollbar-hide snap-x"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`snap-start shrink-0 px-6 py-2.5 rounded-xl border-[3px] border-black font-black text-[11px] uppercase tracking-widest transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#a855f7] text-white shadow-[4px_4px_0px_0px_#000] -translate-y-1"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 hover:text-black hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* --- GRID GALLERY --- */}
      <main className="relative z-10 px-4 md:px-8  mx-auto w-full">
        <AnimatePresence mode="wait">
          {filteredThumbnails.length > 0 ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            >
              {filteredThumbnails.map((thumb) => (
                <motion.div
                  key={thumb.id}
                  layout
                  className="group relative bg-white border-[3px] border-black rounded-2xl p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] hover:-translate-y-1.5 hover:-translate-x-1.5 hover:shadow-[10px_10px_0px_0px_#000] transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail Image Container */}
                  <div
                    className="w-full aspect-video rounded-xl border-2 border-black relative overflow-hidden flex items-center justify-center mb-4 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${thumb.color}aa, ${thumb.color})`,
                    }}
                  >
                    {/* Mock Content inside Thumbnail */}
                    <ImageIcon
                      size={56}
                      className="text-black opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-500"
                      strokeWidth={1.5}
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md text-white font-black text-[11px] p-2.5 rounded-lg truncate text-center border border-white/10 shadow-lg">
                      {thumb.title}
                    </div>

                    {/* Hover Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm z-10">
                      <button
                        className="w-12 h-12 rounded-full bg-[#F4E041] border-[3px] border-black flex items-center justify-center hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_#000]"
                        title="Download"
                      >
                        <Download
                          size={20}
                          strokeWidth={2.5}
                          className="text-black"
                        />
                      </button>
                      <button
                        className="w-12 h-12 rounded-full bg-white border-[3px] border-black flex items-center justify-center hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_#000]"
                        title="Preview"
                      >
                        <ExternalLink
                          size={20}
                          strokeWidth={2.5}
                          className="text-black"
                        />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Meta Info */}
                  <div className="px-1 pb-1 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="font-black text-sm text-black line-clamp-2 leading-snug group-hover:text-[#a855f7] transition-colors">
                        {thumb.title}
                      </h3>
                      <button className="text-zinc-400 hover:text-black transition-colors shrink-0 bg-zinc-100 hover:bg-zinc-200 p-1.5 rounded-md">
                        <MoreVertical size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t-2 border-dashed border-zinc-100">
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 bg-zinc-100 border border-zinc-200 px-2.5 py-1.5 rounded-md">
                        {thumb.category}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        {thumb.date}
                      </span>
                    </div>
                  </div>

                  {/* Quick Delete action */}
                  <button className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 border-2 border-black flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 hover:bg-red-600 shadow-[2px_2px_0px_0px_#000] z-20">
                    <Trash2 size={14} strokeWidth={3} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full py-24 flex flex-col items-center justify-center border-[3px] border-dashed border-zinc-300  bg-white shadow-sm"
            >
              <div className="w-24 h-24 bg-zinc-50 border-2 border-zinc-200 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                <ImageIcon
                  size={40}
                  className="text-zinc-300"
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-800 mb-3">
                No Thumbnails Found
              </h3>
              <p className="text-zinc-500 font-bold text-sm text-center max-w-md leading-relaxed">
                We couldn't find any creations matching{" "}
                <span className="text-black bg-zinc-100 px-1 rounded">
                  "{searchQuery}"
                </span>{" "}
                in the{" "}
                <span className="text-black bg-zinc-100 px-1 rounded">
                  {activeCategory}
                </span>{" "}
                category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-8 bg-black text-white px-8 py-3.5 rounded-xl font-black uppercase tracking-widest text-[11px] border-[3px] border-black shadow-[4px_4px_0px_0px_#a855f7] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0px_0px_0px_0px_#a855f7] transition-all"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
