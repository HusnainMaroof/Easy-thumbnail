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
  const handlePlatformClick = (platformId: string) => {
    updateField("platform", platformId);
    if (platformId === "youtube") updateField("aspectRatio", "16:9");
    if (platformId === "tiktok") updateField("aspectRatio", "9:16");
    if (platformId === "instagram") updateField("aspectRatio", "1:1");
  };

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
    console.log(generateForm);
    let prompt = "s"
    
    //     const prompt = `You are a world-class social media thumbnail designer and visual marketing strategist.

    // Your task is to create a HIGH-CONVERSION, platform-optimized thumbnail image.

    // ==================================================
    // PLATFORM & FORMAT
    // ==================================================

    // Platform: ${generateForm.platform}
    // Aspect Ratio: ${generateForm.aspectRatio}

    // ${
    //   generateForm.platform === "youtube"
    //     ? `
    // Platform is YouTube:
    // - Optimize for homepage CTR competition
    // - Thumbnail must be readable at very small mobile size
    // - Limit visible text to maximum 3–4 powerful words
    // - Use dramatic emotion and bold contrast
    // `
    //     : ""
    // }

    // ${
    //   generateForm.platform === "instagram"
    //     ? `
    // Platform is Instagram:
    // - Optimize for aesthetic scroll appeal
    // - Maintain modern, premium, clean composition
    // - Text must feel integrated and not overpowering
    // - Focus on brand harmony and visual balance
    // `
    //     : ""
    // }

    // ${
    //   generateForm.platform === "tiktok"
    //     ? `
    // Platform is TikTok:
    // - Optimize for vertical dominance (9:16)
    // - Ensure bold central composition
    // - Text must be large and instantly readable
    // - Emotion should be strong and exaggerated
    // `
    //     : ""
    // }

    // ==================================================
    // CONTENT FOUNDATION
    // ==================================================

    // Niche: ${generateForm.niche}
    // Content Type: ${generateForm.contentType}
    // Title Context Or Hook: ${generateForm.title}
    // Goal of Thumbnail: ${generateForm.goal}
    // Target Audience Level: ${generateForm.audienceLevel}

    // Create a visual concept that supports this goal clearly and instantly.

    // ==================================================
    // PSYCHOLOGICAL TRIGGER STRATEGY
    // ==================================================

    // Primary Emotion to Trigger: ${generateForm.emotion}
    // Hook Type: ${generateForm.hookType}
    // Expression Intensity Level: ${generateForm.expressionLevel}
    // Facial Emotion: ${generateForm.facialEmotion}

    // Emotion must be visually obvious even at small screen sizes.
    // Exaggerate slightly for clarity if needed.

    // ==================================================
    // SUBJECT & FRAMING
    // ==================================================

    // Subject Source: ${generateForm.subjectSource}
    // Subject Presence: ${generateForm.subjectPresence}
    // Face Framing: ${generateForm.faceFraming}
    // Placement in Frame: ${generateForm.placement}
    // Composition Style: ${generateForm.composition}

    // Ensure strong subject-background separation.
    // Maintain clear visual hierarchy.

    // ==================================================
    // TEXT & TYPOGRAPHY STRATEGY
    // ==================================================

    // Text Density: ${generateForm.textDensity}
    // Text Style: ${generateForm.textStyle}
    // Number Style: ${generateForm.numberStyle}
    // Highlight Type: ${generateForm.highlightType}
    // Highlight Target: ${generateForm.highlightTarget}

    // Text must be:
    // - High contrast
    // - Bold and readable
    // - Clean and uncluttered
    // - Optimized for small mobile preview

    // If textDensity is low:
    // Use 1–3 impactful words only.

    // ==================================================
    // VISUAL STYLE & COMPLEXITY
    // ==================================================

    // Overall Style: ${generateForm.style}
    // Visual Complexity: ${generateForm.visualComplexity}
    // Effects Level: ${generateForm.effectsLevel}

    // Avoid clutter.
    // Maintain strong focus on subject.
    // Use depth of field where appropriate.

    // ==================================================
    // BACKGROUND DESIGN
    // ==================================================

    // Background Type: ${generateForm.backgroundType}
    // Background Style: ${generateForm.backgroundStyle}

    // Background must not overpower subject.
    // Use blur or gradient if needed to enhance contrast.

    // ==================================================
    // COLOR STRATEGY
    // ==================================================

    // Color Mode: ${generateForm.colorMode}
    // Contrast Goal: ${generateForm.contrastGoal}
    // Primary Brand Color: ${generateForm.brandPrimaryColor}
    // Secondary Brand Color: ${generateForm.brandSecondaryColor}

    // Ensure strong color contrast between:
    // - Text and background
    // - Subject and background

    // ==================================================
    // RESTRICTIONS
    // ==================================================

    // Avoid these elements:
    // ${generateForm.avoidElements?.join(", ")}

    // ==================================================
    // AUTO-OPTIMIZATION
    // ==================================================

    // If aiAutoAdjust is true:
    // - Increase contrast slightly
    // - Enhance emotional clarity
    // - Reduce unnecessary elements
    // - Improve lighting for dramatic effect
    // - Ensure mobile readability

    // ==================================================
    // EXTRA CREATIVE INSTRUCTIONS
    // ==================================================

    // Additional Prompt Context:
    // ${generateForm.extraPrompt}

    // ==================================================
    // FINAL OUTPUT REQUIREMENTS
    // ==================================================

    // Generate a detailed, cinematic visual description optimized for AI image generation.

    // Be extremely specific about:
    // - Camera angle
    // - Lighting direction and intensity
    // - Facial expression details
    // - Text placement
    // - Color contrast
    // - Emotional intensity
    // - Depth and focus

    // Do NOT explain your reasoning.
    // Return only the final image generation description.
    // `;

    console.log(prompt);

    startTransition(() => {
      dispatcher({ prompt, aspect_ratio: generateForm.aspectRatio });
    });
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
                  className="max-w-3xl mx-auto py-6 px-4 md:px-6 relative flex flex-col min-h-[80vh]"
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
                        <p className="text-[12px] md:text-[9px] font-black uppercase text-black tracking-widest mb-1">
                          Readiness Target
                        </p>
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="text-lg! md:text-xs font-black italic">
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
                        // disabled={completionPercentage < 100}
                        variant="blue"
                        className="max-w-fit px-6 cursor-pointer "
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
