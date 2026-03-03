"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Square,
  Sparkles,
  Settings,
  Download,
  Share2,
  Image as ImageIcon,
  User,
  Zap,
  Layers,
  Palette,
  Target,
  Smile,
  Type,
  Maximize,
  RotateCcw,
  Sliders,
  ChevronDown,
  Save,
  CheckCircle2,
  Box,
  Focus,
  PanelLeftClose,
  PanelLeft,
  X,
  Wand2,
  ArrowRight,
} from "lucide-react";
import { MainButton } from "./Buttons";
import { DashboardDropdown } from "./DashboardDropdown";
import DashboardPreview from "./DashboardPreview";
import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType } from "@/src/types/dashboard.type";
interface StepWrapperProps {
  step: number;
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
}
const StepWrapper: React.FC<StepWrapperProps> = ({
  step,
  title,
  children,
  isActive,
  isCompleted,
}) => (
  <motion.div
    initial={false}
    animate={{
      opacity: isActive ? 1 : 0.35,
      scale: isActive ? 1 : 0.98,
      filter: isActive ? "blur(0px)" : "blur(0.5px)",
    }}
    className={`mb-10 transition-all duration-500 relative ${isActive ? "z-10" : "z-0 pointer-events-none"}`}
  >
    <div className="flex items-center gap-4 mb-5">
      <div
        className={`w-8 h-8 md:w-9 md:h-9 border-2 border-black rounded-lg flex shrink-0 items-center justify-center text-xs font-black shadow-[2px_2px_0px_0px_#000] transition-colors
        ${isCompleted ? "bg-[#A7F3D0]" : isActive ? "bg-[#F4E041]" : "bg-white text-zinc-300"}`}
      >
        {isCompleted ? <CheckCircle2 size={16} /> : step}
      </div>
      <h3
        className={`text-sm md:text-base font-black uppercase tracking-widest ${isActive ? "text-black" : "text-zinc-400"}`}
      >
        {title}
      </h3>
    </div>
    <div className={`pl-2 md:pl-13 ${isActive ? "animate-in fade-in" : ""}`}>
      {children}
    </div>
  </motion.div>
);
const Dashboard = () => {
  const {
    dashboardActiveTab,
    setDashboardActiveTab,
    dashboardSideBar,
    setDashboardSideBar,
    generateForm,
    setGenerateForm,
  } = useAuthContext();
  const [currentStep, setCurrentStep] = useState(1);
  // Default closed on mobile
  const [isGenerating, setIsGenerating] = useState(false);

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setDashboardSideBar(true);
      else setDashboardSideBar(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const requiredFields: (keyof GenrateFormType)[] = [
    "platform",
    "title",
    "niche",
    "emotion",
    "style",
    "subjectType",
  ];

  const filledFields = requiredFields.filter(
    (field) => generateForm[field] !== "",
  ).length;

  const completionPercentage = Math.round(
    (filledFields / requiredFields.length) * 100,
  );

  const updateField = <K extends keyof GenrateFormType>(
    field: K,
    value: GenrateFormType[K],
    targetStep?: number | null,
  ) => {
    setGenerateForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (targetStep && currentStep === targetStep - 1) {
      setTimeout(() => setCurrentStep(targetStep), 300);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setDashboardActiveTab("review");
    }, 1800);
  };

  return (
    <div className="h-[80vh] bg-[#FDFDFF] text-black font-sans selection:bg-[#F4E041] flex flex-col overflow-hidden">
      {/* 1. TOP NAVIGATION */}

      <div className="flex flex-1 overflow-hidden relative">
        {/* MOBILE BACKDROP FOR SIDEBAR */}
        <AnimatePresence>
          {dashboardSideBar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setDashboardSideBar(false)}
            />
          )}
        </AnimatePresence>

        {/* 2. PROMPT LAB SIDEBAR */}
        <motion.aside
          initial={false}
          animate={{
            x: dashboardSideBar ? 0 : -320,
            width: dashboardSideBar ? 300 : 0,
            opacity: dashboardSideBar ? 1 : 0,
          }}
          className="absolute lg:relative z-50 h-full shrink-0 border-r-2 border-zinc-200 bg-white overflow-hidden shadow-2xl lg:shadow-none"
        >
          <div className="w-75 p-6 space-y-8 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[#88AAEE]" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-50">
                  Intelligence Lab
                </span>
              </div>
              <button
                className="lg:hidden p-1 bg-zinc-100 rounded-md"
                onClick={() => setDashboardSideBar(false)}
              >
                <X size={14} />
              </button>
            </div>
            <section className="space-y-4">
              <label className="text-[9px] font-black uppercase opacity-50">
                Extra Prompt Direction
              </label>
              <textarea
                className="w-full h-40 p-4 bg-zinc-50 border-2 border-zinc-200 rounded-xl text-[11px] font-bold focus:border-black outline-none transition-all resize-none shadow-inner"
                placeholder="E.g. Add a glowing neon outline to the subject..."
                value={generateForm.extraPrompt}
                onChange={(e) =>
                  updateField("extraPrompt", e.target.value, null)
                }
              />
            </section>
            <section className="space-y-3">
              <label className="text-[9px] font-black uppercase text-black opacity-50">
                Contrast Boost
              </label>
              <input
                type="range"
                className="w-full accent-black h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
              />
            </section>
            <div className="pt-6 border-t border-zinc-100">
              <button className="w-full py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[9px] font-black uppercase hover:bg-zinc-100 hover:border-black transition-all">
                <Save size={12} className="inline mr-2" /> Save Configuration
              </button>
            </div>
          </div>
        </motion.aside>

        {/* 3. MAIN WORKSPACE */}
        <div className="flex-1 overflow-y-auto relative bg-[#FAFAFA] custom-scrollbar">
          <AnimatePresence mode="wait">
            
            {dashboardActiveTab === "generate" ? (
              <motion.div
                key="generate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto py-12 md:py-16 px-4 md:px-6 pb-48"
              >
                {/* Section 1: Core Target */}
                <StepWrapper
                  step={1}
                  title="Core Configuration"
                  isActive={currentStep >= 1}
                  isCompleted={currentStep > 1}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      {[
                        { id: "yt", label: "YouTube", icon: Monitor },
                        { id: "tt", label: "TikTok", icon: Smartphone },
                        { id: "ig", label: "Instagram", icon: Square },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() =>
                            updateField(
                              "platform",
                              p.id as GenrateFormType["platform"],
                              currentStep === 1 && generateForm.title
                                ? 2
                                : null,
                            )
                          }
                          className={`p-5 border-2 rounded-xl ${
                            generateForm.platform === p.id
                              ? "border-black shadow"
                              : "border-zinc-200"
                          }`}
                        >
                          <p.icon size={20} />
                          <div className="text-xs font-black">{p.label}</div>
                        </button>
                      ))}
                    </div>

                    <div className="relative mt-4">
                      <input
                        type="text"
                        placeholder="Enter Viral Hook / Video Title..."
                        className="w-full border-2 border-black rounded-xl p-4 pr-12 font-bold text-sm md:text-lg outline-none bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.05)] focus:shadow-[4px_4px_0px_0px_#B197FC] transition-all"
                        value={generateForm.title}
                        onChange={(e) =>
                          updateField("title", e.target.value, null)
                        }
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#B197FC]/10 rounded-lg hover:bg-[#B197FC] hover:text-white transition-all text-[#B197FC]">
                        <Wand2 size={18} />
                      </button>
                    </div>

                    {generateForm.title &&
                      generateForm.platform &&
                      currentStep === 1 && (
                        <MainButton
                          variant="black"
                          className="w-full"
                          onClick={() => setCurrentStep(2)}
                        >
                          Confirm Core Setup
                        </MainButton>
                      )}
                  </div>
                </StepWrapper>

                {/* Section 2: Creative Direction */}
                <StepWrapper
                  step={2}
                  title="Creative Direction"
                  isActive={currentStep >= 2}
                  isCompleted={currentStep > 2}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DashboardDropdown
                      label="Niche"
                      field="niche"
                      options={[
                        { label: "Gaming", value: "gaming" },
                        { label: "Finance", value: "finance" },
                        { label: "Tech", value: "tech" },
                        { label: "Vlog", value: "vlog" },
                      ]}
                    />
                    <DashboardDropdown
                      label="Emotion"
                      field="emotion"
                      options={[
                        { label: "Shock", value: "shock" },
                        { label: "Curiosity", value: "curiosity" },
                        { label: "Fear", value: "fear" },
                      ]}
                    />
                    <div className="md:col-span-2 mt-2">
                      <DashboardDropdown
                        label="Style"
                        field="style"
                        options={[
                          { label: "High-Energy Viral", value: "viral" },
                          { label: "Clean & Minimal News", value: "news" },
                          { label: "Cinematic Luxury", value: "viral" },
                        ]}
                      />
                    </div>
                  </div>
                  {generateForm.niche &&
                    generateForm.emotion &&
                    generateForm.style &&
                    currentStep === 2 && (
                      <MainButton
                        variant="black"
                        className="w-full mt-6"
                        onClick={() => setCurrentStep(3)}
                      >
                        Confirm Direction
                      </MainButton>
                    )}
                </StepWrapper>

                {/* Section 3: Subject & Layout */}
                <StepWrapper
                  step={3}
                  title="Subject & Layout"
                  isActive={currentStep >= 3}
                  isCompleted={currentStep > 3}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* <DashboardDropdown
                      field="placement"
                      options={[
                        { label: "Left", value: "left" },
                        { label: "Center", value: "center" },
                        { label: "Right", value: "right" },
                        { label: "Auto", value: "auto" },
                      ]}
                    /> */}
                    <DashboardDropdown
                      label="Placement"
                      field="placement"
                      options={[
                        { label: "Left", value: "left" },
                        { label: "Center", value: "center" },
                        { label: "Right", value: "right" },
                        { label: "Auto", value: "auto" },
                      ]}
                    />
                    <div className="md:col-span-2 mt-2">
                      <DashboardDropdown
                        label="Text Intensity"
                        field="textIntensity"
                        options={[
                          { label: "Minimal", value: "minimal" },
                          { label: "Bold", value: "bold" },
                          { label: "Aggressive", value: "aggressive" },
                        ]}
                      />
                    </div>
                  </div>
                  {generateForm.subjectType &&
                    generateForm.textIntensity &&
                    currentStep === 3 && (
                      <MainButton
                        variant="black"
                        className="w-full mt-6"
                        onClick={() => setCurrentStep(4)}
                      >
                        Confirm Layout
                      </MainButton>
                    )}
                </StepWrapper>

                {/* Section 4: Environmental Logic */}
                <StepWrapper
                  step={4}
                  title="Environmental Detail"
                  isActive={currentStep >= 4}
                  isCompleted={false}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DashboardDropdown
                      label="Highlight"
                      field="highlight"
                      options={[
                        { label: "Money", value: "money" },
                        { label: "Laptop", value: "laptop" },
                        { label: "Graph", value: "graph" },
                        { label: "Game Item", value: "game-item" },
                        { label: "Arrow Circle", value: "arrow-circle" },
                        { label: "None", value: "none" },
                      ]}
                    />
                    <DashboardDropdown
                      label="Background"
                      field="background"
                      options={[
                        { label: "Solid", value: "solid" },
                        { label: "Gradient", value: "gradient" },
                        { label: "Blur", value: "blur" },
                        { label: "Real", value: "real" },
                        { label: "Abstract", value: "abstract" },
                      ]}
                    />
                  </div>
                </StepWrapper>

                {/* STICKY FOOTER */}
                <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 flex justify-center pointer-events-none z-40 bg-linear-to-t from-[#FAFAFA] to-transparent pt-12">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white border-2 border-zinc-200 p-3 md:p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-4 md:gap-8 pointer-events-auto max-w-2xl w-full"
                  >
                    <div className="flex-1 pl-2 md:pl-4">
                      <p className="text-[8px] md:text-[9px] font-black uppercase text-zinc-400 tracking-widest">
                        Readiness
                      </p>
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-[10px] md:text-xs font-black italic">
                          {completionPercentage}%
                        </span>
                        <div className="flex-1 h-1.5 md:h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-[#A7F3D0]"
                            animate={{ width: `${completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <MainButton
                      onClick={handleGenerate}
                      disabled={completionPercentage < 100}
                      variant="yellow"
                      className="py-3! md:py-4!"
                    >
                      {isGenerating ? "Synthesizing..." : "Render Concept"}
                    </MainButton>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <DashboardPreview />
            )}
          </AnimatePresence>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4D4D8; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #A1A1AA; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: fade-in 0.4s ease-out forwards; }
      `,
        }}
      />
    </div>
  );
};

export default Dashboard;
