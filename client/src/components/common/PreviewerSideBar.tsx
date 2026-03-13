import {
  ChevronLeft,
  Flame,
  Folder,
  Home,
  LayoutGrid,
  Lightbulb,
  ListIcon,
  Menu,
  Monitor,
  PanelLeftOpen,
  Plus,
  RotateCcw,
  Search,
  Shuffle,
  Smartphone,
  Sparkles,
  TrendingUp,
  Tv,
  Type,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { MainButton, PreviewerIconButton } from "./Buttons";
import { ThumbnailImage } from "./PreviewerComponents";
import { CustomInput } from "./Inputs";
import React, { useState } from "react";

interface PreviewerSideBarProps {
  setIsLanding: (val: boolean) => void;
  platformView: string;
  setPlatformView: (val: string) => void;
  device: string;
  setDevice: (val: string) => void;
  activeThumbnail: any;
  triggerUpload: () => void;
  activeTitle: string;
  setActiveTitle: (val: string) => void;
  showOutliers: boolean;
  setShowOutliers: (val: boolean) => void;
  handleShuffle: () => void;
  handleReset: () => void;
}

export const PreviewerSideBar = ({
  setIsLanding,
  platformView,
  setPlatformView,
  device,
  setDevice,
  activeThumbnail,
  triggerUpload,
  activeTitle,
  setActiveTitle,
  showOutliers,
  setShowOutliers,
  handleShuffle,
  handleReset,
}: PreviewerSideBarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false); // Collapsed on mobile by default
      } else {
        setIsExpanded(true); // Expanded on desktop by default
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Overlay Backdrop (Only when expanded) */}
      <AnimatePresence>
        {isExpanded && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Pro UX Trick: Invisible spacer for mobile 
        This keeps the 80px space reserved when the main sidebar becomes `fixed` 
        and expands, preventing the main content layout from violently jumping left.
      */}
      {isExpanded && isMobile && (
        <div className="w-20 shrink-0 h-100dvh md:hidden bg-[#f8f8f8] border-r border-[#e5e5e5]" />
      )}

      <aside
        className={`
        ${isExpanded && isMobile ? "fixed shadow-2xl" : "relative"} 
        ${isExpanded ? "w-70 md:shadow-none" : "w-20"}
        inset-y-0 left-0 shrink-0 bg-[#f8f8f8] border-[#e5e5e5] border-r flex flex-col z-50 transition-all duration-300 ease-in-out h-fit overflow-hidden
      `}
      >
        {/* Sidebar Header */}
        <div
          className={`h-14 flex items-center border-b shrink-0 border-[#e5e5e5] ${isExpanded ? "px-4" : "px-0 justify-center md:px-0 md:justify-center"}`}
        >
          <div
            className={`flex items-center w-full  ${isExpanded ? "gap-2 justify-between" : "justify-center"}`}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg transition-colors text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 shrink-0 cursor-pointer"
            >
              {isExpanded && isMobile ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isExpanded && (
              <button
                onClick={() => setIsLanding(true)}
                className="p-1.5 rounded-lg transition-colors text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 shrink-0 cursor-pointer"
                title="Go back"
              >
                <PanelLeftOpen size={18} />
              </button>
            )}
          </div>
        </div>

        <div
          className={`flex-1 overflow-y-auto custom-scrollbar flex flex-col ${isExpanded ? "p-5 gap-8" : "p-3 gap-6 items-center"}`}
        >
          {/* View Toggle */}
          {isExpanded ? (
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-semibold text-[#606060]">
                Layout Context
              </span>
              <div className="p-1 rounded-xl flex relative bg-[#f2f2f2] border border-[#e5e5e5]">
                <button
                  onClick={() => {
                    setPlatformView("youtube");
                  }}
                  className={`flex-1 py-1.5 text-xs font-medium transition-all relative z-10 ${platformView === "youtube" ? "text-zinc-900" : "text-[#606060] hover:text-[#0f0f0f]"}`}
                >
                  Feed
                </button>
                <button
                  onClick={() => {
                    setPlatformView("size");
                  }}
                  className={`flex-1 py-1.5 text-xs font-medium transition-all relative z-10 ${platformView === "size" ? "text-zinc-900" : "text-[#606060] hover:text-[#0f0f0f]"}`}
                >
                  Sizes
                </button>
                <div
                  className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg shadow-sm transition-all duration-300 ease-out bg-white"
                  style={{
                    left: platformView === "youtube" ? "4px" : "calc(50%)",
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full border-b border-[#e5e5e5] pb-4">
              <PreviewerIconButton
                icon={LayoutGrid}
                isActive={platformView === "youtube"}
                onClick={() => {
                  setPlatformView("youtube");
                }}
                title="Feed View"
              />
              <PreviewerIconButton
                icon={Monitor}
                isActive={platformView === "size"}
                onClick={() => {
                  setPlatformView("size");
                }}
                title="Size Breakdown"
              />
            </div>
          )}

          {/* Device Icons Row */}
          <div
            className={`flex flex-col gap-2.5 transition-opacity duration-300 ${platformView === "size" ? "opacity-40 pointer-events-none" : "opacity-100"} ${isExpanded ? "" : "w-full border-b border-[#e5e5e5] pb-4"}`}
          >
            {isExpanded && (
              <span className="text-xs font-semibold text-[#606060]">
                Device Simulation
              </span>
            )}
            <div
              className={`${isExpanded ? "p-1 rounded-xl flex justify-between bg-[#f2f2f2] border border-[#e5e5e5]" : "flex flex-col gap-2"}`}
            >
              <PreviewerIconButton
                icon={Monitor}
                isActive={device === "desktop"}
                onClick={() => {
                  setDevice("desktop");
                }}
                title="Desktop Simulator"
              />
              <PreviewerIconButton
                icon={Search}
                isActive={device === "search"}
                onClick={() => {
                  setDevice("search");
                }}
                title="Search Result Simulator"
              />
              <PreviewerIconButton
                icon={ListIcon}
                isActive={device === "list"}
                onClick={() => {
                  setDevice("list");
                }}
                title="Sidebar List Simulator"
              />
              <PreviewerIconButton
                icon={Smartphone}
                isActive={device === "mobile"}
                onClick={() => {
                  setDevice("mobile");
                }}
                title="Mobile Simulator"
              />
            </div>
          </div>

          {/* Active Thumbnail Section */}
          <div
            className={`flex flex-col gap-3 ${isExpanded ? "" : "w-full border-b border-[#e5e5e5] pb-4 items-center"}`}
          >
            {isExpanded && (
              <span className="text-xs font-semibold text-[#606060]">
                Active Design
              </span>
            )}
            <div
              className={`flex gap-3 overflow-x-auto pb-1 scrollbar-hide ${isExpanded ? "-mx-2 px-2" : "flex-col items-center"}`}
            >
              <button
                onClick={triggerUpload}
                className={`${isExpanded ? "w-22 h-14" : "w-12 h-12"} rounded-xl border border-dashed flex items-center justify-center shrink-0 transition-all bg-white border-[#cccccc] text-[#606060] hover:bg-[#f2f2f2] hover:text-[#0f0f0f]`}
                title="Upload Thumbnail"
              >
                <Plus size={20} />
              </button>
              <div
                className={`relative ${isExpanded ? "w-24 h-14" : "w-12 h-8"} rounded-lg shrink-0 border overflow-hidden group transition-all cursor-pointer bg-[#e5e5e5] border-[#cccccc] hover:border-[#a855f7] shadow-sm`}
                title="Active Thumbnail"
              >
                <ThumbnailImage
                  item={activeThumbnail}
                  isMockup={!activeThumbnail.image}
                />
              </div>
            </div>
            {isExpanded && (
              <div className="mt-1">
                <CustomInput
                  label="Video Title"
                  value={activeTitle}
                  onChange={(e) => setActiveTitle(e.target.value)}
                  placeholder="Enter your video title"
                  icon={Type}
                  err=""
                />
              </div>
            )}
          </div>

          {/* Controls */}
          <div
            className={`flex flex-col gap-2 mt-auto pt-4 ${isExpanded ? "" : "w-full items-center"}`}
          >
            {isExpanded ? (
              <>
                <div className="h-px w-full bg-[#e5e5e5] mb-2" />
                <button
                  onClick={handleShuffle}
                  className="flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-sm font-medium text-[#0f0f0f] hover:bg-[#f2f2f2]"
                >
                  <Shuffle size={16} className="text-[#606060]" /> Randomize
                  Feed
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  <RotateCcw size={16} className="text-red-400" /> Reset
                  Workspace
                </button>
              </>
            ) : (
              <>
                <PreviewerIconButton
                  icon={Shuffle}
                  onClick={handleShuffle}
                  title="Randomize Feed"
                />
                <PreviewerIconButton
                  icon={RotateCcw}
                  onClick={handleReset}
                  title="Reset Workspace"
                />
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
export const YouTubeMiniSidebar = () => {
  const links = [
    { icon: Home, label: "Home", active: true },
    { icon: Flame, label: "Shorts" },
    { icon: Tv, label: "Subscriptions" },
    { icon: Folder, label: "Library" },
  ];

  return (
    <aside className="w-18 hidden md:flex flex-col shrink-0 bg-[#0f0f0f] pt-3 border-r border-[#272727]">
      <div className="flex flex-col px-1 gap-1">
        {links.map((link, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center py-4 px-1 gap-1.5 rounded-xl text-[#f1f1f1] cursor-default opacity-80"
          >
            <link.icon
              size={24}
              strokeWidth={link.active ? 2.5 : 1.5}
              className={link.active ? "text-white" : ""}
            />
            <span
              className={`text-[10px] truncate ${link.active ? "font-medium text-white" : "font-normal"}`}
            >
              {link.label}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};
