import React from "react";

export const REFERENCE_SVG = `<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <rect width="640" height="360" fill="#fefefe" rx="8"/>
  <circle cx="72" cy="52" r="22" fill="none" stroke="#222" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="72" y1="22" x2="72" y2="14" stroke="#222" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="72" y1="82" x2="72" y2="90" stroke="#222" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="42" y1="52" x2="34" y2="52" stroke="#222" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="102" y1="52" x2="110" y2="52" stroke="#222" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="51" y1="31" x2="45" y2="25" stroke="#222" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="93" y1="73" x2="99" y2="79" stroke="#222" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="93" y1="31" x2="99" y2="25" stroke="#222" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="51" y1="73" x2="45" y2="79" stroke="#222" stroke-width="1.6" stroke-linecap="round"/>
  <text x="98" y="30" font-family="sans-serif" font-size="13" fill="#444">sun</text>
  <text x="190" y="32" font-family="sans-serif" font-size="14" fill="#444">Blue Sky</text>
  <line x1="0" y1="200" x2="640" y2="200" stroke="#bbb" stroke-width="1.2"/>
  <line x1="0" y1="180" x2="640" y2="180" stroke="#bbb" stroke-width="1.2"/>
  <line x1="40" y1="160" x2="40" y2="210" stroke="#bbb" stroke-width="1.2"/>
  <line x1="80" y1="160" x2="80" y2="210" stroke="#bbb" stroke-width="1.2"/>
  <line x1="120" y1="160" x2="120" y2="210" stroke="#bbb" stroke-width="1.2"/>
  <rect x="0" y="310" width="640" height="50" fill="#f0f0f0"/>
  <text x="30" y="338" font-family="sans-serif" font-size="13" fill="#888">Grass</text>
  <text x="280" y="338" font-family="sans-serif" font-size="13" fill="#888">Grass</text>
  <text x="530" y="338" font-family="sans-serif" font-size="13" fill="#888">Grass</text>
  <ellipse cx="160" cy="120" rx="52" ry="58" fill="none" stroke="#222" stroke-width="2"/>
  <path d="M135 108 Q143 103 150 108" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M168 108 Q176 103 183 108" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M155 122 Q160 128 165 122" stroke="#222" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M145 138 Q160 132 175 138" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M108 110 Q100 60 130 52 Q160 44 190 52 Q215 60 212 110" fill="none" stroke="#222" stroke-width="2"/>
  <path d="M108 110 Q98 160 104 220" fill="none" stroke="#222" stroke-width="1.8"/>
  <path d="M212 110 Q220 160 216 220" fill="none" stroke="#222" stroke-width="1.8"/>
  <path d="M130 178 Q128 240 125 310" fill="none" stroke="#222" stroke-width="2"/>
  <path d="M190 178 Q192 240 195 310" fill="none" stroke="#222" stroke-width="2"/>
  <path d="M125 210 Q160 220 195 210" fill="none" stroke="#222" stroke-width="1.8"/>
  <path d="M130 200 Q110 180 140 160 Q155 152 158 145" fill="none" stroke="#222" stroke-width="2"/>
  <circle cx="158" cy="142" r="8" fill="none" stroke="#222" stroke-width="1.6"/>
  <text x="255" y="75" font-family="sans-serif" font-size="28" font-weight="bold" fill="#333">STINKY</text>
  <path d="M490 80 Q496 68 490 56" fill="none" stroke="#555" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M508 78 Q514 64 508 50" fill="none" stroke="#555" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M526 80 Q532 66 526 52" fill="none" stroke="#555" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M468 115 Q500 108 540 115 L536 130 Q500 122 472 130 Z" fill="#e8e8e8" stroke="#222" stroke-width="1.8"/>
  <path d="M472 130 Q468 230 474 310" fill="none" stroke="#222" stroke-width="2"/>
  <path d="M536 130 Q540 230 534 310" fill="none" stroke="#222" stroke-width="2"/>
  <path d="M474 310 Q504 318 534 310" fill="none" stroke="#222" stroke-width="2"/>
  <text x="548" y="68" font-family="sans-serif" font-size="13" fill="#444">FLIES</text>
  <text x="485" y="168" font-family="sans-serif" font-size="18" fill="#555">• • •</text>
  <text x="466" y="330" font-family="sans-serif" font-size="13" fill="#888">Trash Can</text>
  <path d="M310 72 Q280 90 250 115" fill="none" stroke="#888" stroke-width="1.4" stroke-dasharray="4 3"/>
  <polygon points="248,112 244,124 256,118" fill="#888"/>
  <path d="M360 72 Q400 85 450 100" fill="none" stroke="#888" stroke-width="1.4" stroke-dasharray="4 3"/>
  <polygon points="452,97 462,104 454,112" fill="#888"/>
</svg>`;
interface prop {
  handleStart: () => void;
}

interface Prop {
  handleStart: () => void;
}

export const SketchPreview = ({ handleStart }: Prop) => {
  return (
    <div className="min-h-[80vh] bg-[#fafafa] font-sans flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#e8e8e8] bg-white">
        <span className="font-semibold text-[15px] text-[#111] tracking-tight">
          ThumbCraft
        </span>

        <button
          onClick={handleStart}
          className="bg-transparent border border-[#ddd] text-[#888] px-3.5 py-1.5 rounded-lg text-xs cursor-pointer"
        >
          Skip — start blank
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 ">
        <p className="text-[11px] uppercase tracking-widest text-[#aaa] font-medium mb-2">
          Reference layout
        </p>

        <h1 className="text-[22px] font-semibold tracking-tight mb-1 text-[#111] text-center">
          Sketch reference
        </h1>

        <p className="text-[13px] text-[#888] leading-relaxed max-w-95 text-center mb-8">
          Use this as a visual guide for your thumbnail layout. Your canvas
          starts completely clean.
        </p>

        {/* Card */}
        <div className="w-full max-w-150 bg-white border border-[#e8e8e8] rounded-[14px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <div className="w-full aspect-video overflow-hidden">
            <div
              style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}
              dangerouslySetInnerHTML={{ __html: REFERENCE_SVG }}
            />
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[#f0f0f0] flex items-center justify-between">
            <div>
              <span className="block text-[13px] font-semibold text-[#111]">
                Reaction + element labels
              </span>

              <span className="block text-[11px] text-[#aaa] mt-0.5">
                Person reacting to subject — annotated sketch style
              </span>
            </div>

            <button
              onClick={handleStart}
              className="bg-[#111] text-white px-5 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap"
            >
              Start sketching →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SketchPreview;
