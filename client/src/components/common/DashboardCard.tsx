"use client";

import { GenrateFormType } from "@/src/types/dashboard.type";
import { DashboardDropdown } from "./DashboardDropdown";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  History,
  Monitor,
  RefreshCcw,
  Smartphone,
  Sparkles,
  Square,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "@/src/context/AuthContext";
import { PhotoUploader } from "./PhotoUploader";
import {
  Step1Setup,
  Step2Concept,
  Step3Psychology,
  Step4Subject,
  Step5Aesthetics,
  Step6Overlays,
} from "./dashboradSteps";
import { MainButton } from "./Buttons";
import { useEffect, useRef, useState } from "react";

const Dashboard_Card_STEPS = [
  { title: "Core Setup", component: Step1Setup },
  { title: "Video Concept", component: Step2Concept },
  { title: "Psychology", component: Step3Psychology },
  { title: "Subject Focus", component: Step4Subject },
  { title: "Aesthetics", component: Step5Aesthetics },
  { title: "Final Overlays", component: Step6Overlays },
];

export const DashboardCard = ({
  currentIndex,
  onIndexChange,
  completionPercentage,
  handleGenerate,
  isGeneratingImage,
}: any) => {
  const CurrentStepComponent = Dashboard_Card_STEPS[currentIndex].component;
  const { resetgenerateForm, user , generateForm , setGenerateForm } = useAuthContext();

  // History Popover State & Logic
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        historyRef.current &&
        !historyRef.current.contains(e.target as Node)
      ) {
        setIsHistoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const IsDisabled = completionPercentage < 50 || isGeneratingImage;

  const handelRestoreFromHistory = (item: any) => {
    const { generationConfig } = item;
    console.log(generationConfig);
    setGenerateForm(generationConfig);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col  ">
      {/* Top Floating Progress/Steps Tracker (Outside the main card) */}
      <div className="flex gap-1.5 mb-6 px-2 w-full max-w-[80%] mx-auto">
        {Dashboard_Card_STEPS.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-1.5 rounded-full bg-zinc-200 overflow-hidden shadow-inner"
          >
            <motion.div
              className={`h-full ${idx <= currentIndex ? "bg-black" : "bg-transparent"}`}
              initial={false}
              animate={{ width: idx <= currentIndex ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      <div className="bg-white border-4 border-black rounded-4xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col relative z-20">
        {/* HEADER: Title + Actions */}
        <div className="bg-zinc-50 border-b-4 border-black p-6 md:p-8 flex items-center justify-between rounded-t-[calc(2rem-4px)] relative z-60">
          <div className="flex md:items-center gap-4">
            <div className="w-12 h-12 bg-blue-400 text-white border-[3px] border-black rounded-xl flex items-center justify-center font-black text-lg shadow-[3px_3px_0px_0px_#000] shrink-0">
              {currentIndex + 1}
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-black uppercase tracking-widest leading-none">
                {Dashboard_Card_STEPS[currentIndex].title}
              </h2>
              <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1.5">
                Step {currentIndex + 1} of {Dashboard_Card_STEPS.length}
              </p>
            </div>
          </div>

          {/* In-Card Workspace Actions */}
          <div className="flex items-center gap-2">
            {/* RECENT ACTIVITY DROPDOWN */}
            <div className="relative" ref={historyRef}>
              <button
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className={`p-2 border-[3px] rounded-xl transition-all group relative cursor-pointer ${isHistoryOpen ? "bg-black text-[#F4E041] border-black shadow-none" : "border-transparent hover:border-black hover:bg-white text-zinc-400 hover:text-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"}`}
              >
                <History size={18} strokeWidth={2.5} />
                {!isHistoryOpen && (
                  <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-100">
                    History
                  </span>
                )}
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isHistoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-72 bg-white border-[3px] border-black rounded-2xl p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-100 origin-top-right overflow-hidden"
                  >
                    <div className="p-3 border-b-[3px] border-zinc-100 mb-2 flex justify-between items-center bg-white sticky top-0">
                      <h3 className="font-black text-[10px] uppercase tracking-widest text-zinc-400">
                        Recent Activity
                      </h3>
                      <span className="text-[9px] font-black text-white bg-black px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_#B197FC]">
                        {user?.galleryData?.length} Items
                      </span>
                    </div>

                    {user?.galleryData && user.galleryData.length > 0 ? (
                      <div className="flex flex-col gap-1.5 max-h-62.5 overflow-y-auto custom-scrollbar p-1">
                        {user.galleryData.map((item, i) => {
                          const { generationConfig, createdAt } = item;

                          return (
                            <button
                              key={i}
                              onClick={() => handelRestoreFromHistory(item)}
                              className="w-full p-3 border-[3px] border-transparent hover:border-black rounded-xl text-left transition-all group flex justify-between items-center bg-zinc-50 hover:bg-white cursor-pointer hover:shadow-[3px_3px_0px_0px_#000]"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="truncate">
                                  {/* TITLE */}
                                  <div className="text-[10px] font-black uppercase truncate text-zinc-800 group-hover:text-black">
                                    {generationConfig?.title}
                                  </div>

                                  {/* HOOK TYPE + TIME */}
                                  <div className="text-[8px] font-bold text-zinc-400 mt-0.5 uppercase tracking-wider">
                                    {generationConfig?.hookType} •{" "}
                                    {new Date(createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>

                              <ArrowRight
                                size={14}
                                strokeWidth={3}
                                className="text-black shrink-0 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                              />
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1.5 max-h-62.5 overflow-y-auto custom-scrollbar p-1">
                        <div className="text-center py-10 text-zinc-400">
                          <div className="text-sm font-bold uppercase tracking-widest">
                            No recent activity
                          </div>
                          <div className="text-[10px] mt-1">
                            Your recent projects and generations will appear
                            here.
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RESET BUTTON */}
            <button
              onClick={resetgenerateForm}
              className="p-2 border-[3px] border-transparent hover:border-black hover:bg-white rounded-xl text-zinc-400 hover:text-black transition-all group relative cursor-pointer hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <RefreshCcw size={18} strokeWidth={2.5} />
              <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                Reset
              </span>
            </button>
          </div>
        </div>

        {/* CONTENT BODY */}
        <div className="p-6 md:p-10 relative z-30 min-h-72">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 20, opacity: 0, filter: "blur(4px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ x: -20, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* THE "GOD BAR" (Unified Footer + Readiness Target + Navigation) */}
        <div className="bg-zinc-100 border-t-4 border-black p-4 md:p-6 flex items-center justify-between rounded-b-[calc(2rem-4px)] z-10 gap-4">
          {/* Left: Back Button */}
          <button
            onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className={`shrink-0 px-4 py-3 md:py-4 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest rounded-xl transition-all ${currentIndex === 0 ? "text-zinc-300 cursor-not-allowed bg-zinc-50 border-[3px] border-transparent" : "text-black bg-white hover:bg-zinc-100 border-[3px] border-black shadow-[3px_3px_0px_0px_#000] active:shadow-none active:translate-y-0.5 cursor-pointer"}`}
          >
            <ArrowLeft size={16} strokeWidth={3} className="shrink-0" />
            <span className="hidden sm:block">Back</span>
          </button>

          {/* Center: Readiness Bar (Hidden on very small screens, visible on md+) */}
          <div className="hidden md:flex flex-1 items-center gap-4 px-4 h-full border-x-2 border-zinc-200/60">
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                  Readiness
                </span>
                <span className="text-[10px] font-black italic text-zinc-800">
                  {completionPercentage}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#B197FC]"
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Right: Next / Generate */}
          {currentIndex < Dashboard_Card_STEPS.length - 1 ? (
            <button
              onClick={() =>
                onIndexChange(
                  Math.min(Dashboard_Card_STEPS.length - 1, currentIndex + 1),
                )
              }
              className="flex-1 md:flex-none px-6 py-3 md:py-4 bg-black text-white flex items-center justify-center gap-2 font-black text-xs md:text-sm uppercase tracking-widest rounded-xl border-[3px] border-black transition-all hover:bg-zinc-800 shadow-[4px_4px_0px_0px_#F4E041] active:translate-y-1 active:shadow-none cursor-pointer"
            >
              Next Step <ArrowRight size={16} strokeWidth={3} />
            </button>
          ) : (
            <div className="flex-1 md:flex-none">
              <MainButton
                onClick={handleGenerate}
                disabled={IsDisabled}
                variant="blue"
                className={`flex items-center justify-center gap-2 px-4 cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:border-transparent ${IsDisabled ? "bg-zinc-300 text-zinc-500 border-transparent cursor-not-allowed" : "bg-blue-300 text-black! border-[3px] border-black hover:bg-blue-200 active:translate-y-1 active:shadow-none"}  `}
              >
                {isGeneratingImage ? "Rendering..." : "Generate"}
              </MainButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
