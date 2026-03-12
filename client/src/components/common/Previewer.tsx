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
import { DEFAULT_USER_THUMBNAIL, YOUTUBE_DATA } from "@/src/static data/previewData";

// ==========================================
// 3. REUSABLE UI COMPONENTS
// ==========================================

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ElementType;
  label: string;
  err?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// ==========================================
// 4. YOUTUBE DOMAIN COMPONENTS (DARK MODE LOCKED)
// ==========================================

const ThumbnailImage = ({
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30 },
  },
};

// 4.1. Desktop Grid Item
const YouTubeGridItem = forwardRef<
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
        <div className={`w-9 h-9 rounded-full flex-shrink-0 bg-[#272727]`} />
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

// 4.2. Search Result List Item (Large Horizontal)
const YouTubeListItem = forwardRef<
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
        className={`w-[360px] aspect-video relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${item.isPreview ? "ring-2 ring-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : isHighlight ? "ring-2 ring-amber-400" : ""}`}
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

// 4.3. Suggested Video Sidebar Item (Compact Horizontal)
const YouTubeCompactListItem = forwardRef<
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
        className={`w-[168px] aspect-video relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${item.isPreview ? "ring-2 ring-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.2)]" : isHighlight ? "ring-2 ring-amber-400" : ""}`}
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

