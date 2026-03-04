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
import {
  Generated_Form_Options,
  GenrateFormType,
} from "@/src/types/dashboard.type";
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
      className={`mb-10 relative transition-all duration-500  ${isCompleted ? "bg-blue-100" : isActive ? "bg-gray-200" : null}   p-2 rounded-xl`}
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
    generateForm.contentType &&
    generateForm.emotion;
  const isStep3Done =
    isStep2Done &&
    generateForm.subjectSource &&
    generateForm.subjectPresence &&
    generateForm.faceFraming &&
    generateForm.expressionLevel;
  const isStep4Done =
    isStep3Done && generateForm.placement && generateForm.composition;
  const isStep5Done =
    isStep4Done &&
    generateForm.textDensity &&
    generateForm.textStyle &&
    generateForm.numberStyle &&
    generateForm.highlightType;
  const isStep6Done =
    isStep5Done &&
    generateForm.style &&
    generateForm.backgroundType &&
    generateForm.backgroundStyle &&
    generateForm.colorMode &&
    generateForm.effectsLevel;

  const stepsDone = [
    isStep1Done,
    isStep2Done,
    isStep3Done,
    isStep4Done,
    isStep5Done,
    isStep6Done,
  ];

  const currentStep =
    stepsDone.findIndex((done) => !done) + 1 || stepsDone.length + 1;

  const requiredFields: (keyof GenrateFormType)[] = [
    "platform",
    "title",
    "niche",
    "contentType",
    "emotion",
    "style",
    "expressionLevel",
    "subjectSource",
    "subjectPresence",
    "composition",
    "placement",
    "textDensity",
    "textStyle",
    "highlightType",
    "backgroundType",
    "colorMode",
    "effectsLevel",
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
    <div className="h-[90vh] bg-[#FDFDFF] text-black font-sans selection:bg-[#F4E041] flex flex-col overflow-hidden relative">
      {/* 1. TOP NAVIGATION */}

      <div className="flex flex-1 overflow-hidden relative">
        <DashboardSideBar updateField={updateField} />

        <div className="flex-1 overflow-y-auto  custom-scrollbar relative ">
          <div className="flex items-center justify-between  border-b-2 sticky top-0 z-50 bg-white ">
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
              <div className="w-full relative">
                <div
                  className="absolute inset-0 z-0 opacity-[0.05] h-full "
                  style={{
                    backgroundImage: `linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)`,
                    backgroundSize: "40px 40px",
                  }}
                ></div>

                <motion.div
                  key="generate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className=" max-w-2xl  mx-auto py-8 px-4 md:px-6  relative"
                >
                  {/* Section 1: Core Configuration */}
                  <FormStep
                    step={1}
                    currentStep={currentStep}
                    title="Core Configuration"
                  >
                    <div className="space-y-6">
                      <div>
                        <span className="text-[12px] font-bold underline text-black uppercase tracking-widest block mb-2 ml-1">
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
                                  ? "border-black  shadow-[4px_4px_0px_0px_#000] -translate-y-1 bg-white"
                                  : " border border-olive-500 bg-white hover:bg-[#88AAEE] "
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
                        <span className="text-[12px] font-bold underline text-black uppercase tracking-widest block mb-2 ml-1">
                          Title & Hook
                        </span>
                        <input
                          type="text"
                          placeholder="Enter Viral Hook / Video Title..."
                          className="w-full border-2 border-black rounded-xl p-4 pr-12 font-bold text-sm md:text-lg outline-none bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.05)] focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                          value={generateForm.title}
                          onChange={(e) => updateField("title", e.target.value)}
                        />
                      </div>
                    </div>
                  </FormStep>

                  {/* Section 2: Content Basics (WHAT the thumbnail is about) */}
                  <FormStep
                    step={2}
                    currentStep={currentStep}
                    title="Content Strategy"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DashboardDropdown
                        label="Niche"
                        field="niche"
                        options={Generated_Form_Options.niche}
                      />
                      <DashboardDropdown
                        label="Type"
                        field="contentType"
                        options={Generated_Form_Options.contentType}
                      />
                      <div className="md:col-span-2">
                        <DashboardDropdown
                          label="Emotion"
                          field="emotion"
                          options={Generated_Form_Options.emotion}
                        />
                      </div>
                    </div>
                  </FormStep>

                  {/* Section 3: Subject & Layout */}
                  <FormStep
                    step={3}
                    currentStep={currentStep}
                    title="Subject / Focus"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`flex flex-col gap-2  ${generateForm.subjectSource === "user-upload" && "md:col-span-2"} `}
                      >
                        <DashboardDropdown
                          label="Character / Subject"
                          field="subjectSource"
                          options={Generated_Form_Options.subjectSource}
                        />
                        {generateForm.subjectSource === "user-upload" && (
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
                        label="Presence"
                        field="subjectPresence"
                        options={Generated_Form_Options.subjectPresence}
                      />
                      <DashboardDropdown
                        label="Framing"
                        field="faceFraming"
                        options={Generated_Form_Options.faceFraming}
                      />
                      <DashboardDropdown
                        label="Expression"
                        field="expressionLevel"
                        options={Generated_Form_Options.expressionLevel}
                      />
                    </div>
                  </FormStep>
                  {/* Section 4: Environmental Detail */}
                  <FormStep
                    step={4}
                    currentStep={currentStep}
                    title="Layout / Composition"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DashboardDropdown
                        label="Placement"
                        field="placement"
                        options={Generated_Form_Options.placement}
                      />
                      <DashboardDropdown
                        label="Composition"
                        field="composition"
                        options={Generated_Form_Options.composition}
                      />
                    </div>
                  </FormStep>

                  {/* 5. TEXT / EMPHASIS */}
                  <FormStep
                    step={5}
                    currentStep={currentStep}
                    title="Text / Emphasis"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DashboardDropdown
                        label="Text Intensity"
                        field="textDensity"
                        options={Generated_Form_Options.textDensity}
                      />
                      <DashboardDropdown
                        label="Text Style"
                        field="textStyle"
                        options={Generated_Form_Options.textStyle}
                      />

                      <DashboardDropdown
                        label="Highlight"
                        field="highlightType"
                        options={Generated_Form_Options.highlightType}
                      />
                      {generateForm.highlightType &&
                        generateForm.highlightType !== "none" && (
                          <div className=" relative">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
                              Highlight Target
                            </span>
                            <input
                              type="text"
                              placeholder="What to highlight?"
                              className="w-full border-2 border-zinc-400 rounded-xl px-4 py-3 text-xs font-black outline-none bg-white focus:border-black transition-all h-[46px]"
                              value={generateForm.highlightTarget || ""}
                              onChange={(e) =>
                                updateField("highlightTarget", e.target.value)
                              }
                            />
                          </div>
                        )}
                    </div>
                  </FormStep>
                  {/* 6. STYLE / EFFECTS */}
                  <FormStep
                    step={6}
                    currentStep={currentStep}
                    title="Style / Effects"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DashboardDropdown
                        label="Visual Style"
                        field="style"
                        options={Generated_Form_Options.style}
                      />
                      <DashboardDropdown
                        label="Effects Level"
                        field="effectsLevel"
                        options={Generated_Form_Options.effectsLevel}
                      />
                      <DashboardDropdown
                        label="Background"
                        field="backgroundType"
                        options={Generated_Form_Options.backgroundType}
                      />
                      <DashboardDropdown
                        label="Background Style"
                        field="backgroundStyle"
                        options={Generated_Form_Options.backgroundStyle}
                      />
                      <div className="md:col-span-2">
                        <DashboardDropdown
                          label="Color Mode"
                          field="colorMode"
                          options={Generated_Form_Options.colorMode}
                        />
                      </div>
                    </div>
                  </FormStep>
                  {/* STICKY FOOTER */}
                  <div className="sticky  bottom-10  flex justify-center pointer-events-none z-100   ">
                    <motion.div
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-white border-2 border-black p-3 md:p-4 rounded-3xl  flex items-center gap-4 md:gap-8 pointer-events-auto max-w-2xl w-full italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
                        className="cursor-pointer max-w-fit px-10"
                      >
                        {isGenerating ? "Synthesizing..." : "Render Concept"}
                      </MainButton>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <DashboardPreview />
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
