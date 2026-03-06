export type GenrateFormType = {
  // STEP 1 — Platform
  platform: string;
  aspectRatio: string;
  thumbnailPreset: string;

  // STEP 2 — Video Topic
  title: string;
  category: string;
  thumbnailStory: string;
  extraPrompt: string;

  // STEP 3 — Click Hook
  hookType: string;
  desiredEmotion: string;
  visualContrastType: string;
  contrastTarget: string;

  // STEP 4 — Subject
  subjectSource: string;
  peopleCount: string;
  mainObject: string;
  facialEmotionLevel: string;
  cameraFraming: string;
  uploadedImage: File | null;

  // STEP 5 — Focus
  viewerFocus: string;
  comparisonTarget: string;
  visualEnergy: string;

  // STEP 6 — Style
  thumbnailStyle: string;
  backgroundScene: string;
  sceneComplexity: string;
  avoidElements: string;

  // STEP 7 — Highlight
  highlightType: string;
  highlightTarget: string;

  // STEP 8 — Text
  thumbnailText: string;
  textStyle: string;

  // STEP 9 — Colors
  colorMode: string;
  brandPrimaryColor: string;
  brandSecondaryColor: string;

  // AI Logic
  aiAutoAdjust: boolean;
};

export const Generated_Form_Options = {
  // STEP 2
  category: [
    { label: "Technology", value: "technology" },
    { label: "Gaming", value: "gaming" },
    { label: "Finance", value: "finance" },
    { label: "Education", value: "education" },
    { label: "Fitness", value: "fitness" },
    { label: "Business", value: "business" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Lifestyle", value: "lifestyle" },
  ],
  hookType: [
    { label: "Curiosity Gap", value: "curiosity" },
    { label: "Warning / Mistake", value: "warning" },
    { label: "Big Promise / Solution", value: "promise" },
    { label: "Before & After", value: "before-after" },
    { label: "Secret Revealed", value: "secret" },
    { label: "Emotional Story", value: "story" },
  ],
  desiredEmotion: [
    { label: "Shock", value: "shock" },
    { label: "Curiosity", value: "curiosity" },
    { label: "Excitement", value: "excitement" },
    { label: "Fear", value: "fear" },
    { label: "Confidence", value: "confidence" },
    { label: "Inspiration", value: "inspiration" },
  ],
  visualContrastType: [
    { label: "None", value: "none" },
    { label: "Before vs After", value: "before-vs-after" },
    { label: "Small vs Giant", value: "small-vs-giant" },
    { label: "Rich vs Poor", value: "rich-vs-poor" },
    { label: "Old vs New", value: "old-vs-new" },
    { label: "Human vs AI", value: "human-vs-ai" },
    { label: "Safe vs Dangerous", value: "safe-vs-dangerous" },
    { label: "Good vs Evil", value: "good-vs-evil" },
  ],
  subjectSource: [
    { label: "My Face (Upload Photo)", value: "user-upload" },
    { label: "AI Generated Person", value: "ai-generated" },
    { label: "Stock Subject", value: "stock" },
    { label: "No Person (Object/Text Only)", value: "none" },
  ],
  peopleCount: [
    { label: "0 (No People)", value: "0" },
    { label: "1 Person", value: "1" },
    { label: "2 People", value: "2" },
    { label: "Group (3+)", value: "group" },
  ],
  mainObject: [
    { label: "None", value: "" },
    { label: "Laptop", value: "laptop" },
    { label: "Smartphone / iPhone", value: "smartphone" },
    { label: "AI Robot", value: "ai-robot" },
    { label: "Money Stack", value: "money" },
    { label: "Gaming Controller", value: "controller" },
  ],
  facialEmotionLevel: [
    { label: "Natural", value: "natural" },
    { label: "Expressive", value: "expressive" },
    { label: "YouTuber Style", value: "youtuber" },
    { label: "Extreme Reaction", value: "extreme" },
  ],
  cameraFraming: [
    { label: "Close-up face", value: "close-up" },
    { label: "Half body", value: "half-body" },
    { label: "Full body", value: "full-body" },
    { label: "Object close-up", value: "object-close-up" },
    { label: "Split screen", value: "split-screen" },
  ],
  viewerFocus: [
    { label: "Subject's Face / Emotion", value: "face" },
    { label: "Specific Object / Prop", value: "object" },
    { label: "The Bold Text", value: "text" },
    { label: "The Environment / Scenery", value: "background" },
    { label: "Split Comparison (50/50)", value: "split" },
  ],
  visualEnergy: [
    { label: "Low (Minimal Clean)", value: "low" },
    { label: "Medium (Balanced)", value: "medium" },
    { label: "High (YouTube Style)", value: "high" },
    { label: "Extreme (MrBeast Style)", value: "extreme" },
  ],
  thumbnailStyle: [
    { label: "MrBeast Style", value: "mrbeast" },
    { label: "Clean Tech", value: "clean-tech" },
    { label: "Cinematic", value: "cinematic" },
    { label: "Gaming", value: "gaming" },
    { label: "Documentary", value: "documentary" },
    { label: "Meme Style", value: "meme" },
    { label: "Minimalist", value: "minimalist" },
  ],
  backgroundScene: [
    { label: "Studio", value: "studio" },
    { label: "Gaming room", value: "gaming-room" },
    { label: "Tech workspace", value: "tech-workspace" },
    { label: "Futuristic AI lab", value: "ai-lab" },
    { label: "City", value: "city" },
    { label: "Explosion / Chaos", value: "chaos" },
    { label: "Minimal solid color", value: "minimal-color" },
  ],
  sceneComplexity: [
    { label: "Minimal", value: "minimal" },
    { label: "Balanced", value: "balanced" },
    { label: "Busy / MrBeast style", value: "busy" },
  ],
  highlightType: [
    { label: "None", value: "none" },
    { label: "Arrow", value: "arrow" },
    { label: "Circle", value: "circle" },
    { label: "Glow", value: "glow" },
    { label: "Lightning", value: "lightning" },
    { label: "Fire", value: "fire" },
  ],
  textStyle: [
    { label: "Clean", value: "clean" },
    { label: "Bold", value: "bold" },
    { label: "None", value: "" },
  ],
  colorMode: [
    { label: "Bright YouTube", value: "bright" },
    { label: "Dark Cinematic", value: "dark" },
    { label: "Neon Tech", value: "neon" },
    { label: "Warm Emotional", value: "warm" },
    { label: "Brand Colors", value: "brand-colors" },
  ],
};

export interface thumpnailPayload {
  prompt: string;
  aspect_ratio: string;
}
