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
  GalleryHorizontal,
  GalleryHorizontalEnd,
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
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { is } from "zod/v4/locales";
import { set } from "zod";

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
    setUser,
  } = useAuthContext();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const toastId = useRef<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
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
    "hookType",
    "subjectSource",
    "cameraFraming",
    "thumbnailStyle",
    "backgroundScene",
    "colorMode",
  ];

  const filledFields = requiredFields.filter(
    (field) => generateForm[field] !== "",
  ).length;
  const completionPercentage = Math.round(
    (filledFields / requiredFields.length) * 100,
  );
  // const completionPercentage = 100; // For testing purposes, set to 100% to enable the button

  const handleGenerate = () => {
    setIsGeneratingImage(true);
    console.log(generateForm);
    toastId.current = toast.loading("Generating thumbnail...");
    const prompt = `
MASTER DIRECTIVE:
You are a world-class, multi-million subscriber YouTube thumbnail designer and behavioral psychologist. Your singular goal is to generate a hyper-optimized, ultra-high CTR (Click-Through Rate) thumbnail image that immediately arrests the viewer's attention and stops them from scrolling on ${generateForm.platform || "social media"}.

CORE VISUAL SCENE:
Primary Topic: ${generateForm.title}
Niche Context: ${generateForm.category}
The Action / Story: ${generateForm.thumbnailStory}
${generateForm.extraPrompt ? `Additional Details: ${generateForm.extraPrompt}` : ""}

COMPOSITION & SUBJECT:
Camera Angle & Framing: ${generateForm.cameraFraming}. Utilize the rule of thirds for cinematic balance.
Subjects: ${generateForm.subjectSource === "none" ? "Focus purely on the environment and objects. NO people." : `${generateForm.peopleCount} highly expressive, hyper-detailed human subject(s).`}
Main Prop/Object: ${generateForm.mainObject ? generateForm.mainObject : "Relevant contextual object scaled up for mobile visibility"}.
Viewer Eye-Tracking Focus: Drive the viewer's immediate visual attention directly to: ${generateForm.viewerFocus}.

AESTHETICS & LIGHTING:
Overall Art Style: ${generateForm.thumbnailStyle}. 
Energy Level: ${generateForm.visualEnergy}.
Background Environment: ${generateForm.backgroundScene}. Apply a slight depth-of-field bokeh blur to separate the foreground subject from the background.
Color Grading & Mood: ${generateForm.colorMode}. Use striking complementary colors, high contrast, and rim lighting to create massive visual pop.

PSYCHOLOGICAL HOOK & HIGHLIGHTS:
Click Strategy: ${generateForm.hookType}. The image must visually invoke this specific psychological trigger without needing a voiceover.
${generateForm.highlightType !== "none" && generateForm.highlightTarget ? `Visual Highlight: Render a striking ${generateForm.highlightType} drawing massive attention to the ${generateForm.highlightTarget}.` : ""}

${
  generateForm.thumbnailText
    ? `TYPOGRAPHY / TEXT OVERLAY:
Include the following exact text rendered in massive, bold, highly legible, high-contrast 3D sans-serif font: "${generateForm.thumbnailText}".
Text Placement: Strictly position this text in the ${generateForm.textPlacement || "empty space"} area of the image. Do not cover the main focal point.`
    : "STRICT RULE: DO NOT INCLUDE ANY TEXT, LETTERS, OR WORDS IN THIS IMAGE."
}

STRICT NEGATIVE CONSTRAINTS:
Avoid visual clutter, flat lighting, dull grayscale colors, low contrast, and overly complex details that fail on small mobile screens. ${generateForm.avoidElements ? `Specifically avoid rendering: ${generateForm.avoidElements}.` : ""}

FINAL RENDER QUALITY:
Output in masterpiece quality, 8k resolution, cinematic studio lighting, razor-sharp foreground focus, hyper-detailed textures, and vibrant color saturation perfectly optimized for mobile screen viewing.
    `.trim();

    startTransition(() => {
      dispatcher({ prompt, ThumbnailConfig: generateForm });
    });
  };

  useEffect(() => {
    if (state.error) {
      toast.error(state.message);
      console.log(state.data);
      setIsGeneratingImage(false);
      toast.dismiss(toastId.current!);
    }

    if (state.success && state.message === "thumnail generated") {
      setDashboardActiveTab("review");

      if (state.data?.imgUrl!) {
        setThumnail(state.data.imgUrl!);
      }
      setUser(state.data?.userData!);
      setIsGeneratingImage(false);
      toast.dismiss(toastId.current!);
      toast.success("Thumbnail generated successfully!");
    }
  }, [state]);

  // console.log("USERdATA from dashboard", user);

  return (
    <div className="h-[90vh] bg-[#FDFDFF] text-black font-sans selection:bg-[#F4E041] flex flex-col overflow-hidden ">
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="flex items-center justify-between place  px-4 md:px-8   relative z-50  w-full!">
        {/* Left: Project Branding */}
        <div
          onClick={() => {
            redirect("/dashboard/gallery");
          }}
          className="md:flex items-center  gap-2 bg hidden cursor-pointer"
        >
          <div className="p-2 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] bg-blue-300 cursor-pointer">
            <GalleryHorizontalEnd
              size={20}
              strokeWidth={2.5}
              className="text-black"
            />
          </div>
          <div className=" flex-col hidden md:flex font-black tracking-widest text-sm uppercase leading-tight underline">
            Gallery
          </div>
        </div>

        {/* Center: Generator/Review Toggle */}
        <div className="flex bg-zinc-100 p-1.5 rounded-xl border-[3px] border-black shadow-inner ">
          <button
            onClick={() => setDashboardActiveTab("generate")}
            className={`px-2 md:px-8 py-1 font-black cursor-pointer uppercase text-[10px] md:text-xs rounded-lg transition-all ${dashboardActiveTab === "generate" ? "bg-white text-black shadow-sm border border-zinc-200" : "text-zinc-500 hover:text-black"}`}
          >
            Generate
          </button>
          <button
            onClick={() => setDashboardActiveTab("review")}
            className={`px-2 md:px-8 py-1 font-black cursor-pointer uppercase text-[10px] md:text-xs rounded-lg transition-all ${dashboardActiveTab === "review" ? "bg-white text-black shadow-sm border border-zinc-200" : "text-zinc-500 hover:text-black"}`}
          >
            Review
          </button>
        </div>

        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-blue-300 border-[3px] border-black rounded-xl shadow-[2px_2px_0px_0px_#000] cursor-pointer"
        >
          <Zap size={16} strokeWidth={3} className="text-black" />
          <span className="font-black text-[10px] md:text-xs uppercase tracking-widest">
            {user?.credits?.toString().slice(0, 4)}Credits
          </span>
        </motion.div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 overflow-y-auto  custom-scrollbar relative rounded-2xl00">
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
                  isGeneratingImage={isGeneratingImage}
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
