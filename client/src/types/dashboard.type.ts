export type GenrateFormType = {
  platform: "youtube" | "tiktok" | "instagram" | "";
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
  title: string;
  aiHook: boolean;
};
