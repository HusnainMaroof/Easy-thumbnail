"use client";

import { GenrateFormType } from "@/src/types/dashboard.type";
import { DashboardDropdown } from "./DashboardDropdown";
import {
  ArrowLeft,
  ArrowRight,
  Monitor,
  Smartphone,
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
};
export const DashboardCard = ({
  currentIndex,
  onIndexChange,
}: DashboardCardProps) => {
  const CurrentStepComponent = WIZARD_STEPS[currentIndex].component;

  return (
    <>
      <div className="flex gap-2 mb-6 px-2">
        {WIZARD_STEPS.map((_, idx) => (
          <div
            key={idx}
            className="flex-1 h-1.5 rounded-full bg-zinc-200 overflow-hidden"
          >
            <motion.div
              className={`h-full ${idx <= currentIndex ? "bg-[#B197FC]" : "bg-transparent"}`}
              initial={false}
              animate={{ width: idx <= currentIndex ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      <div className="bg-white border-2 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex-1 flex flex-col overflow-hidden mb-24">
        <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-zinc-100">
            <div className="w-8 h-8 bg-[#F4E041] border-2 border-black rounded-lg flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_0px_#000]">
              {currentIndex + 1}
            </div>
            <h2 className="text-lg md:text-xl font-black uppercase tracking-widest">
              {WIZARD_STEPS[currentIndex].title}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-zinc-50 border-t-2 border-black p-4 md:p-6 flex items-center justify-between">
          <button
            onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className={`px-4 py-2 flex items-center gap-2 font-black text-xs uppercase tracking-widest rounded-xl transition-all ${
              currentIndex === 0
                ? "text-zinc-300 cursor-not-allowed"
                : "text-black hover:bg-zinc-200 border-2 border-transparent hover:border-black"
            }`}
          >
            <ArrowLeft size={16} /> Back
          </button>

          {currentIndex < WIZARD_STEPS.length - 1 ? (
            <button
              onClick={() =>
                onIndexChange(
                  Math.min(WIZARD_STEPS.length - 1, currentIndex + 1),
                )
              }
              className="px-6 py-2.5 bg-black text-white flex items-center gap-2 font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:bg-zinc-800 shadow-[4px_4px_0px_0px_#B197FC] active:translate-y-1 active:shadow-none"
            >
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <div className="px-6 py-2.5 font-black text-xs uppercase text-zinc-400">
              Final Step
            </div>
          )}
        </div>
      </div>
    </>
  );
};
