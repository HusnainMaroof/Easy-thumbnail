export type GenrateFormType = {
  niche: "gaming" | "finance" | "tech" | "vlog" | "" | string;
  emotion: "shock" | "curiosity" | "fear" | "" | string;
  style: "viral" | "news" | "" | string;

  subjectType: "upload" | "ai" | "none" | "" | string;
  placement: "left" | "right" | "center" | "auto" | "" | string;
  textIntensity: "minimal" | "bold" | "aggressive" | "" | string;
  highlight:
    | "money"
    | "laptop"
    | "graph"
    | "game-item"
    | "arrow-circle"
    | "none"
    | ""
    | string;
  background: "solid" | "gradient" | "blur" | "real" | "abstract" | "" | string;
  platform: "youtube" | "tiktok" | "instagram" | "" | string;
  title: string;
  aiHook: boolean;
  extraPrompt: string;
  uploadedImage: File | null;
};
