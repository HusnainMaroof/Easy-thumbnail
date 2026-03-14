"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import React, { useState, useCallback, useRef } from "react";
import SketchPreview, { REFERENCE_SVG } from "./SketchPreview";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  { ssr: false },
);

type View = "gallery" | "canvas";

type ExcalidrawAPI = {
  getSceneElements: () => any[];
  getAppState: () => any;
  getFiles: () => any;
  updateScene: (opts: any) => void;
};

const Sketch: React.FC = () => {
  const [view, setView] = useState<View>("gallery");
  const [toastVisible, setToastVisible] = useState(false);
  const [showRefModal, setShowRefModal] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawAPI | null>(
    null,
  );

  const handleStart = () => {
    setView("canvas");
    setToastVisible(true);

    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3500);
  };

  const handleBack = () => {
    setView("gallery");
    setToastVisible(false);
  };

  const handleExport = async () => {
    if (!excalidrawAPI) return;

    const { exportToBlob } = await import("@excalidraw/excalidraw");

    const blob = await exportToBlob({
      elements: excalidrawAPI.getSceneElements(),
      appState: {
        ...excalidrawAPI.getAppState(),
        exportWithDarkMode: false,
      },
      files: excalidrawAPI.getFiles(),
      mimeType: "image/png",
      quality: 1,
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "thumbnail-sketch.png";
    a.click();

    URL.revokeObjectURL(url);
  };

  const addReferenceSketch = useCallback(() => {
    setShowRefModal(true);
  }, []);

  if (view === "gallery") {
    return <SketchPreview handleStart={handleStart} />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden font-sans">
      {/* Hide library button */}
      <style>
        {`
        .excalidraw .library-button,
        .excalidraw [data-testid="toolbar-library"] { display: none !important; }
      `}
      </style>

      {/* Toolbar */}
      <div className="flex items-center justify-between h-12.5 px-5 bg-white border-b border-[#e8e8e8] shrink-0">
        <div className="flex items-center gap-2.5 flex-1">
          <button
            onClick={handleBack}
            className="bg-transparent border border-[#e0e0e0] text-[#666] px-3 py-1.5 rounded-[7px] text-xs cursor-pointer"
          >
            ← Reference
          </button>
        </div>

        <span className="flex-1 text-center text-sm font-semibold text-[#111] tracking-tight">
          ThumbCraft
        </span>

        <div className="flex-1 flex justify-end">
          <button
            onClick={handleExport}
            className="bg-[#111] text-white px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Export PNG
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 w-full overflow-hidden">
        <Excalidraw
          excalidrawAPI={(api) =>
            setExcalidrawAPI(api as unknown as ExcalidrawAPI)
          }
          theme="light"
          initialData={{
            appState: {
              viewBackgroundColor: "#ffffff",
              currentItemStrokeColor: "#1a1a1a",
              currentItemBackgroundColor: "transparent",
              gridSize: undefined,
            },
            elements: [],
            files: {},
          }}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
            tools: { image: false },
          }}
          renderTopRightUI={() => (
            <button
              onClick={addReferenceSketch}
              title="View reference sketch"
              className="w-9 h-9 p-0 bg-transparent border border-[#e0e0e0] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#f0f0f0] hover:border-[#bbb] transition"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9"
                  cy="4.5"
                  r="2.5"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                />
                <path
                  d="M5.5 9.5 Q6 7.5 9 7.5 Q12 7.5 12.5 9.5 L13 14"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M9 11.5 L7 16" stroke="#1a1a1a" strokeWidth="1.5" />
                <path d="M9 11.5 L11 16" stroke="#1a1a1a" strokeWidth="1.5" />
                <path d="M6 9.5 L4 12" stroke="#1a1a1a" strokeWidth="1.5" />
                <path d="M12 9.5 L14 12" stroke="#1a1a1a" strokeWidth="1.5" />
              </svg>
            </button>
          )}
        />
      </div>

      {/* Reference Modal */}
      {showRefModal && (
        <div
          className="fixed inset-0 bg-black/50 z-1000 flex items-center justify-center p-6"
          onClick={() => setShowRefModal(false)}
        >
          <div
            className="bg-white rounded-[14px] overflow-hidden max-w-160 w-full shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-[#f0f0f0] flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#111]">
                Sketch reference
              </span>

              <button
                onClick={() => setShowRefModal(false)}
                className="bg-transparent border-none text-[#aaa] text-lg leading-none cursor-pointer"
              >
                ×
              </button>
            </div>

            <div
              className="w-full aspect-video"
              dangerouslySetInnerHTML={{ __html: REFERENCE_SVG }}
            />
          </div>
        </div>
      )}

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111] rounded-[10px] px-4 py-2.5 flex items-center gap-2.5 z-999 min-w-240px shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />

          <div>
            <div className="text-xs font-semibold text-white">
              Reference viewed
            </div>
            <div className="text-[11px] text-white/45 mt-1">
              Canvas is clean — sketch freely
            </div>
          </div>

          <button
            onClick={() => setToastVisible(false)}
            className="ml-auto bg-transparent border-none text-white/35 text-xs p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Sketch;
