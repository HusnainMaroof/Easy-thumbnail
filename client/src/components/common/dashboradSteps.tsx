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
  Loader2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType } from "@/src/types/dashboard.type";
import { DashboardDropdown, FieldLabel } from "./DashboardDropdown";
import { Generated_Form_Options } from "@/src/static data/dashboardData";
import { PhotoUploader } from "./PhotoUploader";

export const Step1Setup = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="">
      <div className="py-6">
        <div className="grid grid-cols-2  gap-3 md:gap-4 mt-2">
          {[
            { id: "youtube", label: "YouTube", icon: Monitor },
            { id: "tiktok", label: "TikTok", icon: Smartphone },
            { id: "instagram", label: "Instagram", icon: Square },
            { id: "other", label: "Other", icon: Plus },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => updateField("platform", p.id)}
              className={`group p-4 border-[3px] rounded-2xl transition-all flex flex-col items-center gap-3 cursor-pointer hover:border-black  ${
                generateForm.platform === p.id
                  ? "border-black shadow-[4px_4px_0px_0px_#000] -translate-y-1 bg-blue-300"
                  : "border-zinc-200 bg-zinc-50  hover:bg-blue-100"
              }`}
            >
              <p.icon
                size={24}
                strokeWidth={2.5}
                className={
                  generateForm.platform === p.id
                    ? "text-black"
                    : "text-zinc-400 group-hover:text-black transition-colors"
                }
              />
              <div
                className={`text-[10px] md:text-xs font-black uppercase tracking-wider ${generateForm.platform === p.id ? "text-black" : "text-zinc-500 group-hover:text-black transition-colors"}`}
              >
                {p.label}
              </div>
            </button>
          ))}
          <FieldLabel
            label="1. Target Platform"
            tooltip="We automatically size the image to perfectly fit the platform's layout limits."
          />
        </div>
      </div>
    </div>
  );
};

export const Step2Concept = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  const handleMagicBrainstorm = async () => {
    if (!generateForm.title) return;
    setIsGeneratingStory(true);
    const prompt = `You are a YouTube thumbnail expert. Describe a highly visual, eye-catching thumbnail scene for a YouTube video titled "${generateForm.title}". Category is ${generateForm.category || "general"}. Focus strictly on what is visually seen in the image. Keep it under 2 sentences. No intro/outro text.`;
    // const result = await callGemini(prompt);
    // if (result) updateField("thumbnailStory", result.replace(/"/g, ""));
    setIsGeneratingStory(false);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="e.g. I Built an AI Robot..."
          className="w-full border-[3px] border-zinc-300 hover:border-black rounded-xl p-4 font-bold text-sm md:text-base outline-none bg-white focus:border-black shadow-sm focus:shadow-[4px_4px_0px_0px_#B197FC] transition-all"
          value={generateForm.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        <FieldLabel
          label="Video Title / Main Topic"
          tooltip="The core idea of your content. We use this to understand the context."
        />
      </div>
      <DashboardDropdown
        label="Content Category"
        field="category"
        options={Generated_Form_Options.category}
        tooltip="Helps the AI choose the right visual language (e.g. Finance is serious, Gaming is loud)."
      />
      <div className="relative border-t-3  border-gray-400 pt-6 mt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-3">
          <FieldLabel
            label="Visual Story (What's happening?)"
            tooltip="Describe the literal visual scene. What are we looking at?"
          />
        </div>
        <textarea
          placeholder="e.g. A person looking shocked at a glowing AI robot on their desk..."
          className="w-full border-[3px] border-zinc-300 hover:border-black rounded-xl p-4 font-bold text-sm outline-none bg-white focus:border-black shadow-sm focus:shadow-[4px_4px_0px_0px_#000] transition-all h-24 resize-none custom-scrollbar"
          value={generateForm.thumbnailStory || ""}
          onChange={(e) => updateField("thumbnailStory", e.target.value)}
        />
      </div>
    </div>
  );
};

export const Step3Psychology = () => {
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardDropdown
          label="Psychological Hook"
          field="hookType"
          options={Generated_Form_Options.hookType}
          tooltip="The strategy to get the click. 'Curiosity' creates mystery. 'Warning' triggers fear of missing out."
        />
        <DashboardDropdown
          label="Primary Viewer Focus"
          field="viewerFocus"
          options={Generated_Form_Options.viewerFocus}
          tooltip="Where should the viewer's eye go first? (e.g. The shocked face or the glowing object?)"
        />
        <div className="md:col-span-2">
          <DashboardDropdown
            label="Visual Energy / Pacing"
            field="visualEnergy"
            options={Generated_Form_Options.visualEnergy}
            tooltip="How 'loud' the thumbnail feels. MrBeast is High energy. Apple presentations are Low energy."
          />
        </div>
      </div>
    </div>
  );
};

