export type GenrateFormType = {
  // Core
  platform: string;
  aspectRatio: string;
  title: string;
  extraPrompt?: string;

  // Strategy
  niche: string;
  contentType: string;
  emotion: string;
  goal: string;
  hookType: string;
  audienceLevel: string;

  // Subject
  subjectSource: string;
  subjectPresence: string;
  expressionLevel: string;
  facialEmotion: string;
  faceFraming: string;

  // Layout
  placement: string;
  composition: string;

  // Text
  textDensity: string;
  textStyle: string;
  numberStyle: string;

  // Highlight
  highlightType: string;
  highlightTarget?: string;

  // Visual
  style: string;
  visualComplexity: string;
  backgroundType: string;
  backgroundStyle?: string;

  // Color
  colorMode: string;
  contrastGoal: string;
  brandPrimaryColor?: string;
  brandSecondaryColor?: string;

  // Effects
  effectsLevel: string;
  avoidElements?: string[];

  // Media
  uploadedImage: File | null;
  aiAutoAdjust?: boolean;
};
export const Generated_Form_Options = {
  platform: [
    { label: "YouTube", value: "youtube" },
    { label: "TikTok", value: "tiktok" },
    { label: "Instagram", value: "instagram" },
    { label: "None", value: "" },
  ],
  niche: [
    { label: "Gaming", value: "gaming" },
    { label: "Finance", value: "finance" },
    { label: "Technology", value: "technology" },
    { label: "Business", value: "business" },
    { label: "Entrepreneurship", value: "entrepreneurship" },
    { label: "Programming", value: "programming" },
    { label: "AI", value: "ai" },
    { label: "Crypto", value: "crypto" },
    { label: "Education", value: "education" },
    { label: "Self Improvement", value: "self-improvement" },
    { label: "Fitness", value: "fitness" },
    { label: "Health", value: "health" },
    { label: "Nutrition", value: "nutrition" },
    { label: "Fashion", value: "fashion" },
    { label: "Beauty", value: "beauty" },
    { label: "Lifestyle", value: "lifestyle" },
    { label: "Travel", value: "travel" },
    { label: "Food", value: "food" },
    { label: "Cars", value: "cars" },
    { label: "Real Estate", value: "real-estate" },
    { label: "Marketing", value: "marketing" },
    { label: "Social Media", value: "social-media" },
    { label: "Productivity", value: "productivity" },
    { label: "Motivation", value: "motivation" },
    { label: "Relationships", value: "relationships" },
    { label: "Comedy", value: "comedy" },
    { label: "Podcast", value: "podcast" },
    { label: "None", value: "" },
  ],
  contentType: [
    { label: "Tutorial", value: "tutorial" },
    { label: "Challenge", value: "challenge" },
    { label: "Reaction", value: "reaction" },
    { label: "Comparison", value: "comparison" },
    { label: "List", value: "list" },
    { label: "Story", value: "story" },
    { label: "Review", value: "review" },
    { label: "Vlog", value: "vlog" },
    { label: "Case Study", value: "case-study" },
    { label: "How To", value: "how-to" },
    { label: "Explainer", value: "explainer" },
    { label: "Behind the Scenes", value: "behind-the-scenes" },
    { label: "Interview", value: "interview" },
    { label: "News", value: "news" },
    { label: "Myth Busting", value: "myth-busting" },
    { label: "Experiment", value: "experiment" },
    { label: "Before-After", value: "before-after" },
    { label: "Tips", value: "tips" },
    { label: "Q&A", value: "qa" },
    { label: "None", value: "" },
  ],
  emotion: [
    { label: "Shock", value: "shock" },
    { label: "Curiosity", value: "curiosity" },
    { label: "Fear", value: "fear" },
    { label: "Excitement", value: "excitement" },
    { label: "Authority", value: "authority" },
    { label: "Urgency", value: "urgency" },
    { label: "Anger", value: "anger" },
    { label: "Controversy", value: "controversy" },
    { label: "Surprise", value: "surprise" },
    { label: "Inspiration", value: "inspiration" },
    { label: "Motivation", value: "motivation" },
    { label: "Trust", value: "trust" },
    { label: "Hope", value: "hope" },
    { label: "Confidence", value: "confidence" },
    { label: "Sadness", value: "sadness" },
    { label: "Nostalgia", value: "nostalgia" },
    { label: "Achievement", value: "achievement" },
    { label: "None", value: "" },
  ],
  style: [
    { label: "Cinematic", value: "cinematic" },
    { label: "Clean", value: "clean" },
    { label: "Minimal", value: "minimal" },
    { label: "Bold", value: "bold" },
    { label: "Dramatic", value: "dramatic" },
    { label: "Dark", value: "dark" },
    { label: "Bright", value: "bright" },
    { label: "Luxury", value: "luxury" },
    { label: "Retro", value: "retro" },
    { label: "Modern", value: "modern" },
    { label: "Futuristic", value: "futuristic" },
    { label: "Glitch", value: "glitch" },
    { label: "Documentary", value: "documentary" },
    { label: "High Contrast", value: "high-contrast" },
    { label: "Color Pop", value: "color-pop" },
    { label: "None", value: "" },
  ],
  expressionLevel: [
    { label: "Neutral", value: "neutral" },
    { label: "Subtle", value: "subtle" },
    { label: "Natural", value: "natural" },
    { label: "Animated", value: "animated" },
    { label: "Intense", value: "intense" },
    { label: "Over The Top", value: "over-the-top" },
    { label: "None", value: "" },
  ],
  faceFraming: [
    { label: "No Face", value: "no-face" },
    { label: "Half Body", value: "half-body" },
    { label: "Close Up", value: "close-up" },
    { label: "Extreme Close Up", value: "extreme-close-up" },
  ],
  subjectSource: [
    { label: "Upload Own", value: "user-upload" },
    { label: "AI Generated", value: "ai-generated" },
    { label: "Stock", value: "stock" },
    { label: "None", value: "" },
  ],
  subjectPresence: [
    { label: "Person", value: "person" },
    { label: "Product", value: "product" },
    { label: "Object", value: "object" },
    { label: "No Subject", value: "no-subject" },
    { label: "None", value: "" },
  ],
  placement: [
    { label: "Left", value: "left" },
    { label: "Right", value: "right" },
    { label: "Center", value: "center" },
    { label: "Top", value: "top" },
    { label: "Bottom", value: "bottom" },
    { label: "Auto", value: "auto" },
    { label: "None", value: "" },
  ],
  composition: [
    { label: "Rule of Thirds", value: "rule-of-thirds" },
    { label: "Center Focus", value: "center-focus" },
    { label: "Split Screen", value: "split-screen" },
    { label: "Face Dominant", value: "face-dominant" },
    { label: "Object Dominant", value: "object-dominant" },
    { label: "Text Dominant", value: "text-dominant" },
    { label: "Wide Cinematic", value: "wide-cinematic" },
    { label: "Before-After", value: "before-after" },
    { label: "Diagonal Dynamic", value: "diagonal-dynamic" },
    { label: "None", value: "" },
  ],
  textDensity: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "None", value: "" },
  ],
  textStyle: [
    { label: "Clean", value: "clean" },
    { label: "Bold", value: "bold" },
    { label: "Shout", value: "shout" },
    { label: "None", value: "" },
  ],
  numberStyle: [
    { label: "None", value: "none" },
    { label: "Highlight", value: "highlight" },
    { label: "Oversized", value: "oversized" },
    { label: "Circled", value: "circled" },
    { label: "Badge", value: "badge" },
  ],
  highlightType: [
    { label: "Object", value: "object" },
    { label: "Symbol", value: "symbol" },
    { label: "Icon", value: "icon" },
    { label: "Arrow", value: "arrow" },
    { label: "Circle", value: "circle" },
    { label: "Badge", value: "badge" },
    { label: "Glow", value: "glow" },
    { label: "None", value: "none" },
  ],
  backgroundType: [
    { label: "Solid", value: "solid" },
    { label: "Gradient", value: "gradient" },
    { label: "Image", value: "image" },
    { label: "Blur", value: "blur" },
    { label: "None", value: "" },
  ],
  backgroundStyle: [
    { label: "Realistic", value: "realistic" },
    { label: "Abstract", value: "abstract" },
    { label: "Cinematic", value: "cinematic" },
    { label: "None", value: "" },
  ],
  colorMode: [
    { label: "Auto", value: "auto" },
    { label: "High Contrast", value: "high-contrast" },
    { label: "Dark Theme", value: "dark-theme" },
    { label: "Bright", value: "bright" },
    { label: "Brand Match", value: "brand-match" },
    { label: "None", value: "" },
  ],
  effectsLevel: [
    { label: "None", value: "none" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ],
  aspectRatio: [
    { label: "Auto", value: "" },
    { label: "16:9 (YouTube)", value: "16:9" },
    { label: "9:16 (Vertical)", value: "9:16" },
    { label: "1:1 (Square)", value: "1:1" },
  ],
  goal: [
    { label: "Maximize Clicks", value: "maximize-clicks" },
    { label: "Build Authority", value: "build-authority" },
    { label: "Brand Awareness", value: "brand-awareness" },
    { label: "Sales", value: "sales" },
    { label: "Engagement", value: "engagement" },
    { label: "None", value: "" },
  ],
  hookType: [
    { label: "Curiosity Gap", value: "curiosity-gap" },
    { label: "Number List", value: "number-list" },
    { label: "Warning", value: "warning" },
    { label: "Promise", value: "promise" },
    { label: "Controversy", value: "controversy" },
    { label: "Before / After", value: "before-after" },
    { label: "Secret", value: "secret" },
    { label: "Mistake", value: "mistake" },
    { label: "None", value: "" },
  ],
  audienceLevel: [
    { label: "Kids", value: "kids" },
    { label: "Teenager", value: "teenager" },
    { label: "Adults", value: "Adults" },
    { label: "Elders", value: "Elders" },
    { label: "None", value: "" },
  ],
  facialEmotion: [
    { label: "Happy", value: "happy" },
    { label: "Angry", value: "angry" },
    { label: "Surprised", value: "surprised" },
    { label: "Confused", value: "confused" },
    { label: "Serious", value: "serious" },
    { label: "Fearful", value: "fearful" },
    { label: "None", value: "" },
  ],
  contrastGoal: [
    { label: "Maximum CTR", value: "maximum-ctr" },
    { label: "Balanced", value: "balanced" },
    { label: "Brand Safe", value: "brand-safe" },
    { label: "None", value: "" },
  ],
  visualComplexity: [
    { label: "Minimal", value: "minimal" },
    { label: "Balanced", value: "balanced" },
    { label: "Busy", value: "busy" },
    { label: "None", value: "" },
  ],
};
