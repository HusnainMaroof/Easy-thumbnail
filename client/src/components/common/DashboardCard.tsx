"use client";

import { GenrateFormType } from "@/src/types/dashboard.type";
import { DashboardDropdown } from "./DashboardDropdown";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Monitor,
  Smartphone,
  Sparkles,
  Square,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "@/src/context/AuthContext";
import { PhotoUploader } from "./PhotoUploader";
import {
  Step1Platform,
  Step2VideoTopic,
  Step3ClickHook,
  Step4Subject,
  Step5Focus,
  Step6Style,
  Step7Highlight,
  Step8Text,
  Step9Colors,
} from "./dashboradSteps";
import { MainButton } from "./Buttons";

const WIZARD_STEPS = [
  { title: "Platform", component: Step1Platform },
  { title: "Video Topic", component: Step2VideoTopic },
  { title: "Click Hook", component: Step3ClickHook },
  { title: "Subject", component: Step4Subject },
  { title: "Focus", component: Step5Focus },
  { title: "Style", component: Step6Style },
  { title: "Highlight", component: Step7Highlight },
  { title: "Text", component: Step8Text },
  { title: "Colors", component: Step9Colors },
];

type DashboardCardProps = {
  currentIndex: number;
  onIndexChange: (index: number) => void;
  completionPercentage: any;
  handleGenerate: () => void;
  isGeneratingImage: boolean;
};
export const DashboardCard = ({
  currentIndex,
  onIndexChange,
  completionPercentage,
  handleGenerate,
  isGeneratingImage,
}: DashboardCardProps) => {
  const CurrentStepComponent = WIZARD_STEPS[currentIndex].component;

  return (
    <>
      <div className="flex gap-1.5 mb-6 px-2 relative z-10">
        {WIZARD_STEPS.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden shadow-inner"
          >
            <motion.div
              className={`h-full ${idx <= currentIndex ? "bg-[#B197FC]" : "bg-transparent"}`}
              initial={false}
              animate={{ width: idx <= currentIndex ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      <div className="bg-white border-[3px] border-black rounded-4xl- shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col relative z-20 rounded-2xl">
        {/* HEADER */}
        <div className="bg-zinc-50 border-b-[3px] border-black p-6 md:px-8 md:py-6 flex items-center justify-between rounded-t-[calc(2rem-3px)]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#F4E041] border-2 border-black rounded-xl flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_#000] shrink-0">
              {currentIndex + 1}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest leading-none">
                {WIZARD_STEPS[currentIndex].title}
              </h2>
              <p className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">
                Step {currentIndex + 1} of {WIZARD_STEPS.length}
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT (Reduced bottom padding since we no longer have a floating overlap) */}
        <div className="p-6 md:p-8 relative z-30 pb-12 h-fit">
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

        {/* ROW 1 FOOTER: NAVIGATION */}
        <div className="bg-white border-t-[3px] border-black p-4 md:p-6 flex items-center justify-between z-10 relative">
          <button
            onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className={`px-5 py-3 flex items-center gap-2 font-black text-xs uppercase tracking-widest rounded-xl transition-all ${currentIndex === 0 ? "text-zinc-300 cursor-not-allowed bg-zinc-50 border-2 border-transparent" : "text-black bg-white hover:bg-zinc-100 border-2 border-black shadow-[2px_2px_0px_0px_#000] active:shadow-none active:translate-y-0.5 cursor-pointer"}`}
          >
            <ArrowLeft size={16} strokeWidth={3} /> Back
          </button>
          {currentIndex < WIZARD_STEPS.length - 1 ? (
            <button
              onClick={() =>
                onIndexChange(
                  Math.min(WIZARD_STEPS.length - 1, currentIndex + 1),
                )
              }
              className="px-8 py-3 bg-black text-white flex items-center gap-2 font-black text-xs uppercase tracking-widest rounded-xl border-2 border-black transition-all hover:bg-zinc-800 shadow-[4px_4px_0px_0px_#B197FC] active:translate-y-1 active:shadow-none cursor-pointer relative z-50"
            >
              Next Step <ArrowRight size={16} strokeWidth={3} />
            </button>
          ) : (
            <div className="px-8 py-3 font-black text-xs uppercase tracking-widest text-[#A7F3D0] bg-black border-2 border-black rounded-xl flex items-center gap-2 shadow-[4px_4px_0px_0px_#A7F3D0]">
              <Check size={16} strokeWidth={3} /> Ready
            </div>
          )}
        </div>

        {/* ROW 2 FOOTER: MERGED READINESS TARGET (No longer floating!) */}
        <div className="bg-zinc-100 border-t-[3px] border-black p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 rounded-b-[calc(2rem-3px)] z-10 relative">
          <div className="flex-1 w-full pl-2 md:pl-4">
            <p className="text-[8px] md:text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1.5 flex items-center gap-1.5">
              Readiness Target <Sparkles size={12} className="text-[#B197FC]" />
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] md:text-sm font-black italic min-w-[3ch]">
                {completionPercentage}%
              </span>
              <div className="flex-1 h-2 bg-white rounded-full overflow-hidden shadow-inner border border-zinc-300">
                <motion.div
                  className="h-full bg-[#A7F3D0]"
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                />
              </div>
            </div>
          </div>
          <MainButton
            onClick={handleGenerate}
            disabled={completionPercentage < 100}
            variant="yellow"
            className="w-fit px-4"
          >
            {isGeneratingImage ? (
              "Rendering..."
            ) : (
              <span className="hidden sm:inline">Generate Thumbnail</span>
            )}
            {!isGeneratingImage && <span className="sm:hidden">Generate</span>}
          </MainButton>
        </div>
      </div>
    </>
  );
};
