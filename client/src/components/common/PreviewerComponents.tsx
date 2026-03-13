"use client";

import React, {
  useState,
  useMemo,
  ElementType,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useRef,
} from "react";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import {
  Search,
  RotateCcw,
  Plus,
  Monitor,
  List as ListIcon,
  Shuffle,
  ChevronLeft,
  Image as ImageIcon,
  Mic,
  MoreVertical,
  Bell,
  X,
  Menu,
  Sparkles,
  TrendingUp,
  Loader2,
  Wand2,
  Lightbulb,
  ImagePlus,
  LayoutGrid,
  Smartphone,
  CheckCircle2,
  Video,
} from "lucide-react";
import { CATEGORIES } from "@/src/static data/previewData";

export const ThumbnailImage = ({
  item,
  isMockup = false,
}: {
  item: any;
  isMockup?: boolean;
}) => {
  if (item.image)
    return (
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${isMockup ? "bg-[#272727]" : ""}`}
      style={!isMockup ? { backgroundColor: item.color } : {}}
    >
      {isMockup && (
        <ImagePlus
          size={28}
          strokeWidth={1.5}
          className="text-[#aaaaaa] opacity-60"
        />
      )}
    </div>
  );
};

export const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
export const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

// 4.1. Desktop Grid Item
export const YouTubeGridItem = forwardRef<
  HTMLDivElement,
  { item: any; showOutliers: boolean }
>(({ item, showOutliers }, ref) => {
  const isHighlight = showOutliers && item.viewsNum > 500000;
  return (
    <motion.div
      ref={ref}
      layout
      className="flex flex-col gap-3 group cursor-pointer w-full"
    >
      <div
        className={`aspect-video relative overflow-hidden rounded-xl transition-all duration-300 ${item.isPreview ? "ring-2 ring-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] z-10" : isHighlight ? "ring-2 ring-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)]" : ""}`}
      >
        <ThumbnailImage item={item} isMockup={item.isPreview && !item.image} />
        {item.isPreview && (
          <div
            className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm z-10 bg-purple-500 text-white`}
          >
            Preview
          </div>
        )}
        {isHighlight && (
          <div
            className={`absolute top-2 left-2 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm z-10 bg-amber-400 text-amber-950`}
          >
            <TrendingUp size={12} strokeWidth={2.5} /> Trending
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/40 backdrop-blur-[2px]">
          <div className="flex gap-2 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <button className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-1.5 rounded-full border border-white/20 font-medium transition-all backdrop-blur-md">
              Edit
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-1.5 rounded-full border border-white/20 font-medium transition-all backdrop-blur-md">
              Swap
            </button>
          </div>
        </div>
        <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded leading-none">
          {item.duration}
        </div>
      </div>
      <div className="flex gap-3 px-1 mt-0.5">
        <div className={`w-9 h-9 rounded-full shrink-0 bg-[#272727]`} />
        <div className="flex flex-col pr-2">
          <h3
            className={`text-[#f1f1f1] font-semibold text-[15px] leading-snug line-clamp-2 mb-1`}
          >
            {item.title}
          </h3>
          <p
            className={`text-[13px] transition-colors mt-1 text-[#aaaaaa] hover:text-[#f1f1f1]`}
          >
            {item.author}
          </p>
          <p className={`text-[13px] text-[#aaaaaa]`}>
            {item.views} • {item.time}
          </p>
        </div>
      </div>
    </motion.div>
  );
});
YouTubeGridItem.displayName = "YouTubeGridItem";

// 4.2. Search Result List Item
export const YouTubeListItem = forwardRef<
  HTMLDivElement,
  { item: any; showOutliers: boolean }
