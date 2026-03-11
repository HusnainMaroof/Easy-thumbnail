"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useActionState,
  startTransition,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  User,
  PanelLeftClose,
  PanelLeft,
  X,
  Wand2,
  ArrowRight,
  Sparkles,
  Zap,
  LayoutDashboard,
} from "lucide-react";
import { MainButton } from "./Buttons";
import DashboardPreview from "./DashboardPreview";
import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType, thumpnailPayload } from "@/src/types/dashboard.type";
import { DashboardCard } from "./DashboardCard";
import {
  ActionResponse,
  generateThumnailAction,
} from "@/src/actions/dashboard.actions";
import { FloatingWorkspaceToolbar } from "./DashboardTool";

const Dashboard = () => {
  const initialState: ActionResponse = {
    success: false,
    error: false,
    message: null,
    data: null,
  };

  const [state, dispatcher, Ispending] = useActionState<
    ActionResponse,
    thumpnailPayload
  >(generateThumnailAction, initialState);

  const {
    dashboardActiveTab,
    setDashboardActiveTab,
    dashboardSideBar,
    setDashboardSideBar,
    generateForm,
    setThumnail,
    setGenerateForm,
    user,
  } = useAuthContext();

  // Default closed on mobile

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setDashboardSideBar(true);
      else setDashboardSideBar(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setDashboardSideBar]);

  const requiredFields: (keyof GenrateFormType)[] = [
    "platform",
    "title",
    "category",
    "thumbnailStory",
    "hookType",
    "desiredEmotion",
    "visualContrastType",
    "subjectSource",
    "cameraFraming",
    "viewerFocus",
    "visualEnergy",
    "thumbnailStyle",
    "backgroundScene",
    "sceneComplexity",
    "highlightType",
    "thumbnailText",
    "colorMode",
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
    // console.log(generateForm);
    const thumbnailPrompt = `
You are a world-class social media thumbnail designer who understands click psychology, cinematic composition, and high-CTR thumbnails.

Your task is to generate a highly clickable thumbnail.

THUMBNAIL SPECIFICATIONS
Platform: ${generateForm.platform}
Aspect Ratio: ${generateForm.aspectRatio}
Style: ${generateForm.thumbnailStyle}
Visual Energy: ${generateForm.visualEnergy}
Scene Complexity: ${generateForm.sceneComplexity}

VIDEO CONTEXT
Title: ${generateForm.title}
Category: ${generateForm.category}
Story Context: ${generateForm.thumbnailStory}

VISUAL STORY
Create a cinematic scene that visually represents the topic rather than repeating the title literally.

MAIN SUBJECTS
People Count: ${generateForm.peopleCount}
Subject Source: ${generateForm.subjectSource}
Facial Emotion Level: ${generateForm.facialEmotionLevel}
Camera Framing: ${generateForm.cameraFraming}

OBJECTS TO INCLUDE
Main Object: ${generateForm.mainObject}
Highlighted Objects: ${generateForm.highlightTarget}

BACKGROUND
Scene Environment: ${generateForm.backgroundScene}
Viewer Focus Area: ${generateForm.viewerFocus}

VISUAL CONTRAST
Contrast Type: ${generateForm.visualContrastType}
Contrast Target: ${generateForm.contrastTarget}
Comparison Target: ${generateForm.comparisonTarget}

EMOTIONAL HOOK
Hook Type: ${generateForm.hookType}
Desired Viewer Emotion: ${generateForm.desiredEmotion}

EXTRA CREATIVE DIRECTION
${generateForm.extraPrompt}

TEXT OVERLAY
Thumbnail Text: "${generateForm.thumbnailText}"
Text Style: ${generateForm.textStyle}

COLOR & BRANDING
Color Mode: ${generateForm.colorMode}
Primary Brand Color: ${generateForm.brandPrimaryColor}
Secondary Brand Color: ${generateForm.brandSecondaryColor}

DESIGN RULES
• Faces must be large and expressive
• High contrast lighting
• Strong cinematic composition
• Important objects highlighted clearly
• Easy to understand even at small size
• Balanced layout
• No overlapping elements

NEGATIVE RULES
Avoid: ${generateForm.avoidElements}

OUTPUT
Create a dramatic, cinematic, high-contrast thumbnail optimized for maximum click-through rate on ${generateForm.platform}.
`;
    console.log(thumbnailPrompt);

    // startTransition(() => {
    //   dispatcher({ prompt, aspect_ratio: generateForm.aspectRatio });
    // });
  };

  useEffect(() => {
    if (state.error) {
      console.log(state.data);
    }

    if (state.success && state.message === "thumnail generated") {
      setDashboardActiveTab("review");
      setThumnail(state.data);
    }
  }, [state]);
  return (
    <div className="h-[90vh] bg-[#FDFDFF] text-black font-sans selection:bg-[#F4E041] flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
      {/* Top Workspace Header (Replaces Sidebar Toggle) */}
      <div className="flex items-center justify-between place  md:px-8   relative z-50  w-full!">
        {/* Left: Project Branding */}
        <div className="flex items-center  gap-4 bg">
          <div className="p-2 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] bg-[#F4E041]">
            <LayoutDashboard
              size={20}
              strokeWidth={2.5}
              className="text-black"
            />
          </div>
          <div className=" flex-col hidden sm:flex">
            <span className="font-black tracking-widest text-xs uppercase leading-tight">
              Workspace
            </span>
            <span className="font-bold text-[9px] text-zinc-400 uppercase tracking-widest leading-tight">
              Unsaved Project
            </span>
          </div>
        </div>

        {/* Center: Generator/Review Toggle */}
        <div className="flex bg-zinc-100 p-1.5 rounded-xl border-[3px] border-black shadow-inner jus">
          <button
            onClick={() => setDashboardActiveTab("generate")}
            className={`px-4 md:px-8 py-2 font-black cursor-pointer uppercase text-[10px] md:text-xs rounded-lg transition-all ${dashboardActiveTab === "generate" ? "bg-white text-black shadow-sm border border-zinc-200" : "text-zinc-500 hover:text-black"}`}
          >
            Generate
          </button>
          <button
            onClick={() => setDashboardActiveTab("review")}
            className={`px-4 md:px-8 py-2 font-black cursor-pointer uppercase text-[10px] md:text-xs rounded-lg transition-all ${dashboardActiveTab === "review" ? "bg-white text-black shadow-sm border border-zinc-200" : "text-zinc-500 hover:text-black"}`}
          >
            Review
          </button>
        </div>

        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#F4E041] border-[3px] border-black rounded-xl shadow-[2px_2px_0px_0px_#000] cursor-pointer"
        >
          <Zap size={16} strokeWidth={3} className="text-black" />
          <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">
            {user?.credits} Credits
          </span>
        </motion.div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 overflow-y-auto  custom-scrollbar relative rounded-2xl00">
        {/* Background Grid Pattern */}

        {/* Floating Command Palette (Desktop Only) */}
        <FloatingWorkspaceToolbar />

        <AnimatePresence mode="wait">
          {dashboardActiveTab === "generate" ? (
            <div className="min-h-full relative flex flex-col items-center ">
              <motion.div
                key="generate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-3xl mx-auto py-8 md:py-10 px-4 md:px-6 relative flex flex-col pb-24"
              >
                <DashboardCard
                  currentIndex={currentCardIndex}
                  onIndexChange={setCurrentCardIndex}
                  completionPercentage={completionPercentage}
                  handleGenerate={handleGenerate}
                  isGeneratingImage={Ispending}
                />
              </motion.div>
            </div>
          ) : (
            <DashboardPreview />
          )}
        </AnimatePresence>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4D4D8; border-radius: 10px; } 
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #A1A1AA; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
};

export default Dashboard;
