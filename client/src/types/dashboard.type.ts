export type GenrateFormType = {
  platform: string;
  title: string;
  category: string;
  thumbnailStory: string;
  extraPrompt: string;
  hookType: string;
  subjectSource: string;
  peopleCount: string;
  mainObject: string;
  cameraFraming: string;
  uploadedImage: File | null;
  viewerFocus: string;
  visualEnergy: string;
  thumbnailStyle: string;
  backgroundScene: string;
  avoidElements: string;
  highlightType: string;
  highlightTarget: string;
  thumbnailText: string;
  colorMode: string;
  textPlacement: string;
  referenceImage: File | null;
};

export const INITIAL_FORM_STATE: GenrateFormType = {
  platform: "",
  title: "",
  category: "",
  thumbnailStory: "",
  extraPrompt: "",
  hookType: "",
  subjectSource: "",
  peopleCount: "1",
  mainObject: "",
  cameraFraming: "",
  uploadedImage: null,
  viewerFocus: "",
  visualEnergy: "",
  thumbnailStyle: "",
  backgroundScene: "",
  avoidElements: "",
  highlightType: "",
  highlightTarget: "",
  thumbnailText: "",
  colorMode: "",
  referenceImage: null,
  textPlacement: "",
};

export interface thumpnailPayload {
  prompt: string;
  aspect_ratio: string;
}

export interface onBoardPayload {
  platform: string;
  contentType: string;
  style: string;
}

export type PricingPayload = {
  priceModel: "FREE" | "PRO" | "CUSTOM";
};