export const Step4Subject = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col md:col-span-2">
          <DashboardDropdown
            label="Subject Source"
            field="subjectSource"
            options={Generated_Form_Options.subjectSource}
            tooltip="Do you want to use your real face, let AI create a person, or focus only on objects?"
          />
          <AnimatePresence>
            {generateForm.subjectSource === "user-upload" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <PhotoUploader
                  value={generateForm.uploadedImage ?? null}
                  onChange={(file) =>
                    setGenerateForm((prev: any) => ({
                      ...prev,
                      uploadedImage: file,
                    }))
                  }
                  label="Upload Your Face/Reaction"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {generateForm.subjectSource !== "none" && (
          <DashboardDropdown
            label="People Count"
            field="peopleCount"
            options={Generated_Form_Options.peopleCount}
            tooltip="How many people are in the shot? Multiple people are great for vs/drama."
          />
        )}
        <DashboardDropdown
          label="Main Prop / Object"
          field="mainObject"
          options={Generated_Form_Options.mainObject}
          tooltip="The physical item the video is about (e.g. holding a phone, or a stack of cash)."
        />
        <DashboardDropdown
          label="Camera Framing"
          field="cameraFraming"
          options={Generated_Form_Options.cameraFraming}
          tooltip="How zoomed in the camera is. Close-ups are best for showing emotion."
        />
      </div>
    </div>
  );
};

export const Step5Aesthetics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <DashboardDropdown
            label="Overall Thumbnail Style"
            field="thumbnailStyle"
            options={Generated_Form_Options.thumbnailStyle}
            tooltip="The general rendering style. Determines lighting, textures, and realism."
          />
        </div>
        <DashboardDropdown
          label="Background Scene"
          field="backgroundScene"
          options={Generated_Form_Options.backgroundScene}
          tooltip="The environment behind the subject. Keep it simple if the subject is complex."
        />
        <DashboardDropdown
          label="Color Palette Mode"
          field="colorMode"
          options={Generated_Form_Options.colorMode}
          tooltip="The dominant color grading. Bright performs best on YouTube."
        />
      </div>
    </div>
  );
};

export const Step6Overlays = () => {
  const { generateForm, setGenerateForm } = useAuthContext();
  const updateField = (field: keyof GenrateFormType, value: any) =>
    setGenerateForm((prev: any) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardDropdown
          label="Highlight Effect"
          field="highlightType"
          options={Generated_Form_Options.highlightType}
          tooltip="Adds literal red arrows, circles, or glowing outlines to draw attention."
        />
        {generateForm.highlightType &&
          generateForm.highlightType !== "none" && (
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Robot, Phone Screen..."
                className="w-full border-[3px] border-zinc-300 hover:border-black rounded-xl px-4 py-4 text-xs font-black outline-none bg-white focus:border-black transition-all"
                value={generateForm.highlightTarget || ""}
                onChange={(e) => updateField("highlightTarget", e.target.value)}
              />
              <FieldLabel
                label="What to Highlight?"
                tooltip="What specific object should the arrow point to or glow surround?"
              />
            </div>
          )}
      </div>

      <div className="relative border-t-[3px] border-zinc-100 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              placeholder="e.g. THIS AI TOOL"
              className="w-full border-[3px] border-zinc-300 hover:border-black rounded-xl p-3 font-black text-lg outline-none bg-white focus:border-black shadow-sm focus:shadow-[4px_4px_0px_0px_'oklch(80.9%_0.105_251.813)'] transition-all uppercase"
              value={generateForm.thumbnailText}
              onChange={(e) => updateField("thumbnailText", e.target.value)}
              maxLength={25}
            />
            <FieldLabel
              label="Overlay Text (Keep it short!)"
              tooltip="Text rendered on top of the image. Max 4 words for readability on mobile screens."
            />
          </div>
          <div>
            <DashboardDropdown
              label="Text Placement"
              field="textPlacement"
              options={Generated_Form_Options.textPlacement}
              tooltip="Where the AI should position the text so it doesn't overlap the main subject's face."
            />
          </div>
        </div>
      </div>

      <div className="relative border-t-[3px] border-zinc-100 pt-6">
        <FieldLabel
          label="Reference Image (Optional)"
          tooltip="Upload a thumbnail you love. The AI will analyze it and copy its exact layout, lighting, and style vibe."
        />
        <PhotoUploader
          value={generateForm.referenceImage}
          onChange={(file) => updateField("referenceImage", file)}
          label="Upload Style Reference"
        />
      </div>
    </div>
  );
};
