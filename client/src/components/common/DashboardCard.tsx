"use client";

import {
  Generated_Form_Options,
  GenrateFormType,
} from "@/src/types/dashboard.type";
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

const Step1Strategy = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  const handlePlatformClick = (platformId: string) => {
    updateField("platform", platformId);
    if (platformId === "youtube") updateField("aspectRatio", "16:9");
    if (platformId === "tiktok") updateField("aspectRatio", "9:16");
    if (platformId === "instagram") updateField("aspectRatio", "1:1");
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
          Platform
        </span>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { id: "youtube", label: "YouTube", icon: Monitor },
            { id: "tiktok", label: "TikTok", icon: Smartphone },
            { id: "instagram", label: "Instagram", icon: Square },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => handlePlatformClick(p.id)}
              className={`group p-4 border-2 rounded-xl transition-all flex flex-col items-center gap-2 cursor-pointer hover:border-black ${generateForm.platform === p.id ? "border-black shadow-[4px_4px_0px_0px_#000] -translate-y-1 bg-[#F4E041]" : "border-zinc-200 bg-white"}`}
            >
              <p.icon
                size={20}
                className={
                  generateForm.platform === p.id
                    ? "text-black"
                    : "text-zinc-500 group-hover:text-black"
                }
              />
              <div
                className={`text-xs font-black ${generateForm.platform === p.id ? "text-black" : "text-zinc-500 group-hover:text-black"}`}
              >
                {p.label}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-4">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
          Title & Hook Idea
        </span>
        <input
          type="text"
          placeholder="Enter Viral Hook / Video Title..."
          className="w-full border-2 border-black rounded-xl p-4 pr-12 font-bold text-sm outline-none bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.05)] focus:shadow-[4px_4px_0px_0px_#B197FC] transition-all"
          value={generateForm.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardDropdown
          label="Aspect Ratio"
          field="aspectRatio"
          options={Generated_Form_Options.aspectRatio}
        />
        <DashboardDropdown
          label="Niche"
          field="niche"
          options={Generated_Form_Options.niche}
        />
        <DashboardDropdown
          label="Content Type"
          field="contentType"
          options={Generated_Form_Options.contentType}
        />
        <DashboardDropdown
          label="Goal"
          field="goal"
          options={Generated_Form_Options.goal}
        />
        <DashboardDropdown
          label="Hook Type"
          field="hookType"
          options={Generated_Form_Options.hookType}
        />
        <DashboardDropdown
          label="Emotion"
          field="emotion"
          options={Generated_Form_Options.emotion}
        />
        <div className="md:col-span-2">
          <DashboardDropdown
            label="Audience Level"
            field="audienceLevel"
            options={Generated_Form_Options.audienceLevel}
          />
        </div>
      </div>
    </div>
  );
};

const Step2Subject = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <DashboardDropdown
            label="Subject Source"
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
          label="Face Framing"
          field="faceFraming"
          options={Generated_Form_Options.faceFraming}
        />
        <DashboardDropdown
          label="Facial Emotion"
          field="facialEmotion"
          options={Generated_Form_Options.facialEmotion}
        />
        <div className="md:col-span-2">
          <DashboardDropdown
            label="Expression Level"
            field="expressionLevel"
            options={Generated_Form_Options.expressionLevel}
          />
        </div>
      </div>
    </div>
  );
};

const Step3Layout = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
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
        <DashboardDropdown
          label="Text Density"
          field="textDensity"
          options={Generated_Form_Options.textDensity}
        />
        <DashboardDropdown
          label="Text Style"
          field="textStyle"
          options={Generated_Form_Options.textStyle}
        />
        <DashboardDropdown
          label="Number Style"
          field="numberStyle"
          options={Generated_Form_Options.numberStyle}
        />
        <DashboardDropdown
          label="Highlight"
          field="highlightType"
          options={Generated_Form_Options.highlightType}
        />
        {generateForm.highlightType &&
          generateForm.highlightType !== "none" && (
            <div className="md:col-span-2 relative">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
                Highlight Target
              </span>
              <input
                type="text"
                placeholder="What to highlight?"
                className="w-full border-2 border-zinc-400 rounded-xl px-4 py-3 text-xs font-black outline-none bg-white focus:border-black transition-all h-11.5"
                value={generateForm.highlightTarget || ""}
                onChange={(e) => updateField("highlightTarget", e.target.value)}
              />
            </div>
          )}
      </div>
    </div>
  );
};

