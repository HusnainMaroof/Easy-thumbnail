"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MonitorPlay,
  Smartphone,
  Instagram,
  Music2,
  Twitch,
  MoreHorizontal,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Gamepad2,
  Laptop,
  TrendingUp,
  GraduationCap,
  Video,
  Newspaper,
  Clapperboard,
  PartyPopper,
} from "lucide-react";

// ==========================================
// 1. DATA & OPTIONS
// ==========================================

const PLATFORMS = [
  { id: "youtube", label: "YouTube", icon: MonitorPlay },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "tiktok", label: "TikTok", icon: Music2 },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

const CONTENT_TYPES = [
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "tech", label: "Tech", icon: Laptop },
  { id: "finance", label: "Finance", icon: TrendingUp },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "vlogs", label: "Vlogs", icon: Video },
  { id: "entertainment", label: "Entertainment", icon: Clapperboard },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

const STYLES = [
  { id: "bold", label: "Bold / High Contrast", emoji: "😱" },
  { id: "minimal", label: "Minimal", emoji: "✨" },
  { id: "documentary", label: "Documentary", emoji: "🎞️" },
  { id: "gaming", label: "Gaming", emoji: "🎮" },
  { id: "unsure", label: "Not Sure", emoji: "🤔" },
];

// ==========================================
// 2. STEP COMPONENTS
// ==========================================

const StepWelcome = ({ onNext }: { onNext: () => void }) => (
  <div className="text-center py-10 px-4">
    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="text-xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-black mb-6"
    >
      FREE AI <br />
      <span className="bg-[#F4E041] px-4 border-4 border-black inline-block transform -rotate-2">
        THUMBNAIL
      </span>
      <br /> MAKER
    </motion.h1>
    <p className="text-sm md:text-base font-bold text-zinc-500 uppercase tracking-widest mb-10 max-w-sm mx-auto leading-relaxed">
      Answer a few quick questions to personalize your experience.
    </p>
    <button
      onClick={onNext}
      className="px-8 py-4 bg-black text-white text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-[6px_6px_0px_0px_#B197FC] hover:-translate-y-1 hover:shadow-[6px_8px_0px_0px_#B197FC] active:translate-y-1 active:shadow-none inline-flex items-center gap-3 cursor-pointer"
    >
      Start Setup <ArrowRight size={18} strokeWidth={3} />
    </button>
  </div>
);

