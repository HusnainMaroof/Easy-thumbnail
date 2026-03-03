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
import DashboardSideBar from "./DashboardSideBar";
import { PhotoUploader } from "./PhotoUploader";

const FormStep = ({
  step,
  currentStep,
  title,
  children,
}: {
  step: number;
  currentStep: number;
  title: string;
  children: React.ReactNode;
}) => {
  const isActive = currentStep >= step;
  const isCompleted = currentStep > step;

  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.98,
        filter: isActive ? "blur(0px)" : "blur(1px)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      // Crucial Fix: Higher steps get lower z-index so previous dropdowns overlay properly
      style={{ zIndex: 50 - step }}
      className={`mb-10 relative transition-all duration-500`}
    >
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-8 h-8 md:w-9 md:h-9 border-2 border-black rounded-lg flex shrink-0 items-center justify-center text-xs font-black shadow-[2px_2px_0px_0px_#000] transition-colors duration-300
        ${isCompleted ? "bg-[#A7F3D0]" : isActive ? "bg-[#F4E041]" : "bg-white text-zinc-300"}`}
        >
          {isCompleted ? <CheckCircle2 size={16} /> : step}
        </div>
        <h3
          className={`text-sm md:text-base font-black uppercase tracking-widest transition-colors ${isActive ? "text-black" : "text-zinc-400"}`}
        >
          {title}
        </h3>
      </div>

      <div
        className={`pl-2 md:pl-13 transition-all duration-500 ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {children}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const {
    dashboardActiveTab,
    setDashboardActiveTab,
    dashboardSideBar,
    setDashboardSideBar,
    generateForm,
    setGenerateForm,
  } = useAuthContext();

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

  const isStep1Done = generateForm.platform && generateForm.title;
  const isStep2Done =
    isStep1Done &&
    generateForm.niche &&
    generateForm.emotion &&
    generateForm.style;
  const isStep3Done =
    isStep2Done &&
    generateForm.subjectType &&
    generateForm.placement &&
    generateForm.textIntensity;

  const stepsDone = [isStep1Done, isStep2Done, isStep3Done];

  const currentStep =
    stepsDone.findIndex((done) => !done) + 1 || stepsDone.length + 1;

  const requiredFields: (keyof GenrateFormType)[] = [
    "platform",
    "title",
    "niche",
    "emotion",
    "style",
    "subjectType",
    "placement",
    "textIntensity",
    "highlight",
    "background",
  ];

  const filledFields = requiredFields.filter(
    (field) => generateForm[field] !== "",
  ).length;
  const completionPercentage = Math.round(
    (filledFields / requiredFields.length) * 100,
  );

  const updateField = (field: keyof GenrateFormType, value: any) => {
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setDashboardActiveTab("review");
    }, 1800);
  };

  return (
    <div className="h-[90vh] bg-[#FDFDFF] text-black font-sans selection:bg-[#F4E041] flex flex-col overflow-hidden">
      {/* 1. TOP NAVIGATION */}

      <div className="flex flex-1 overflow-hidden relative">
        <DashboardSideBar updateField={updateField} />

        <div className="flex-1 overflow-y-auto  bg-[#FAFAFA] custom-scrollbar relative">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setDashboardSideBar(!dashboardSideBar)}
              className="p-2 hover:bg-zinc-50 rounded-lg border border-zinc-100 transition-colors sticky top-0"
            >
              {dashboardSideBar ? (
                <PanelLeftClose
                  size={25}
                  className="text-zinc-600 cursor-pointer"
                />
              ) : (
                <PanelLeft size={25} className="text-zinc-600 cursor-pointer" />
              )}
            </button>

            <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200 shadow-inner">
              <button
                onClick={() => setDashboardActiveTab("generate")}
                className={`px-4 md:px-6 py-1.5 font-black  cursor-pointer uppercase text-[9px] md:text-[10px] rounded-lg transition-all ${dashboardActiveTab === "generate" ? "bg-white text-black shadow-sm" : "text-zinc-400"}`}
              >
                Generate
              </button>
              <button
                onClick={() => setDashboardActiveTab("review")}
                className={`px-4 md:px-6 py-1.5 font-black cursor-pointer  uppercase text-[9px] md:text-[10px] rounded-lg transition-all ${dashboardActiveTab === "review" ? "bg-white text-black shadow-sm" : "text-zinc-400"}`}
              >
                Review
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-[9px] font-black text-zinc-400 hidden md:block uppercase">
                Credits: 480
              </div>
              <div className="w-8 h-8 md:w-9 md:h-9 border-2 border-black rounded-lg bg-[#B197FC] shadow-[2px_2px_0px_0px_#000] flex items-center justify-center text-white">
                <User size={16} />
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            {dashboardActiveTab === "generate" ? (
              <motion.div
                key="generate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto py-8 px-4 md:px-6  relative"
              >
                {/* Section 1: Core Configuration */}
                <FormStep
                  step={1}
                  currentStep={currentStep}
                  title="Core Configuration"
                >
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
                        Platform
                      </span>
                      <div className="grid grid-cols-3 gap-3 md:gap-4">
                        {[
                          { id: "youtube", label: "YouTube", icon: Monitor },
                          { id: "tiktok", label: "TikTok", icon: Smartphone },
                          {
                            id: "instagram",
                            label: "Instagram",
                            icon: Square,
                          },
                        ].map((p) => (
                          <button
                            key={p.id}
                            onClick={() => updateField("platform", p.id)}
                            className={`group p-5 border-2 rounded-xl transition-all flex flex-col items-center gap-2 cursor-pointer hover:text-white  ${
                              generateForm.platform === p.id
                                ? "border-black shadow-[4px_4px_0px_0px_#000] -translate-y-1 bg-white"
                                : "border-zinc-200 bg-white hover:bg-[#88AAEE] "
                            }`}
                          >
                            <p.icon
                              size={20}
                              className={
                                generateForm.platform === p.id
                                  ? "text-black"
                                  : "text-zinc-400 group-hover:text-white"
                              }
                            />
                            <div
                              className={`text-xs font-black ${generateForm.platform === p.id ? "text-black" : "text-zinc-400 group-hover:text-white"}`}
                            >
                              {p.label}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative mt-4">
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
                        Title & Hook
                      </span>
                      <input
                        type="text"
                        placeholder="Enter Viral Hook / Video Title..."
                        className="w-full border-2 border-black rounded-xl p-4 pr-12 font-bold text-sm md:text-lg outline-none bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.05)] focus:shadow-[4px_4px_0px_0px_#B197FC] transition-all"
                        value={generateForm.title}
                        onChange={(e) => updateField("title", e.target.value)}
                      />
                      <button
                        onClick={() =>
                          updateField("aiHook", !generateForm.aiHook)
                        }
                        className={`absolute right-3 top-9.5 p-2 rounded-lg transition-all ${
                          generateForm.aiHook
                            ? "bg-[#B197FC] text-white"
                            : "bg-[#B197FC]/10 text-[#B197FC] hover:bg-[#B197FC] hover:text-white"
                        }`}
                        title="Toggle AI Hook Generation"
                      >
                        <Wand2 size={18} />
                      </button>
                    </div>
                  </div>
                </FormStep>

                {/* Section 2: Creative Direction */}
                <FormStep
                  step={2}
                  currentStep={currentStep}
                  title="Creative Direction"
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
                        ]}
                      />
                    </div>
                  </div>
                </FormStep>

                {/* Section 3: Subject & Layout */}
                <FormStep
                  step={3}
                  currentStep={currentStep}
                  title="Subject & Layout"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <DashboardDropdown
                        label="Subject Type"
                        field="subjectType"
                        options={[
                          { label: "Upload Own", value: "upload" },
                          { label: "AI Generated", value: "ai" },
                          { label: "None", value: "none" },
                        ]}
                      />

                      {generateForm.subjectType === "upload" && (
                        <PhotoUploader
                          value={generateForm.uploadedImage ?? null}
                          onChange={(file) =>
                            setGenerateForm((prev) => ({
                              ...prev,
                              uploadedImage: file,
                            }))
                          }
                        />
                      )}
                    </div>
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
                </FormStep>

                {/* Section 4: Environmental Detail */}
                <FormStep
                  step={4}
                  currentStep={currentStep}
                  title="Environmental Detail"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-60">
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
                </FormStep>

                {/* STICKY FOOTER */}
                <div className="sticky  bottom-0   flex justify-center pointer-events-none z-100   ">
                  <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white border-2 border-zinc-200 p-3 md:p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-4 md:gap-8 pointer-events-auto max-w-2xl w-full"
                  >
                    <div className="flex-1 pl-2 md:pl-4">
                      <p className="text-[8px] md:text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1">
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
                            transition={{ ease: "easeInOut", duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>
                    <MainButton
                      onClick={handleGenerate}
                      disabled={completionPercentage < 100}
                      variant="yellow"
                    >
                      {isGenerating ? "Synthesizing..." : "Render Concept"}
                    </MainButton>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center min-h-[50vh] text-zinc-400 font-bold">
                Review Tab Content Mock
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px;  } 
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
