"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { envConfig } from "../config/envConfig";
import { thumpnailPayload } from "../types/dashboard.type";

export type ServiceResponse = {
  success: boolean;
  error: boolean;
  message?: any;
  data: any;
};

export const generateThumnailService = async (
  payload: thumpnailPayload,
): Promise<ServiceResponse> => {
  const genAI = new GoogleGenerativeAI(
    envConfig.GOOGLE_CONFIG.GOOGLE_NANO_API_KEY!,
  );

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-image", // Nano Banana 2
  });

  let prompt = `You are a world-class social media thumbnail designer and visual marketing strategist.

Your task is to create a HIGH-CONVERSION, platform-optimized thumbnail image.

==================================================
PLATFORM & FORMAT
==================================================

Platform: youtube
Aspect Ratio: 16:9


Platform is YouTube:
- Optimize for homepage CTR competition
- Thumbnail must be readable at very small mobile size
- Limit visible text to maximum 3–4 powerful words
- Use dramatic emotion and bold contrast






==================================================
CONTENT FOUNDATION
==================================================

Niche: war
Content Type: case-study
Title Context Or Hook: iran vs middleast
Goal of Thumbnail: maximize-clicks
Target Audience Level: Adults

Create a visual concept that supports this goal clearly and instantly.

==================================================
PSYCHOLOGICAL TRIGGER STRATEGY
==================================================

Primary Emotion to Trigger: curiosity
Hook Type: curiosity-gap
Expression Intensity Level: natural
Facial Emotion: angry

Emotion must be visually obvious even at small screen sizes.
Exaggerate slightly for clarity if needed.

==================================================
SUBJECT & FRAMING
==================================================

Subject Source: ai-generated
Subject Presence: person
Face Framing: close-up
Placement in Frame: center
Composition Style: split-screen

Ensure strong subject-background separation.
Maintain clear visual hierarchy.

==================================================
TEXT & TYPOGRAPHY STRATEGY
==================================================

Text Density: medium
Text Style: clean
Number Style: circled
Highlight Type: symbol
Highlight Target: i want to show war items 

Text must be:
- High contrast
- Bold and readable
- Clean and uncluttered
- Optimized for small mobile preview

If textDensity is low:
Use 1–3 impactful words only.

==================================================
VISUAL STYLE & COMPLEXITY
==================================================

Overall Style: cinematic
Visual Complexity: balanced
Effects Level: medium

Avoid clutter.
Maintain strong focus on subject.
Use depth of field where appropriate.

==================================================
BACKGROUND DESIGN
==================================================

Background Type: gradient
Background Style: abstract

Background must not overpower subject.
Use blur or gradient if needed to enhance contrast.

==================================================
COLOR STRATEGY
==================================================

Color Mode: dark-theme
Contrast Goal: balanced
Primary Brand Color: 
Secondary Brand Color: 

Ensure strong color contrast between:
- Text and background
- Subject and background

==================================================
RESTRICTIONS
==================================================

Avoid these elements:


==================================================
AUTO-OPTIMIZATION
==================================================

If aiAutoAdjust is true:
- Increase contrast slightly
- Enhance emotional clarity
- Reduce unnecessary elements
- Improve lighting for dramatic effect
- Ensure mobile readability

==================================================
EXTRA CREATIVE INSTRUCTIONS
==================================================

Additional Prompt Context:


==================================================
FINAL OUTPUT REQUIREMENTS
==================================================

Generate a detailed, cinematic visual description optimized for AI image generation.

Be extremely specific about:
- Camera angle
- Lighting direction and intensity
- Facial expression details
- Text placement
- Color contrast
- Emotional intensity
- Depth and focus

Do NOT explain your reasoning.
Return only the final image generation description.
`;

  const finalPrompt = `
[OUTPUT: IMAGE]
[ASPECT_RATIO: ${payload.aspect_ratio || "16:9"}]
[QUALITY: 4K]
[THINKING: HIGH]

The specific subject to generate is: ${payload.prompt}
`;

  let result;

  let image;
  try {
    result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        // @ts-ignore - 2026 Thinking configuration
        thinkingConfig: {
          includeThoughts: true,
          thinkingBudget: 1024, // Tokens dedicated to "planning" the image
        },
      },
    });

    const response = await result.response;

    image = response.candidates?.[0]?.content.parts.find(
      (part) => part.inlineData,
    );

    if (!image) {
      return {
        success: false,
        error: true,
        message:
          "Model responded but no image was generated. Check your safety settings or prompt.",
        data: null,
      };
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: true,
      message: "something went wrong while generating Image",
      data: { error },
    };
  }

  return {
    success: true,
    error: false,
    message: "thumnail generated",
    data: {
      image: image.inlineData,
    },
  };
};
