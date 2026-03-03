export type GenrateFormType = {
  niche: "gaming" | "finance" | "tech" | "vlog" | "";
  emotion: "shock" | "curiosity" | "fear" | "";
  style: "viral" | "news" | "";

  subjectType: "upload" | "ai" | "none" | "";
  placement: "left" | "right" | "center" | "auto" | "";
  textIntensity: "minimal" | "bold" | "aggressive" | "";
  highlight:
    | "money"
    | "laptop"
    | "graph"
    | "game-item"
    | "arrow-circle"
    | "none"
    | "";
  background: "solid" | "gradient" | "blur" | "real" | "abstract" | "";
  platform: "youtube" | "tiktok" | "instagram" | ""; 
  title: string;
  aiHook: boolean;
  extraPrompt: string;
};