const Step4Visuals = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardDropdown
          label="Visual Style"
          field="style"
          options={Generated_Form_Options.style}
        />
        <DashboardDropdown
          label="Complexity"
          field="visualComplexity"
          options={Generated_Form_Options.visualComplexity}
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
        <DashboardDropdown
          label="Color Mode"
          field="colorMode"
          options={Generated_Form_Options.colorMode}
        />
        <DashboardDropdown
          label="Contrast Goal"
          field="contrastGoal"
          options={Generated_Form_Options.contrastGoal}
        />

        {generateForm.colorMode === "brand-match" && (
          <div className="md:col-span-2 grid grid-cols-2 gap-4 mt-2">
            <div className="relative">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
                Primary Color
              </span>
              <div className="flex border-2 border-zinc-400 focus-within:border-black rounded-xl overflow-hidden h-11.5 bg-white transition-all">
                <input
                  type="color"
                  className="w-12 h-full cursor-pointer border-none outline-none p-0 bg-transparent"
                  value={generateForm.brandPrimaryColor || "#000000"}
                  onChange={(e) =>
                    updateField("brandPrimaryColor", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="w-full px-2 text-xs font-black outline-none uppercase"
                  value={generateForm.brandPrimaryColor || "#000000"}
                  onChange={(e) =>
                    updateField("brandPrimaryColor", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="relative">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
                Secondary Color
              </span>
              <div className="flex border-2 border-zinc-400 focus-within:border-black rounded-xl overflow-hidden h-11.5 bg-white transition-all">
                <input
                  type="color"
                  className="w-12 h-full cursor-pointer border-none outline-none p-0 bg-transparent"
                  value={generateForm.brandSecondaryColor || "#ffffff"}
                  onChange={(e) =>
                    updateField("brandSecondaryColor", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="w-full px-2 text-xs font-black outline-none uppercase"
                  value={generateForm.brandSecondaryColor || "#ffffff"}
                  onChange={(e) =>
                    updateField("brandSecondaryColor", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        )}

        <div className="md:col-span-2">
          <DashboardDropdown
            label="Effects Level"
            field="effectsLevel"
            options={Generated_Form_Options.effectsLevel}
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            onClick={() =>
              updateField("aiAutoAdjust", !generateForm.aiAutoAdjust)
            }
            className={`w-full p-4 border-2 rounded-xl flex items-center justify-between transition-all ${generateForm.aiAutoAdjust ? "border-[#B197FC] bg-[#B197FC]/5" : "border-zinc-200 bg-white hover:border-zinc-300"}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-2.5 rounded-lg transition-colors ${generateForm.aiAutoAdjust ? "bg-[#B197FC] text-white" : "bg-zinc-100 text-zinc-400"}`}
              >
                <Wand2 size={20} />
              </div>
              <div className="text-left">
                <div
                  className={`text-sm font-black uppercase tracking-wide transition-colors ${generateForm.aiAutoAdjust ? "text-black" : "text-zinc-600"}`}
                >
                  AI Sanity Check
                </div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">
                  Auto-resolve visual conflicts
                </div>
              </div>
            </div>
            <div
              className={`w-12 h-7 rounded-full p-1 transition-colors flex ${generateForm.aiAutoAdjust ? "bg-[#B197FC] justify-end" : "bg-zinc-200 justify-start"}`}
            >
              <motion.div
                layout
                className="w-5 h-5 rounded-full bg-white shadow-sm"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const WIZARD_STEPS = [
  { title: "Strategy & Core", component: Step1Strategy },
  { title: "Subject & Focus", component: Step2Subject },
  { title: "Layout & Text", component: Step3Layout },
  { title: "Visuals & Polish", component: Step4Visuals },
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
