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
  Eye,
  EyeClosed,
  Type,
  Home,
  Flame,
  Tv,
  Folder,
  History,
  Clock,
  SlidersHorizontal,
} from "lucide-react";
import {
  CATEGORIES,
  DEFAULT_USER_THUMBNAIL,
  YOUTUBE_DATA,
} from "@/src/static data/previewData";
import { MainButton } from "./Buttons";
import { PreviewerSideBar, YouTubeMiniSidebar } from "./PreviewerSideBar";
import {
  containerVariants,
  SizeViewRenderer,
  YouTubeCategories,
  YouTubeCompactListItem,
  YouTubeGridItem,
  YouTubeListItem,
} from "./PreviewerComponents";
import { useAuthContext } from "@/src/context/AuthContext";

// ==========================================
// 5. BIG COMPONENT: SIDEBAR
// ==========================================

// ==========================================
// 6. MAIN DASHBOARD APPLICATION
// ==========================================

export default function PreviewDashboard() {
  const { user } = useAuthContext();

  const [isLanding, setIsLanding] = useState(true);
  const [platformView, setPlatformView] = useState("youtube");
  const [device, setDevice] = useState("desktop");
  const [showOutliers, setShowOutliers] = useState(false);

  // States for Data manipulation
  const [competitorVideos, setCompetitorVideos] = useState(YOUTUBE_DATA);
  const [activeTitle, setActiveTitle] = useState(DEFAULT_USER_THUMBNAIL.title);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerUpload = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setActiveImage(reader.result as string);
        if (isLanding) setIsLanding(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...competitorVideos].sort(() => Math.random() - 0.5);
    setCompetitorVideos(shuffled);
  };

  const handleReset = () => {
    setCompetitorVideos(YOUTUBE_DATA);
    setDevice("desktop");
    setPlatformView("youtube");
    setShowOutliers(false);
    setActiveTitle(DEFAULT_USER_THUMBNAIL.title);
    setActiveImage(null);
  };

  // --- Memos ---
  const activeThumbnail = useMemo(
    () => ({
      ...DEFAULT_USER_THUMBNAIL,
      title: activeTitle,
      image: activeImage,
    }),
    [activeTitle, activeImage],
  );

  const combinedFeedData = useMemo(() => {
    const combined = [...competitorVideos];
    // Always insert the active thumbnail at the active index
    combined.splice(Math.min(activeIndex, combined.length), 0);
    return combined;
  }, [competitorVideos, activeThumbnail, activeIndex]);
  // ==========================================
  // RENDER: LANDING SCREEN
  // ==========================================
  if (isLanding) {
    return (
      <div className="min-h-fit bg-white text-[#0f0f0f] flex flex-col items-center justify-center pb-6 text-center font-sans relative overflow-hidden">
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
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-5xl font-black uppercase tracking-tighter  text-black mb-6"
          >
            <span className="pr-20  "> FREE AI </span>
            <br />
            <span className="bg-[#F4E041] px-4 border-4 border-black inline-block transform -rotate-2">
              THUMBNAIL
            </span>
            <br /> <span className="pl-20  ">Visualizer</span>
          </motion.h1>
          <p className="text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed text-[#606060] font-semibold">
            A clean, minimalist environment to test your video thumbnail designs
            exactly as they will appear on YouTube.
          </p>

          <div
            className="border-2 rounded-4xl p-10 md:p-14 flex flex-col items-center gap-6 transition-all duration-300 cursor-pointer  hover:border-[#cccccc] backdrop-blur-xl bg-white text-black border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] border-dashed"
            onClick={triggerUpload}
          >
            <div className="relative group">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 bg-white border border-[#e5e5e5]">
                <ImageIcon
                  size={32}
                  strokeWidth={1.5}
                  className="text-[#606060]"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border-[3px] transition-transform duration-300 group-hover:rotate-90 bg-[#a855f7] text-white border-white">
                <Plus size={14} strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <h3 className="font-semibold text-lg tracking-tight text-[#0f0f0f]">
                Upload a design
              </h3>
              <p className="text-sm font-medium text-[#606060]">
                Drag and drop, or click to browse
              </p>
            </div>
            <div
              className="flex flex-col sm:flex-row gap-3 w-full max-w-xs mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <MainButton
                variant="white"
                onClick={() => setIsLanding(false)}
                className="py-3 cursor-pointer"
              >
                Try Sample Workspace
              </MainButton>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // RENDER: MAIN DASHBOARD
  // ==========================================
  return (
    <>
      <div className="flex h-full w-full bg-[#ffffff] text-zinc-900 font-sans overflow-hidden">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onFileChange}
          accept="image/*"
        />

        {/* --- LEFT SIDEBAR: CONTROL PANEL --- */}
        <PreviewerSideBar
          setIsLanding={setIsLanding}
          platformView={platformView}
          setPlatformView={setPlatformView}
          device={device}
          setDevice={setDevice}
          activeThumbnail={activeThumbnail}
          triggerUpload={triggerUpload}
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
          showOutliers={showOutliers}
          setShowOutliers={setShowOutliers}
          handleShuffle={handleShuffle}
          handleReset={handleReset}
        />

        {/* --- RIGHT MAIN AREA: PREVIEW SIMULATION (DARK UI) --- */}
        <main className="flex-1 min-h-fit flex flex-col relative bg-[#0f0f0f] overflow-hidden!">
          {/* STATIC YOUTUBE TOP NAV (NO FUNCTIONALITY) */}
          {device !== "mobile" && (
            <div className="h-14 flex items-center px-4 justify-between shrink-0 bg-[#0f0f0f]">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full text-[#f1f1f1] opacity-80 cursor-default">
                  <Menu size={24} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1 opacity-90 cursor-default">
                  <div className="w-7 h-4.5 rounded-[5px] flex items-center justify-center bg-[#FF0000]">
                    <div className="w-0 h-0 border-t-[3.5px] border-t-transparent border-l-[6px] border-b-[3.5px] border-b-transparent ml-0.5 border-l-white" />
                  </div>
                  <span className="font-semibold tracking-tighter text-[20px] text-[#f1f1f1] ml-0.5">
                    YouTube
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-1 max-w-175 px-8 ml-8">
                <div className="flex w-full group relative">
                  <div className="flex items-center flex-1 h-10 rounded-l-full px-4 border bg-[#121212] border-[#303030] ml-8 cursor-text">
                    <Search
                      size={18}
                      className="mr-2.5 hidden text-[#f1f1f1]"
                    />
                    <input
                      type="text"
                      placeholder="Search"
                      defaultValue=""
                      readOnly
                      className="bg-transparent border-none outline-none w-full text-[16px] font-normal text-[#f1f1f1] placeholder-[#aaaaaa] cursor-default"
                    />
                  </div>
                  <div className="h-10 w-16 rounded-r-full border-y border-r flex items-center justify-center shrink-0 bg-[#222222] border-[#303030] cursor-default">
                    <Search
                      size={20}
                      strokeWidth={1.5}
                      className="text-[#f1f1f1] opacity-80"
                    />
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#181818] text-[#f1f1f1] opacity-80 cursor-default">
                  <Mic size={20} strokeWidth={1.5} />
                </div>
              </div>

              <div className="flex items-center gap-2 pr-2">
                <div className="p-2 rounded-full text-[#f1f1f1] opacity-80 cursor-default">
                  <Video size={24} strokeWidth={1.5} />
                </div>
                <div className="p-2 rounded-full text-[#f1f1f1] opacity-80 cursor-default">
                  <Bell size={24} strokeWidth={1.5} />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ml-2 bg-indigo-600 text-white cursor-default">
                  U
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex overflow-hidden">
            {/* STATIC YOUTUBE MINI SIDEBAR */}
            {device !== "mobile" &&
              device !== "list" &&
              platformView === "youtube" && <YouTubeMiniSidebar />}

            <div className="flex-1 flex flex-col overflow-hidden">
              {/* STATIC YOUTUBE CATEGORIES */}
              {platformView === "youtube" && device !== "mobile" && (
                <YouTubeCategories />
              )}

              {/* Feed Content Scroll Area */}
              <div
                className={`flex-1  p-6 lg:px-8 lg:py-6 custom-scrollbar bg relative ${device === "mobile" ? "flex justify-center items-start" : ""}`}
              >
                {platformView === "size" ? (
                  <SizeViewRenderer activeThumbnail={activeThumbnail} />
                ) : device === "mobile" ? (
                  /* Mobile Simulator Container */
                  <div className="w-97.5 h-211 rounded-[3rem] border-12  relative flex flex-col shadow-2xl my-4 shrink-0 border-zinc-800 bg-[#0f0f0f]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>

                    {/* MOBILE TOP NAV (STATIC) */}
                    <div className="flex justify-between items-center px-4 pt-10 pb-3 z-30 bg-[#0f0f0f] border-b border-[#272727]/50">
                      <div className="flex items-center gap-1 ml-1 opacity-90">
                        <div className="w-7 h-4.5 rounded-sm flex items-center justify-center bg-[#FF0000]">
                          <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-b-[3px] border-b-transparent ml-0.5 border-l-white" />
                        </div>
                        <span className="font-semibold tracking-tighter text-[18px] text-[#f1f1f1] ml-0.5">
                          YouTube
                        </span>
                      </div>
                      <div className="flex gap-4 opacity-80">
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

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar z-30 bg-[#0f0f0f]">
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
                          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 w-full"
                          : device === "search"
                            ? "flex flex-col gap-4 items-center max-w-274 mx-auto w-full"
                            : "flex flex-col gap-3 max-w-100 w-full" // 'list' layout
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
            </div>
          </div>
        </main>
      </div>

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
