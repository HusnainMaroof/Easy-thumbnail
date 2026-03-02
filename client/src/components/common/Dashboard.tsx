"use client";
import { Crown, LucideIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Sparkles,
  User,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  Zap,
  Target,
  Smile,
  Palette,
  ChevronDown,
  MousePointer2,
  Type,
  Box,
  Focus,
  Download,
  Share2,
  Info,
  History,
  Lightbulb,
  Settings2,
  Play,
} from "lucide-react";
import { MainButton } from "./Buttons";
import DashboardDropdown from "./DashboardDropdown";
import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType } from "@/src/types/dashboard.type";

const Dashboard = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const [activeTab, setActiveTab] = useState("generate"); // 'generate' | 'preview'

  const updateField = <K extends keyof GenrateFormType>(
    field: K,
    value: GenrateFormType[K],
  ) => {
    setGenerateForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-black font-sans selection:bg-[#F4E041] selection:text-black">
      {/* Navigation */}
   

      <main className="max-w-400 mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Side */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1 & 2: Core Context */}
            <section className="bg-white border-4 border-black rounded-4xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-black text-white text-[12px] font-black px-2.5 py-1 rounded-lg">
                  01
                </span>
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Core Context
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DashboardDropdown<GenrateFormType, "platform">
                  label="Platform"
                  field="platform"
                  value={generateForm.platform}
                  onChange={updateField}
                  options={[
                    { label: "YouTube (16:9)", value: "youtube" },
                    { label: "TikTok (9:16)", value: "tiktok" },
                    { label: "Instagram (1:1)", value: "instagram" },
                  ]}
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-black uppercase tracking-[0.2em] ml-1 block">
                    2. Video Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter viral title..."
                      value={generateForm.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      className="w-full border-4 border-black rounded-xl p-4 font-bold text-sm bg-gray-50 focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all outline-none"
                    />
                    <button
                      onClick={() =>
                        updateField("aiHook", !generateForm.aiHook)
                      }
                      className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 border-2 border-black rounded-lg text-[10px] font-black uppercase transition-all
                        ${generateForm.aiHook ? "bg-[#B197FC] text-white shadow-[2px_2px_0px_0px_#000]" : "bg-white text-black"}`}
                    >
                      <Sparkles size={14} /> AI
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 3, 4, 5: Creative Direction */}
            <section className="bg-white border-4 border-black rounded-[2.5rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-black text-white text-[12px] font-black px-2.5 py-1 rounded-lg">
                  02
                </span>
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Creative Direction
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardDropdown<GenrateFormType, "niche">
                  label="Niche"
                  field="niche"
                  value={generateForm.niche}
                  onChange={updateField}
                  options={[
                    { label: "Gaming", value: "gaming" },
                    { label: "Finance", value: "finance" },
                    { label: "Tech", value: "tech" },
                    { label: "Vlog", value: "vlog" },
                  ]}
                />
                <DashboardDropdown<GenrateFormType, "emotion">
                  label="Emotion"
                  field="emotion"
                  value={generateForm.emotion}
                  onChange={updateField}
                  options={[
                    { label: "Shock", value: "shock" },
                    { label: "Curiosity", value: "curiosity" },
                    { label: "Fear", value: "fear" },
                  ]}
                />
                <DashboardDropdown<GenrateFormType, "style">
                  label="Style"
                  field="style"
                  value={generateForm.style}
                  onChange={updateField}
                  options={[
                    { label: "Viral Energy", value: "viral" },
                    { label: "Clean News", value: "news" },
                  ]}
                />
              </div>
            </section>

            {/* 6, 7, 8: Subject Control */}
            <section className="bg-white border-4 border-black rounded-[2.5rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-black text-white text-[12px] font-black px-2.5 py-1 rounded-lg">
                  03
                </span>
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Subject & Typography
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardDropdown<GenrateFormType, "subjectType">
                  label="Subject"
                  field="subjectType"
                  value={generateForm.subjectType}
                  onChange={updateField}
                  options={[
                    { label: "Upload Face", value: "upload" },
                    { label: "AI Character", value: "ai" },
                    { label: "No Person", value: "none" },
                  ]}
                />
                <DashboardDropdown<GenrateFormType, "placement">
                  label="7. Placement"
                  field="placement"
                  value={generateForm.placement}
                  onChange={updateField}
                  options={[
                    { label: "Left", value: "left" },
                    { label: "Right", value: "right" },
                    { label: "Center", value: "center" },
                    { label: "Auto", value: "auto" },
                  ]}
                />
                <DashboardDropdown<GenrateFormType, "textIntensity">
                  label="8. Text Intensity"
                  field="textIntensity"
                  value={generateForm.textIntensity}
                  onChange={updateField}
                  options={[
                    { label: "Minimal (1-2 Words)", value: "minimal" },
                    { label: "Bold (3-4 Words)", value: "bold" },
                    { label: "Aggressive (Huge)", value: "aggressive" },
                  ]}
                />
              </div>
            </section>

            {/* 9, 10: Environmental Logic */}
            <section className="bg-white border-4 border-black rounded-[2.5rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-black text-white text-[12px] font-black px-2.5 py-1 rounded-lg">
                  04
                </span>
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-zinc-500">
                  Environmental Logic
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DashboardDropdown<GenrateFormType, "highlight">
                  label="9. Highlight Object"
                  field="highlight"
                  value={generateForm.highlight}
                  onChange={updateField}
                  options={[
                    { label: "Money", value: "money" },
                    { label: "Laptop", value: "laptop" },
                    { label: "Graph", value: "graph" },
                    { label: "Game Item", value: "game-item" },
                    { label: "Arrow/Circle", value: "arrow-circle" },
                    { label: "None", value: "none" },
                  ]}
                />
                <DashboardDropdown<GenrateFormType, "background">
                  label="10. Background"
                  field="background"
                  value={generateForm.background}
                  onChange={updateField}
                  options={[
                    { label: "Solid Color", value: "solid" },
                    { label: "Gradient", value: "gradient" },
                    { label: "Blur Scene", value: "blur" },
                    { label: "Real Environment", value: "real" },
                    { label: "Abstract Shapes", value: "abstract" },
                  ]}
                />
              </div>
            </section>

            <div className="pt-6">
              <MainButton className="w-full py-6! text-lg!" variant="yellow">
                Generate Smart Layout <Sparkles className="ml-2" />
              </MainButton>
            </div>
          </div>

         
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 0px; border: 2px solid #fff; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f0f0f0; }
      `,
        }}
      />
    </div>
  );
};

export default Dashboard;