// --- Size Breakdown Views ---
const SizeCardContainer = ({
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

const SizeViewRenderer = ({ activeThumbnail }: { activeThumbnail: any }) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="flex flex-col gap-12 pb-20 max-w-5xl"
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
};

// ==========================================
// 5. MAIN DASHBOARD COMPONENT
// ==========================================

export default function PreviewDashboard() {
  const [isLanding, setIsLanding] = useState(true);
  const [platformView, setPlatformView] = useState("youtube");
  const [device, setDevice] = useState("desktop");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showOutliers, setShowOutliers] = useState(false);

  // States for Data manipulation
  const [competitorVideos, setCompetitorVideos] = useState(YOUTUBE_DATA);
  const [activeTitle, setActiveTitle] = useState(DEFAULT_USER_THUMBNAIL.title);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [toast, setToast] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiTitle, setAiTitle] = useState("AI Insights");
  const [aiContent, setAiContent] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper Functions
  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setActiveImage(reader.result as string);
        showToastMsg("Design uploaded successfully");
        if (isLanding) setIsLanding(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...competitorVideos].sort(() => Math.random() - 0.5);
    setCompetitorVideos(shuffled);
    setActiveIndex(Math.floor(Math.random() * (shuffled.length + 1)));
    showToastMsg("Feed randomized");
  };

  const handleReset = () => {
    setSearch("");
    setActiveCategory("All");
    setCompetitorVideos(YOUTUBE_DATA);
    setActiveIndex(0);
    setDevice("desktop");
    setPlatformView("youtube");
    setShowOutliers(false);
    setActiveTitle(DEFAULT_USER_THUMBNAIL.title);
    setActiveImage(null);
    showToastMsg("Workspace reset to defaults");
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setSearch(cat === "All" ? "" : cat);
  };

  const handleAITitleOptimize = async () => {
    setAiTitle("Title Optimizer");
    setAiContent("");
    setAiModalOpen(true);
    setAiLoading(true);
 
  };


  // Memos
  const activeThumbnail = useMemo(
    () => ({
      ...DEFAULT_USER_THUMBNAIL,
      title: activeTitle,
      image: activeImage,
    }),
    [activeTitle, activeImage],
  );

  const combinedFeedData = useMemo(() => {
    const filtered = competitorVideos.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase()),
    );
    const combined = [...filtered];
    const activeMatchesSearch =
      activeThumbnail.title.toLowerCase().includes(search.toLowerCase()) ||
      activeThumbnail.author.toLowerCase().includes(search.toLowerCase());
    if (activeMatchesSearch) {
      combined.splice(
        Math.min(activeIndex, combined.length),
        0,
        activeThumbnail,
      );
    }
    return combined;
  }, [search, competitorVideos, activeThumbnail, activeIndex]);

  // --- RENDER: LANDING SCREEN ---
  if (isLanding) {
    return (
      <div
        className={`min-h-screen bg-white text-[#0f0f0f] flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden`}
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onFileChange}
          accept="image/*"
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl w-full z-10"
        >
          <div className="flex items-center justify-center gap-2 mb-8 opacity-80">
            <div
              className={`w-8 h-[22px] rounded-md flex items-center justify-center bg-[#FF0000]`}
            >
              <div
                className={`w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-b-[4px] border-b-transparent ml-0.5 border-l-white`}
              />
            </div>
            <span className="font-semibold tracking-tight text-lg text-black">
              TubePreviewer
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-5 tracking-tight leading-tight text-balance text-[#0f0f0f]">
            Visualize your thumbnails <br className="hidden md:block" /> before
            you publish.
          </h1>
          <p
            className={`text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed text-[#606060]`}
          >
            A clean, minimalist environment to test your video thumbnail designs
            exactly as they will appear on YouTube.
          </p>

          <div
            className={`border rounded-[2rem] p-10 md:p-14 flex flex-col items-center gap-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md bg-[#f8f8f8]/80 border-[#e5e5e5] hover:border-[#cccccc] backdrop-blur-xl`}
            onClick={triggerUpload}
          >
            <div className="relative group">
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 bg-white border border-[#e5e5e5]`}
              >
                <ImageIcon
                  size={32}
                  strokeWidth={1.5}
                  className="text-[#606060]"
                />
              </div>
              <div
                className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border-[3px] transition-transform duration-300 group-hover:rotate-90 bg-[#a855f7] text-white border-white`}
              >
                <Plus size={14} strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <h3
                className={`font-semibold text-lg tracking-tight text-[#0f0f0f]`}
              >
                Upload a design
              </h3>
              <p className={`text-sm font-medium text-[#606060]`}>
                Drag and drop, or click to browse
              </p>
            </div>
            <div
              className="flex flex-col sm:flex-row gap-3 w-full max-w-xs mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <MainButton
                variant="secondary"
                onClick={() => setIsLanding(false)}
                className="py-3"
              >
                Try Sample Workspace
              </MainButton>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- RENDER: MAIN DASHBOARD ---
  return (
    <>
      <div
        className={`flex h-screen bg-[#ffffff] text-zinc-900 font-sans overflow-hidden`}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onFileChange}
          accept="image/*"
        />

        {/* --- LEFT SIDEBAR (LIGHT UI) --- */}
        <aside
          className={`w-[280px] shrink-0 bg-[#f8f8f8] border-[#e5e5e5] border-r flex flex-col z-20 relative`}
        >
          {/* Sidebar Header */}
          <div
            className={`h-16 flex items-center px-5 border-b shrink-0 border-[#e5e5e5]`}
          >
            <div className="flex items-center gap-2.5 w-full">
              <div
                className={`w-8 h-[22px] rounded flex items-center justify-center bg-[#FF0000]`}
              >
                <div
                  className={`w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-b-[4px] border-b-transparent ml-0.5 border-l-white`}
                />
              </div>
              <span
                className={`font-semibold text-[15px] tracking-tight flex-1 text-black`}
              >
                Previewer
              </span>
              <button
                onClick={() => setIsLanding(true)}
                className={`p-1.5 rounded-lg transition-colors text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200`}
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar flex flex-col gap-8">
            {/* View Toggle */}
            <div className="flex flex-col gap-2.5">
              <span className={`text-xs font-semibold text-[#606060]`}>
                Layout Context
              </span>
              <div
                className={`p-1 rounded-xl flex relative bg-[#f2f2f2] border border-[#e5e5e5]`}
              >
                <button
                  onClick={() => {
                    setPlatformView("youtube");
                    showToastMsg("Feed View enabled");
                  }}
                  className={`flex-1 py-1.5 text-xs font-medium transition-all relative z-10 ${platformView === "youtube" ? "text-zinc-900" : "text-[#606060] hover:text-[#0f0f0f]"}`}
                >
                  Feed
                </button>
                <button
                  onClick={() => {
                    setPlatformView("size");
                    showToastMsg("Size Breakdown enabled");
                  }}
                  className={`flex-1 py-1.5 text-xs font-medium transition-all relative z-10 ${platformView === "size" ? "text-zinc-900" : "text-[#606060] hover:text-[#0f0f0f]"}`}
                >
                  Sizes
                </button>
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg shadow-sm transition-all duration-300 ease-out bg-white`}
                  style={{
                    left: platformView === "youtube" ? "4px" : "calc(50%)",
                  }}
                />
              </div>
            </div>

            {/* Device Icons Row */}
            <div
              className={`flex flex-col gap-2.5 transition-opacity duration-300 ${platformView === "size" ? "opacity-40 pointer-events-none" : "opacity-100"}`}
            >
              <span className={`text-xs font-semibold text-[#606060]`}>
                Device Simulation
              </span>
              <div
                className={`p-1 rounded-xl flex justify-between bg-[#f2f2f2] border border-[#e5e5e5]`}
              >
                <IconButton
                  icon={Monitor}
                  isActive={device === "desktop"}
                  onClick={() => {
                    setDevice("desktop");
                    showToastMsg("Desktop Layout");
                  }}
                />
                <IconButton
                  icon={Search}
                  isActive={device === "search"}
                  onClick={() => {
                    setDevice("search");
                    showToastMsg("Search Layout");
                  }}
                />
                <IconButton
                  icon={ListIcon}
                  isActive={device === "list"}
                  onClick={() => {
                    setDevice("list");
                    showToastMsg("List Layout");
                  }}
                />
                <IconButton
                  icon={Smartphone}
                  isActive={device === "mobile"}
                  onClick={() => {
                    setDevice("mobile");
                    showToastMsg("Mobile Simulator");
                  }}
                />
              </div>
            </div>

            {/* Active Thumbnail Section */}
            <div className="flex flex-col gap-3">
              <span className={`text-xs font-semibold text-[#606060]`}>
                Active Design
              </span>
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-2 px-2">
                <button
                  onClick={triggerUpload}
                  className={`w-[88px] h-14 rounded-xl border border-dashed flex items-center justify-center flex-shrink-0 transition-all bg-white border-[#cccccc] text-[#606060] hover:bg-[#f2f2f2] hover:text-[#0f0f0f]`}
                >
                  <Plus size={20} />
                </button>
                <div
                  className={`relative w-24 h-14 rounded-xl flex-shrink-0 border overflow-hidden group transition-all cursor-pointer bg-[#e5e5e5] border-[#cccccc] hover:border-[#a855f7] shadow-sm`}
                >
                  <ThumbnailImage
                    item={activeThumbnail}
                    isMockup={!activeThumbnail.image}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 backdrop-blur-sm transition-opacity">
                    <span className="text-[10px] font-medium px-2 py-1 bg-white/20 text-white rounded backdrop-blur-md">
                      Change
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-1">
                <CustomInput
                  label="Video Title"
                  value={activeTitle}
                  onChange={(e) => setActiveTitle(e.target.value)}
                  placeholder="Enter your video title"
                />
              </div>
            </div>

            {/* AI Tools Section */}
            <div
              className={`p-4 rounded-xl border transition-colors bg-white border-[#e5e5e5] flex flex-col gap-2.5`}
            >
              <span
                className={`text-xs font-semibold flex items-center gap-1.5 text-[#9333ea]`}
              >
                <Sparkles size={14} /> AI Workspace
              </span>
              <MainButton
                variant="secondary"
                className="py-2 text-[13px] font-medium"
                onClick={handleAITitleOptimize}
              >
                <Lightbulb size={14} className="text-zinc-500" /> Optimize Title
              </MainButton>
              <MainButton
                variant="secondary"
                className="py-2 text-[13px] font-medium"
                onClick={handleAIAnalyzeThumbnail}
              >
                <Wand2 size={14} className="text-zinc-500" /> Analyze Visuals
              </MainButton>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-2 mt-auto pt-4">
              <div className={`h-px w-full bg-[#e5e5e5] mb-2`} />

              <button
                onClick={() => {
                  setShowOutliers(!showOutliers);
                  showToastMsg(
                    showOutliers
                      ? "Highlights hidden"
                      : "Showing high performers",
                  );
                }}
                className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors hover:bg-[#f2f2f2]`}
              >
                <span className={`text-sm font-medium text-[#0f0f0f]`}>
                  Show Highlights
                </span>
                <div
                  className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${showOutliers ? "bg-[#a855f7]" : "bg-[#cccccc]"}`}
                >
                  <motion.div
                    layout
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm`}
                    animate={{ left: showOutliers ? "18px" : "2px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </button>

              <button
                onClick={handleShuffle}
                className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-sm font-medium text-[#0f0f0f] hover:bg-[#f2f2f2]`}
              >
                <Shuffle size={16} className="text-[#606060]" /> Randomize Feed
              </button>

              <button
                onClick={handleReset}
                className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-sm font-medium text-red-500 hover:bg-red-50`}
              >
                <RotateCcw size={16} className="text-red-400" /> Reset Workspace
              </button>
            </div>
          </div>
        </aside>

        {/* --- RIGHT MAIN AREA: YOUTUBE SIMULATION (DARK UI) --- */}
        <main
          className={`flex-1 flex flex-col overflow-hidden relative bg-[#0f0f0f]`}
        >
          {/* YouTube Top Nav */}
          {device !== "mobile" && (
            <div
              className={`h-[56px] flex items-center px-4 justify-between shrink-0 bg-[#0f0f0f]`}
            >
              <div className="flex items-center gap-4">
                <button
                  className={`p-2 rounded-full transition-colors text-[#f1f1f1] hover:bg-[#272727]`}
                  onClick={() => showToastMsg("Menu toggle")}
                >
                  <Menu size={24} strokeWidth={1.5} />
                </button>
                <div className="flex items-center gap-1 cursor-pointer">
                  <div
                    className={`w-[30px] h-[20px] rounded-[5px] flex items-center justify-center bg-[#FF0000]`}
                  >
                    <div
                      className={`w-0 h-0 border-t-[3.5px] border-t-transparent border-l-[6px] border-b-[3.5px] border-b-transparent ml-0.5 border-l-white`}
                    />
                  </div>
                  <span
                    className={`font-semibold tracking-tighter text-[20px] text-[#f1f1f1] ml-0.5`}
                  >
                    YouTube
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-1 max-w-[700px] px-8 ml-8">
                <div className={`flex w-full group relative`}>
                  <div
                    className={`flex items-center flex-1 h-[40px] rounded-l-full px-4 border transition-all bg-[#121212] border-[#303030] focus-within:border-[#1c62b9] focus-within:ml-0 ml-8`}
                  >
                    <Search
                      size={18}
                      className={`mr-2.5 hidden group-focus-within:block text-[#f1f1f1]`}
                    />
                    <input
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setActiveCategory("All");
                      }}
                      className={`bg-transparent border-none outline-none w-full text-[16px] font-normal text-[#f1f1f1] placeholder-[#aaaaaa]`}
                    />
                  </div>
                  <button
                    className={`h-[40px] w-[64px] rounded-r-full border-y border-r transition-colors flex items-center justify-center shrink-0 bg-[#222222] border-[#303030] hover:bg-[#303030]`}
                    onClick={() => showToastMsg("Searching")}
                  >
                    <Search
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#f1f1f1]"
                    />
                  </button>
                </div>
                <button
                  className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-colors shrink-0 bg-[#181818] hover:bg-[#303030] text-[#f1f1f1]`}
                  onClick={() => showToastMsg("Voice search activated")}
                >
                  <Mic size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex items-center gap-2 pr-2">
                <button
                  className={`p-2 rounded-full transition-colors text-[#f1f1f1] hover:bg-[#272727]`}
                  onClick={() => showToastMsg("Create video")}
                >
                  <Video size={24} strokeWidth={1.5} />
                </button>
                <button
                  className={`p-2 rounded-full transition-colors text-[#f1f1f1] hover:bg-[#272727]`}
                  onClick={() => showToastMsg("Notifications")}
                >
                  <Bell size={24} strokeWidth={1.5} />
                </button>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ml-2 cursor-pointer bg-indigo-600 text-white`}
                  onClick={() => showToastMsg("Profile settings")}
                >
                  U
                </div>
              </div>
            </div>
          )}

          {/* YouTube Tag Filters */}
          {platformView === "youtube" && device !== "mobile" && (
            <div className={`flex gap-3 px-6 py-3 shrink-0 bg-[#0f0f0f]`}>
              {CATEGORIES.map((tag, i) => (
                <div
                  key={i}
                  onClick={() => handleCategoryClick(tag)}
                  className={`px-3 py-1.5 rounded-lg text-[14px] font-medium cursor-pointer transition-all whitespace-nowrap ${
                    activeCategory === tag
                      ? "bg-[#f1f1f1] text-[#0f0f0f]"
                      : "bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f]"
                  }`}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}

          {/* YouTube Feed Content */}
          <div
            className={`flex-1 overflow-y-auto p-6 lg:px-8 lg:py-6 custom-scrollbar relative ${device === "mobile" ? "flex justify-center items-start" : ""}`}
          >
            {combinedFeedData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className={`p-10 rounded-2xl max-w-md w-full`}>
                  <Search
                    size={48}
                    strokeWidth={1.5}
                    className={`mb-4 mx-auto text-[#aaaaaa]`}
                  />
                  <h3 className={`text-xl font-semibold mb-2 text-[#f1f1f1]`}>
                    No results found
                  </h3>
                  <p className={`text-[15px] mb-8 text-[#aaaaaa]`}>
                    Try different keywords or remove search filters.
                  </p>
                </div>
              </div>
            ) : platformView === "size" ? (
              <SizeViewRenderer activeThumbnail={activeThumbnail} />
            ) : device === "mobile" ? (
              /* Mobile Simulator Container */
              <div
                className={`w-[390px] h-[844px] rounded-[3rem] border-[12px] overflow-hidden relative flex flex-col shadow-2xl my-4 shrink-0 border-zinc-800 bg-[#0f0f0f]`}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>
                <div
                  className={`flex justify-between items-center px-4 pt-10 pb-3 z-30 bg-[#0f0f0f]`}
                >
                  <div className="flex items-center gap-1 cursor-pointer ml-1">
                    <div
                      className={`w-7 h-[18px] rounded-[4px] flex items-center justify-center bg-[#FF0000]`}
                    >
                      <div
                        className={`w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-b-[3px] border-b-transparent ml-0.5 border-l-white`}
                      />
                    </div>
                    <span
                      className={`font-semibold tracking-tighter text-[18px] text-[#f1f1f1] ml-0.5`}
                    >
                      YouTube
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Search
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#f1f1f1]"
                    />
                    <MoreVertical
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#f1f1f1]"
                    />
                  </div>
                </div>
                <div
                  className={`flex-1 overflow-y-auto p-4 custom-scrollbar z-30 bg-[#0f0f0f]`}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={containerVariants}
                      className="flex flex-col gap-6"
                    >
                      {combinedFeedData.map((item) => (
                        <YouTubeGridItem
                          key={item.id}
                          item={item}
                          showOutliers={showOutliers}
                        />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* Desktop Grid / List Feed / Search Feed */
              <AnimatePresence mode="popLayout">
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={containerVariants}
                  className={
                    device === "desktop"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-10 w-full"
                      : device === "search"
                        ? "flex flex-col gap-4 items-center max-w-[1096px] mx-auto w-full"
                        : "flex flex-col gap-3 max-w-[400px] w-full" // 'list' layout
                  }
                >
                  {combinedFeedData.map((item) => {
                    if (device === "desktop")
                      return (
                        <YouTubeGridItem
                          key={item.id}
                          item={item}
                          showOutliers={showOutliers}
                        />
                      );
                    if (device === "search")
                      return (
                        <YouTubeListItem
                          key={item.id}
                          item={item}
                          showOutliers={showOutliers}
                        />
                      );
                    return (
                      <YouTubeCompactListItem
                        key={item.id}
                        item={item}
                        showOutliers={showOutliers}
                      />
                    ); // device === 'list'
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </main>
      </div>

      {/* --- MODALS & TOASTS --- */}
      <AnimatePresence>
        {aiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[85vh] bg-white border border-zinc-200`}
            >
              <div
                className={`px-6 py-4 flex items-center justify-between border-b border-zinc-100 bg-zinc-50`}
              >
                <h3
                  className={`font-semibold text-base flex items-center gap-2 tracking-tight text-zinc-900`}
                >
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Sparkles size={14} />
                  </div>
                  {aiTitle}
                </h3>
                <button
                  onClick={() => setAiModalOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors hover:bg-zinc-200 text-zinc-500`}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
                {aiLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4">
                    <Loader2
                      size={32}
                      strokeWidth={2}
                      className="animate-spin text-purple-500"
                    />
                    <p className={`text-sm font-medium text-zinc-500`}>
                      Gemini is analyzing...
                    </p>
                  </div>
                ) : (
                  <div
                    className={`prose prose-sm max-w-none font-normal leading-relaxed prose-p:text-zinc-600 prose-li:text-zinc-600 prose-strong:text-black`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: aiContent
                          .replace(/\n/g, "<br />")
                          .replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="font-semibold">$1</strong>',
                          ),
                      }}
                    />
                  </div>
                )}
              </div>
              <div
                className={`px-6 py-4 border-t flex justify-end border-zinc-100 bg-zinc-50`}
              >
                <MainButton
                  variant="secondary"
                  className="w-auto px-6 py-2 text-xs"
                  onClick={() => setAiModalOpen(false)}
                >
                  Close
                </MainButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full font-medium text-sm shadow-md z-50 flex items-center gap-2 border backdrop-blur-md bg-white/90 border-zinc-200 text-zinc-900`}
          >
            <CheckCircle2 size={16} className="text-green-500" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #88888888; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #55555588; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