>(({ item, showOutliers }, ref) => {
  const isHighlight = showOutliers && item.viewsNum > 500000;
  return (
    <motion.div
      ref={ref}
      layout
      className={`flex gap-4 group cursor-pointer w-full max-w-5xl p-2 rounded-xl transition-colors duration-200 hover:bg-[#272727]/50`}
    >
      <div
        className={`w-90 aspect-video relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${item.isPreview ? "ring-2 ring-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : isHighlight ? "ring-2 ring-amber-400" : ""}`}
      >
        <ThumbnailImage item={item} isMockup={item.isPreview && !item.image} />
        {item.isPreview && (
          <div
            className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm z-10 bg-purple-500 text-white`}
          >
            Preview
          </div>
        )}
        {isHighlight && (
          <div
            className={`absolute top-2 left-2 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm z-10 bg-amber-400 text-amber-950`}
          >
            <TrendingUp size={12} strokeWidth={2.5} /> Trending
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/40 backdrop-blur-[2px]">
          <div className="flex gap-2 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <button className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-1.5 rounded-full border border-white/20 font-medium transition-all backdrop-blur-md">
              Edit Thumbnail
            </button>
          </div>
        </div>
        <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded leading-none">
          {item.duration}
        </div>
      </div>
      <div className="flex flex-col flex-1 py-1">
        <h3
          className={`text-[#f1f1f1] font-normal text-[18px] leading-tight line-clamp-2 mb-1`}
        >
          {item.title}
        </h3>
        <p className={`text-[12px] mb-3 text-[#aaaaaa]`}>
          {item.views} • {item.time}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-6 h-6 rounded-full bg-[#272727]`} />
          <span
            className={`text-[12px] transition-colors text-[#aaaaaa] hover:text-[#f1f1f1]`}
          >
            {item.author}
          </span>
        </div>
        <p
          className={`text-[12px] line-clamp-2 leading-relaxed max-w-2xl text-[#aaaaaa]`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae
          justo vitae libero pharetra scelerisque. Mauris id massa magna...
        </p>
      </div>
    </motion.div>
  );
});
YouTubeListItem.displayName = "YouTubeListItem";

// 4.3. Suggested Video Sidebar Item
export const YouTubeCompactListItem = forwardRef<
  HTMLDivElement,
  { item: any; showOutliers: boolean }
>(({ item, showOutliers }, ref) => {
  const isHighlight = showOutliers && item.viewsNum > 500000;
  return (
    <motion.div
      ref={ref}
      layout
      className={`flex gap-2 group cursor-pointer w-full p-1 rounded-lg transition-colors duration-200 hover:bg-[#272727]/50`}
    >
      <div
        className={`w-42 aspect-video relative shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${item.isPreview ? "ring-2 ring-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.2)]" : isHighlight ? "ring-2 ring-amber-400" : ""}`}
      >
        <ThumbnailImage item={item} isMockup={item.isPreview && !item.image} />
        {item.isPreview && (
          <div
            className={`absolute top-1 left-1 text-[8px] font-semibold px-1.5 py-0.5 rounded shadow-sm z-10 bg-purple-500 text-white`}
          >
            Preview
          </div>
        )}
        {isHighlight && (
          <div
            className={`absolute top-1 left-1 flex items-center gap-1 text-[8px] font-semibold px-1.5 py-0.5 rounded shadow-sm z-10 bg-amber-400 text-amber-950`}
          >
            <TrendingUp size={10} strokeWidth={2.5} />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/40 backdrop-blur-[2px]">
          <div className="flex gap-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] px-3 py-1 rounded-full border border-white/20 font-medium transition-all backdrop-blur-md">
              Edit
            </button>
          </div>
        </div>
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 py-0.5 rounded leading-none">
          {item.duration}
        </div>
      </div>
      <div className="flex flex-col flex-1 py-0.5">
        <h3
          className={`text-[#f1f1f1] font-semibold text-[14px] leading-snug line-clamp-2 mb-1`}
        >
          {item.title}
        </h3>
        <span
          className={`text-[12px] text-[#aaaaaa] hover:text-[#f1f1f1] transition-colors`}
        >
          {item.author}
        </span>
        <span className={`text-[12px] text-[#aaaaaa]`}>
          {item.views} • {item.time}
        </span>
      </div>
    </motion.div>
  );
});
YouTubeCompactListItem.displayName = "YouTubeCompactListItem";

// 4.4. Size Breakdown Components
export const SizeCardContainer = ({
  title,
  width,
  height,
  item,
  layout = "vertical",
}: any) => {
  const isVertical = layout === "vertical";
  return (
    <div className="flex flex-col gap-3">
      <h3 className={`text-sm font-semibold tracking-tight text-[#f1f1f1]`}>
        {title}
      </h3>
      <div
        className={`p-4 rounded-xl border w-max flex ${isVertical ? "flex-col gap-3" : "gap-4 items-start"} transition-all duration-300 group hover:shadow-md bg-[#121212] border-[#272727]`}
      >
        <div
          style={{ width: `${width}px`, height: `${height}px` }}
          className={`rounded-xl overflow-hidden relative shrink-0 ${item.isPreview ? "ring-2 ring-purple-500" : ""}`}
        >
          <ThumbnailImage
            item={item}
            isMockup={item.isPreview && !item.image}
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-medium px-1 py-0.5 rounded leading-none">
            {item.duration}
          </div>
        </div>
        <div
          className={`flex ${isVertical ? "gap-3" : "flex-col gap-1"}`}
          style={isVertical ? { width: `${width}px` } : { width: "220px" }}
        >
          {isVertical && (
            <div className={`w-9 h-9 rounded-full shrink-0 bg-[#272727]`} />
          )}
          <div className="flex flex-col">
            <h4
              className={`text-[#f1f1f1] font-semibold ${width < 200 ? "text-[13px]" : "text-[15px]"} leading-snug line-clamp-2`}
            >
              {item.title}
            </h4>
            <div className={`flex flex-col mt-1`}>
              <span className={`text-[12px] text-[#aaaaaa]`}>
                {item.author}
              </span>
              <span className={`text-[12px] mt-0.5 text-[#aaaaaa]`}>
                {item.views} • {item.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SizeViewRenderer = ({
  activeThumbnail,
}: {
  activeThumbnail: any;
}) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={containerVariants}
    className="flex flex-col gap-12 pb-20 max-w-5xl "
  >
    <motion.div className="flex flex-wrap gap-10">
      <SizeCardContainer
        title="Homepage Large (360x205)"
        width={360}
        height={205}
        item={activeThumbnail}
      />
      <SizeCardContainer
        title="Homepage Small (240x135)"
        width={240}
        height={135}
        item={activeThumbnail}
      />
    </motion.div>
    <motion.div>
      <SizeCardContainer
        title="Sidebar Suggested Video (168x94)"
        width={168}
        height={94}
        item={activeThumbnail}
        layout="horizontal"
      />
    </motion.div>
    <motion.div className="flex flex-wrap gap-10">
      <SizeCardContainer
        title="Search Result Large (360x202)"
        width={360}
        height={202}
        item={activeThumbnail}
        layout="horizontal"
      />
      <SizeCardContainer
        title="Search Result Small (240x135)"
        width={240}
        height={135}
        item={activeThumbnail}
        layout="horizontal"
      />
    </motion.div>
    <motion.div className={`pt-10 mt-4 border-t border-[#272727]`}>
      <h2
        className={`text-2xl font-semibold tracking-tight mb-8 text-[#f1f1f1]`}
      >
        Mobile Breakdowns
      </h2>
      <div className="flex flex-wrap gap-10">
        <SizeCardContainer
          title="Mobile Homepage (320x180)"
          width={320}
          height={180}
          item={activeThumbnail}
        />
        <SizeCardContainer
          title="Mobile Suggested (168x94)"
          width={168}
          height={94}
          item={activeThumbnail}
          layout="horizontal"
        />
        <SizeCardContainer
          title="Mobile Search (320x180)"
          width={320}
          height={180}
          item={activeThumbnail}
        />
      </div>
    </motion.div>
  </motion.div>
);

export const YouTubeCategories = () => (
  <div className="flex gap-3 px-6 py-3 shrink-0 bg-[#0f0f0f] border-b border-[#272727]/50 overflow-x-hidden">
    {CATEGORIES.map((tag, i) => (
      <div
        key={i}
        className={`px-3 py-1.5 rounded-lg text-[14px] font-medium whitespace-nowrap cursor-default ${
          i === 0
            ? "bg-[#f1f1f1] text-[#0f0f0f]"
            : "bg-[#272727] text-[#f1f1f1]"
        }`}
      >
        {tag}
      </div>
    ))}
  </div>
);