const StepPlatform = ({
  formData,
  isOtherPlatform,
  onSelect,
  onInputChange,
}: any) => (
  <div className="flex flex-col h-full justify-start">
    <div className="grid grid-cols-2 gap-4">
      {PLATFORMS.map((p) => {
        const isSelected =
          p.id === "other"
            ? isOtherPlatform
            : !isOtherPlatform && formData.platform === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`group p-6 border-2 rounded-2xl transition-all flex flex-col items-center gap-4 cursor-pointer text-center ${
              isSelected
                ? "border-black shadow-[4px_4px_0px_0px_#000] -translate-y-1 bg-[#F4E041]"
                : "border-zinc-200 bg-zinc-50 hover:bg-white hover:border-black"
            }`}
          >
            <p.icon
              size={32}
              strokeWidth={2}
              className={
                isSelected
                  ? "text-black"
                  : "text-zinc-400 group-hover:text-black transition-colors"
              }
            />
            <span
              className={`text-xs font-black uppercase tracking-wider ${isSelected ? "text-black" : "text-zinc-500 group-hover:text-black transition-colors"}`}
            >
              {p.label}
            </span>
          </button>
        );
      })}
    </div>
    <AnimatePresence>
      {isOtherPlatform && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mt-4"
        >
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
            Please Specify
          </span>
          <input
            type="text"
            autoFocus
            placeholder="e.g. LinkedIn, Pinterest..."
            className="w-full border-2 border-black rounded-xl p-4 font-bold text-sm outline-none bg-white focus:border-[#B197FC] focus:ring-4 focus:ring-[#B197FC]/20 transition-all"
            value={formData.platform}
            onChange={(e) => onInputChange(e.target.value)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const StepContentType = ({
  formData,
  isOtherContentType,
  onSelect,
  onInputChange,
}: any) => (
  <div className="flex flex-col h-full justify-start">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {CONTENT_TYPES.map((n) => {
        const isSelected =
          n.id === "other"
            ? isOtherContentType
            : !isOtherContentType && formData.contentType === n.id;
        return (
          <button
            key={n.id}
            onClick={() => onSelect(n.id)}
            className={`group p-4 md:p-5 border-2 rounded-xl transition-all flex flex-col items-center justify-center gap-3 cursor-pointer text-center ${
              isSelected
                ? "border-black shadow-[4px_4px_0px_0px_#000] -translate-y-1 bg-[#F4E041]"
                : "border-zinc-200 bg-white hover:border-black"
            }`}
          >
            <n.icon
              size={24}
              className={
                isSelected
                  ? "text-black"
                  : "text-zinc-400 group-hover:text-black transition-colors"
              }
            />
            <span
              className={`text-[10px] md:text-xs font-black uppercase tracking-wider ${isSelected ? "text-black" : "text-zinc-500 group-hover:text-black transition-colors"}`}
            >
              {n.label}
            </span>
          </button>
        );
      })}
    </div>
    <AnimatePresence>
      {isOtherContentType && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mt-4"
        >
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
            Please Specify
          </span>
          <input
            type="text"
            autoFocus
            placeholder="e.g. Real Estate, Cooking, DIY..."
            className="w-full border-2 border-black rounded-xl p-4 font-bold text-sm outline-none bg-white focus:border-[#B197FC] focus:ring-4 focus:ring-[#B197FC]/20 transition-all"
            value={formData.contentType}
            onChange={(e) => onInputChange(e.target.value)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const StepStyle = ({ formData, onSelect }: any) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {STYLES.map((s) => (
      <button
        key={s.id}
        onClick={() => onSelect("style", s.id)}
        className={`group p-5 border-2 rounded-2xl transition-all flex items-center gap-4 cursor-pointer text-left ${
          formData.style === s.id
            ? "border-black shadow-[4px_4px_0px_0px_#000] -translate-y-1 bg-[#F4E041]"
            : "border-zinc-200 bg-white hover:border-black"
        }`}
      >
        <span className="text-2xl">{s.emoji}</span>
        <span
          className={`text-xs font-black uppercase tracking-wider leading-tight ${formData.style === s.id ? "text-black" : "text-zinc-600 group-hover:text-black transition-colors"}`}
        >
          {s.label}
        </span>
        {formData.style === s.id && (
          <div className="ml-auto bg-black text-white rounded-full p-1">
            <Check size={14} strokeWidth={4} />
          </div>
        )}
      </button>
    ))}
  </div>
);

const StepFinish = ({ onComplete }: { onComplete: () => void }) => (
  <div className="text-center py-10 px-4">
    <div className="w-24 h-24 bg-[#A7F3D0] border-2 border-black rounded-full mx-auto flex items-center justify-center shadow-[4px_4px_0px_0px_#000] mb-8">
      <PartyPopper size={40} strokeWidth={2} className="text-black" />
    </div>
    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest leading-tight mb-4">
      You're ready to create your first thumbnail.
    </h1>
    <p className="text-sm md:text-base font-bold text-zinc-500 uppercase tracking-widest mb-10 max-w-sm mx-auto leading-relaxed">
      Your workspace is optimized with your preferences.
    </p>
    <button
      onClick={onComplete}
      className="px-8 py-4 bg-black text-[#F4E041] text-sm font-black uppercase tracking-widest rounded-xl transition-all shadow-[6px_6px_0px_0px_#B197FC] hover:-translate-y-1 hover:shadow-[6px_8px_0px_0px_#B197FC] active:translate-y-1 active:shadow-none inline-flex items-center gap-3 cursor-pointer"
    >
      Generate Thumbnail <Sparkles size={18} strokeWidth={2.5} />
    </button>
  </div>
);

// ==========================================
// 3. LAYOUT COMPONENTS
// ==========================================

const OnboardingHeader = ({ step }: { step: number }) => {
  if (step === 0 || step === 4) return null;

  const headers = [
    "",
    {
      title: "Where will you use your thumbnails?",
      subtitle: "We'll optimize the layout and ratio for this platform.",
    },
    {
      title: "What type of content do you create?",
      subtitle: "This helps our system recommend the best styles.",
    },
    {
      title: "What thumbnail style do you prefer?",
      subtitle: "This sets your default design starting point.",
    },
  ];

  const currentHeader = headers[step] as any;

  return (
    <div className="bg-zinc-50 border-b-2 border-zinc-100 p-6 md:p-8 flex items-center gap-4 shrink-0 rounded-t-[calc(2rem-2px)]">
      <div className="w-12 h-12 bg-[#F4E041] border-2 border-black rounded-xl flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_0px_#000] shrink-0">
        {step}
      </div>
      <div>
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest leading-none">
          {currentHeader.title}
        </h2>
        <p className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-wider mt-1">
          {currentHeader.subtitle}
        </p>
      </div>
    </div>
  );
};

const OnboardingFooter = ({ step, isStepComplete, onNext, onPrev }: any) => {
  if (step === 0 || step === 4) return null;

  return (
    <div className="bg-white border-t-2 border-zinc-100 p-4 md:p-6 flex items-center justify-between shrink-0 rounded-b-[calc(2rem-2px)]">
      <button
        onClick={onPrev}
        className="px-5 py-3 flex items-center gap-2 font-black text-xs uppercase tracking-widest rounded-xl transition-all text-black hover:bg-zinc-100 border-2 border-transparent hover:border-black cursor-pointer"
      >
        <ArrowLeft size={16} strokeWidth={3} /> Back
      </button>

      <button
        onClick={onNext}
        disabled={!isStepComplete}
        className={`px-8 py-3 flex items-center gap-2 font-black text-xs uppercase tracking-widest rounded-xl transition-all ${
          !isStepComplete
            ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
            : "bg-black text-white shadow-[4px_4px_0px_0px_#B197FC] hover:-translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer"
        }`}
      >
        Continue <ArrowRight size={16} strokeWidth={3} />
      </button>
    </div>
  );
};

// ==========================================
// 4. MAIN CONTAINER
// ==========================================

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Clean Form Data
  const [formData, setFormData] = useState({
    platform: "",
    contentType: "",
    style: "",
  });

  // Track if "Other" logic is toggled open
  const [isOtherPlatform, setIsOtherPlatform] = useState(false);
  const [isOtherContentType, setIsOtherContentType] = useState(false);

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    console.log("Onboarding Complete:", formData);
    alert("Redirecting to the Dashboard Generator...");
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  const checkStepComplete = () => {
    switch (step) {
      case 1:
        return formData.platform.trim().length > 0;
      case 2:
        return formData.contentType.trim().length > 0;
      case 3:
        return formData.style !== "";
      default:
        return true;
    }
  };

  const isStepComplete = checkStepComplete();
  const progressPercentage = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-black font-sans selection:bg-[#F4E041] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="w-full max-w-3xl relative z-10 flex flex-col items-center">
        {/* Progress Indicator */}
        <div className="w-full max-w-sm mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Progress
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#B197FC]">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-black"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full bg-white border-2 border-black rounded-4xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col min-h-125 relative">
          <OnboardingHeader step={step} />

          <div className="p-6 md:p-8 flex-1 relative overflow-hidden flex flex-col justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="w-full flex flex-col justify-center h-full"
              >
                {step === 0 && <StepWelcome onNext={nextStep} />}

                {step === 1 && (
                  <StepPlatform
                    formData={formData}
                    isOtherPlatform={isOtherPlatform}
                    onSelect={(val: string) => {
                      if (val === "other") {
                        setIsOtherPlatform(true);
                        setFormData((prev) => ({ ...prev, platform: "" }));
                      } else {
                        setIsOtherPlatform(false);
                        setFormData((prev) => ({ ...prev, platform: val }));
                      }
                    }}
                    onInputChange={(val: string) =>
                      setFormData((prev) => ({ ...prev, platform: val }))
                    }
                  />
                )}

                {step === 2 && (
                  <StepContentType
                    formData={formData}
                    isOtherContentType={isOtherContentType}
                    onSelect={(val: string) => {
                      if (val === "other") {
                        setIsOtherContentType(true);
                        setFormData((prev) => ({ ...prev, contentType: "" }));
                      } else {
                        setIsOtherContentType(false);
                        setFormData((prev) => ({ ...prev, contentType: val }));
                      }
                    }}
                    onInputChange={(val: string) =>
                      setFormData((prev) => ({ ...prev, contentType: val }))
                    }
                  />
                )}

                {step === 3 && (
                  <StepStyle formData={formData} onSelect={handleSelect} />
                )}
                {step === 4 && <StepFinish onComplete={handleComplete} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <OnboardingFooter
            step={step}
            isStepComplete={isStepComplete}
            onNext={nextStep}
            onPrev={prevStep}
          />
        </div>
      </div>
    </div>
  );
}
