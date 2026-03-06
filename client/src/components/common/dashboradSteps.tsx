"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Square,
  User,
  Wand2,
  ChevronDown,
  ChevronsUpDown,
  Check,
  Plus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Palette,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType } from "@/src/types/dashboard.type";
import { DashboardDropdown } from "./DashboardDropdown";
import {
  COLOR_PALETTES,
  Generated_Form_Options,
  VISUAL_PRESETS,
} from "@/src/static data/dashboardData";
import { PhotoUploader } from "./PhotoUploader";

export const Step1Platform = () => {
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
    <div className="space-y-10 pb-10">
      {/* PLATFORM SELECTION */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
            1. Select Platform
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { id: "youtube", label: "YouTube", icon: Monitor },
            { id: "tiktok", label: "TikTok", icon: Smartphone },
            { id: "instagram", label: "Instagram", icon: Square },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => handlePlatformClick(p.id)}
              className={`group p-4 md:p-6 border-2 rounded-2xl transition-all flex flex-col items-center gap-3 cursor-pointer hover:border-black ${
                generateForm.platform === p.id
                  ? "border-black shadow-[4px_4px_0px_0px_#000] -translate-y-1 bg-[#F4E041]"
                  : "border-zinc-200 bg-zinc-50 hover:bg-white"
              }`}
            >
              <p.icon
                size={26}
                strokeWidth={2.5}
                className={
                  generateForm.platform === p.id
                    ? "text-black"
                    : "text-zinc-400 group-hover:text-black transition-colors"
                }
              />
              <div
                className={`text-xs md:text-sm font-black uppercase tracking-wider ${generateForm.platform === p.id ? "text-black" : "text-zinc-500 group-hover:text-black transition-colors"}`}
              >
                {p.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* VISUAL THUMBNAIL PRESETS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-1">
            2. Creator Vibe (Optional){" "}
            <Sparkles size={10} className="text-[#B197FC]" />
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {VISUAL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => updateField("thumbnailPreset", preset.id)}
              className={`relative overflow-hidden rounded-xl border-2 transition-all p-3 text-left group cursor-pointer ${
                (generateForm as any).thumbnailPreset === preset.id // Type cast added as workaround
                  ? "border-black bg-[#B197FC] text-white shadow-[3px_3px_0px_0px_#000] -translate-y-0.5"
                  : `${preset.border} hover:border-black`
              } bg-linear-to-br ${preset.gradient}`}
            >
              <div className="flex flex-col gap-1 relative z-10">
                <span className="text-xl md:text-2xl mb-1">{preset.emoji}</span>
                <span className="text-[11px] md:text-xs font-black uppercase tracking-wider">
                  {preset.name}
                </span>
              </div>
              {/* Selection Indicator */}
              {generateForm.thumbnailPreset === preset.id && (
                <div className="absolute top-2 right-2 bg-black text-white rounded-full p-0.5 z-10">
                  <Check size={12} strokeWidth={4} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Step2VideoTopic = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6 pb-20">
      <div className="relative">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
          Video Title / Topic
        </span>
        <input
          type="text"
          placeholder="e.g. I Built an AI Robot..."
          className="w-full border-2 border-black rounded-xl p-4 font-bold text-sm md:text-base outline-none bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.05)] focus:shadow-[4px_4px_0px_0px_#B197FC] transition-all"
          value={generateForm.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <DashboardDropdown
          label="Content Category"
          field="category"
          options={Generated_Form_Options.category}
        />
      </div>

      <div className="relative">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
          Thumbnail Story (What's happening?)
        </span>
        <textarea
          placeholder="e.g. A person looking shocked at a glowing AI robot on their desk..."
          className="w-full border-2 border-zinc-300 focus:border-black rounded-xl p-4 font-bold text-sm outline-none bg-white transition-all h-24 resize-none custom-scrollbar"
          value={generateForm.thumbnailStory || ""}
          onChange={(e) => updateField("thumbnailStory", e.target.value)}
        />
      </div>

      <div className="relative">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
          Visual Details (Optional)
        </span>
        <textarea
          placeholder="e.g. Add a glowing neon outline to the subject..."
          className="w-full border-2 border-zinc-300 focus:border-black rounded-xl p-4 font-bold text-sm outline-none bg-white transition-all h-16 resize-none custom-scrollbar"
          value={generateForm.extraPrompt || ""}
          onChange={(e) => updateField("extraPrompt", e.target.value)}
        />
      </div>
    </div>
  );
};

export const Step3ClickHook = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6 pb-40">
      {" "}
      {/* pb-40 ensures space for dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardDropdown
          label="Hook Type"
          field="hookType"
          options={Generated_Form_Options.hookType}
        />
        <DashboardDropdown
          label="Desired Emotion"
          field="desiredEmotion"
          options={Generated_Form_Options.desiredEmotion}
        />

        <div className="md:col-span-2 mt-2">
          <DashboardDropdown
            label="Visual Contrast Type"
            field="visualContrastType"
            options={Generated_Form_Options.visualContrastType}
          />
        </div>

        {generateForm.visualContrastType &&
          generateForm.visualContrastType !== "none" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="md:col-span-2 relative mt-2"
            >
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
                Contrast Target (Example)
              </span>
              <input
                type="text"
                placeholder="e.g. iPhone 10 vs iPhone 16..."
                className="w-full border-2 border-zinc-400 rounded-xl px-4 py-3 text-xs font-black outline-none bg-white focus:border-black transition-all"
                value={generateForm.contrastTarget || ""}
                onChange={(e) => updateField("contrastTarget", e.target.value)}
              />
            </motion.div>
          )}
      </div>
    </div>
  );
};

export const Step4Subject = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  return (
    <div className="space-y-6 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 md:col-span-2">
          <DashboardDropdown
            label="Subject Source"
            field="subjectSource"
            options={Generated_Form_Options.subjectSource}
          />
          {generateForm.subjectSource === "user-upload" && (
            <PhotoUploader
              value={generateForm.uploadedImage ?? null}
              onChange={(file) =>
                setGenerateForm((prev: any) => ({
                  ...prev,
                  uploadedImage: file,
                }))
              }
            />
          )}
        </div>

        {generateForm.subjectSource !== "none" && (
          <>
            <DashboardDropdown
              label="People Count"
              field="peopleCount"
              options={Generated_Form_Options.peopleCount}
            />
            <DashboardDropdown
              label="Facial Emotion Level"
              field="facialEmotionLevel"
              options={Generated_Form_Options.facialEmotionLevel}
            />
          </>
        )}

        <DashboardDropdown
          label="Main Object / Prop"
          field="mainObject"
          options={Generated_Form_Options.mainObject}
        />
        <DashboardDropdown
          label="Camera Framing"
          field="cameraFraming"
          options={Generated_Form_Options.cameraFraming}
        />
      </div>
    </div>
  );
};

export const Step5Focus = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6 pb-40">
      <div className="grid grid-cols-1 gap-4">
        <DashboardDropdown
          label="Focal Point"
          field="viewerFocus"
          options={Generated_Form_Options.viewerFocus}
        />

        {generateForm.viewerFocus === "split" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="relative"
          >
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
              Comparison Target
            </span>
            <input
              type="text"
              placeholder="e.g. AI vs Human, Cheap Phone vs iPhone..."
              className="w-full border-2 border-zinc-400 rounded-xl px-4 py-3 text-xs font-black outline-none bg-white focus:border-black transition-all"
              value={generateForm.comparisonTarget || ""}
              onChange={(e) => updateField("comparisonTarget", e.target.value)}
            />
          </motion.div>
        )}

        <DashboardDropdown
          label="Visual Energy Level"
          field="visualEnergy"
          options={Generated_Form_Options.visualEnergy}
        />
      </div>
    </div>
  );
};

export const Step6Style = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <DashboardDropdown
            label="Thumbnail Style"
            field="thumbnailStyle"
            options={Generated_Form_Options.thumbnailStyle}
          />
        </div>
        <DashboardDropdown
          label="Background Scene"
          field="backgroundScene"
          options={Generated_Form_Options.backgroundScene}
        />
        <DashboardDropdown
          label="Scene Complexity"
          field="sceneComplexity"
          options={Generated_Form_Options.sceneComplexity}
        />

        <div className="md:col-span-2 relative mt-2">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
            Avoid Elements (Optional)
          </span>
          <textarea
            placeholder="e.g. No stock photos, no text clutter, avoid blurry faces..."
            className="w-full border-2 border-zinc-300 focus:border-black rounded-xl p-4 font-bold text-sm outline-none bg-white transition-all h-20 resize-none custom-scrollbar"
            value={generateForm.avoidElements || ""}
            onChange={(e) => updateField("avoidElements", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export const Step7Highlight = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6 pb-40">
      <div className="grid grid-cols-1 gap-4">
        <DashboardDropdown
          label="Highlight Element"
          field="highlightType"
          options={Generated_Form_Options.highlightType}
        />

        {generateForm.highlightType &&
          generateForm.highlightType !== "none" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="relative mt-2"
            >
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
                Highlight Target
              </span>
              <input
                type="text"
                placeholder="e.g. Robot, Phone Screen, Money Stack..."
                className="w-full border-2 border-zinc-400 rounded-xl px-4 py-3 text-xs font-black outline-none bg-white focus:border-black transition-all"
                value={generateForm.highlightTarget || ""}
                onChange={(e) => updateField("highlightTarget", e.target.value)}
              />
            </motion.div>
          )}
      </div>
    </div>
  );
};

export const Step8Text = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6 pb-40">
      <div className="relative">
        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
          Thumbnail Text (Short & Punchy)
        </span>
        <input
          type="text"
          placeholder="e.g. THIS AI TOOL"
          className="w-full border-2 border-black rounded-xl p-4 font-black text-lg outline-none bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.05)] focus:shadow-[4px_4px_0px_0px_#B197FC] transition-all uppercase"
          value={generateForm.thumbnailText}
          onChange={(e) => updateField("thumbnailText", e.target.value)}
          maxLength={25}
        />
        <div className="text-right text-[9px] font-bold text-zinc-400 mt-1 mr-1">
          {generateForm.thumbnailText?.length || 0}/25 Characters
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <DashboardDropdown
          label="Text Style (Optional)"
          field="textStyle"
          options={Generated_Form_Options.textStyle}
        />
      </div>
    </div>
  );
};

export const Step9Colors = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  const applyPalette = (p: string, s: string) => {
    updateField("brandPrimaryColor", p);
    updateField("brandSecondaryColor", s);
    updateField("colorMode", "brand-colors");
  };

  return (
    <div className="space-y-6 pb-40">
      <div className="grid grid-cols-1 gap-4">
        <DashboardDropdown
          label="Color Mode"
          field="colorMode"
          options={Generated_Form_Options.colorMode}
        />

        {/* QUICK PALETTE SELECTION */}
        <div className="mt-2">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest  mb-2 ml-1 flex items-center gap-1">
            Quick Palettes <Palette size={10} />
          </span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {COLOR_PALETTES.map((pal) => (
              <button
                key={pal.name}
                onClick={() => applyPalette(pal.p, pal.s)}
                className="p-2 border-2 border-zinc-200 rounded-xl hover:border-black flex items-center gap-2 transition-colors cursor-pointer bg-white"
              >
                <div className="flex h-5 w-5 rounded-full overflow-hidden shrink-0 border border-zinc-200">
                  <div
                    className="w-1/2 h-full"
                    style={{ backgroundColor: pal.p }}
                  />
                  <div
                    className="w-1/2 h-full"
                    style={{ backgroundColor: pal.s }}
                  />
                </div>
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-zinc-600 truncate">
                  {pal.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 p-4 border-2 border-zinc-100 rounded-2xl bg-zinc-50">
          <div className="relative">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
              Primary Color
            </span>
            <div className="flex border-2 border-zinc-300 focus-within:border-black rounded-xl overflow-hidden h-11.5 bg-white transition-all">
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
            <div className="flex border-2 border-zinc-300 focus-within:border-black rounded-xl overflow-hidden h-11.5 bg-white transition-all">
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
      </div>
    </div>
  );
};
