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
} from "lucide-react";
import { MainButton } from "./Buttons";
import DashboardPreview from "./DashboardPreview";
import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType, thumpnailPayload } from "@/src/types/dashboard.type";
import DashboardSideBar from "./DashboardSideBar";
import { DashboardCard } from "./DashboardCard";
import {
  ActionResponse,
  generateThumnailAction,
} from "@/src/actions/dashboard.actions";

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
                  className="absolute inset-0 z-0 opacity-[0.05]"
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
                  className="max-w-3xl mx-auto py-6 px-4 md:px-6 relative flex flex-col "
                >
                  {/* JUST CALL IT ONCE */}
                  <DashboardCard
                    currentIndex={currentCardIndex}
                    onIndexChange={setCurrentCardIndex}
                  />

                  <div className="sticky bottom-6 left-0 right-0 flex justify-center pointer-events-none z-100 px-4">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="bg-white border-2 border-black p-3 md:p-4 rounded-3xl flex items-center gap-4 md:gap-8 pointer-events-auto max-w-2xl w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex-1 pl-2 md:pl-4">
                        <p className="text-[9px] md:text-[12px] whitespace-nowrap font-black uppercase text-black tracking-widest mb-1">
                          Readiness Target
                        </p>
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-xs md:text-lg font-black italic">
                            {completionPercentage}%
                          </span>
                          <div className="flex-1 h-1.5 md:h-2  bg-gray-300 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-blue-400"
                              animate={{ width: `${completionPercentage}%` }}
                              transition={{ ease: "easeInOut", duration: 0.5 }}
                            />
                          </div>
                        </div>
                      </div>
                      <MainButton
                        onClick={handleGenerate}
                        disabled={completionPercentage < 100}
                        variant="blue"
                        className="max-w-fit  px-2 md:px-6  cursor-pointer "
                      >
                        {Ispending ? "Synthesizing..." : "Render Concept"}
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
