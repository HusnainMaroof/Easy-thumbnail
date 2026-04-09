"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Square,
  User,
  PanelLeftClose,
  PanelLeft,
  Wand2,
  ChevronDown,
  ChevronsUpDown,
  Check,
  Plus,
  Save,
  X,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GenrateFormType } from "@/src/types/dashboard.type";
import { useAuthContext } from "@/src/context/AuthContext";

export const FieldLabel = ({
  label,
  tooltip,
}: {
  label: string;
  tooltip?: string;
}) => (
  <div className="flex items-center gap-2 my-2 ml-1 group relative w-max  ">
    <span className="text-[10px] md:text-[11px] font-black text-zinc-600 uppercase tracking-widest">
      {label}
    </span>
    {tooltip && (
      <>
        <div className="text-zinc-400 group-hover:text-[#B197FC] cursor-help transition-colors">
          <HelpCircle size={14} strokeWidth={3} />
        </div>
        {/* Tooltip Popup */}
        <div className="absolute   bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-black text-white text-[10px] font-bold leading-relaxed rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all  text-center shadow-[4px_4px_0px_0px_rgba(177,151,252,1)] scale-95 group-hover:scale-100 origin-bottom">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
        </div>
      </>
    )}
  </div>
);

// ==========================================
// 4. DROPDOWN COMPONENT
// ==========================================

export function DashboardDropdown({
  label,
  tooltip,
  field,
  options,
  icon: Icon,
  allowCustom = true,
}: any) {
  const { generateForm, setGenerateForm } = useAuthContext();
  const value = generateForm[field as keyof GenrateFormType] as string;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [customOptions, setCustomOptions] = useState(options || []);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCustomOptions(options || []);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(
    () =>
      customOptions.filter((opt: any) =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, customOptions],
  );
  const showAddOption =
    allowCustom &&
    search.trim() !== "" &&
    !customOptions.some(
      (opt: any) => opt.label.toLowerCase() === search.toLowerCase(),
    );

  const handleSelect = (val: string) => {
    setGenerateForm((prev: any) => ({ ...prev, [field]: val }));
    setIsOpen(false);
    setSearch("");
  };

  const handleAddCustom = () => {
    const newOption = { label: search, value: search };
    setCustomOptions((prev: any) => [...prev, newOption]);
    handleSelect(newOption.value);
  };

  const selectedOption = customOptions.find((opt: any) => opt.value === value);

  // NEW: Helper to render a color swatch if rgb array exists
  const renderSwatch = (rgb?: number[][]) => {
    if (!rgb || rgb.length !== 3) return null;
    return (
      <div className="flex h-4 w-4 sm:h-5 sm:w-5 rounded-full overflow-hidden shrink-0 border-2 border-black/20 shadow-sm mr-1">
        <div
          className="flex-1 h-full"
          style={{ backgroundColor: `rgb(${rgb[0].join(",")})` }}
        />
        <div
          className="flex-1 h-full"
          style={{ backgroundColor: `rgb(${rgb[1].join(",")})` }}
        />
        <div
          className="flex-1 h-full"
          style={{ backgroundColor: `rgb(${rgb[2].join(",")})` }}
        />
      </div>
    );
  };

  return (
    <div
      className={`relative w-full   ${isOpen ? "z-80" : "z-10"}`}
      ref={dropdownRef}
    >
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.98 }}
        className={`relative w-full flex items-center justify-between px-4 py-4 border-[3px] ${value ? "border-black bg-blue-100" : "border-zinc-300 bg-white"} rounded-xl cursor-pointer hover:border-black transition-colors focus:outline-none focus:border-black focus:ring-2 focus:ring-[#B197FC]/30 shadow-sm`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon && (
            <div className="p-1.5 rounded-md bg-zinc-100 text-zinc-400">
              <Icon size={16} strokeWidth={2.5} />
            </div>
          )}
          <span
            className={`flex items-center text-xs font-black uppercase tracking-wide truncate ${value ? "text-black" : "text-zinc-400"} `}
          >
            {selectedOption && renderSwatch(selectedOption.rgb)}
            {selectedOption ? selectedOption.label : `Select ${label}`}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          {isOpen ? (
            <ChevronDown size={18} strokeWidth={3} />
          ) : (
            <ChevronsUpDown
              size={16}
              strokeWidth={3}
              className="text-zinc-400"
            />
          )}
        </motion.div>
      </motion.button>
      <FieldLabel label={label} tooltip={tooltip} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0  right-0 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-1 overflow-hidden z-110"
          >
            <div className="p-2 bg-white flex flex-col">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${label} or Add ++`}
                className="w-full px-3 py-2.5 text-xs border-2 border-zinc-200 rounded-lg mb-2 outline-none focus:border-black text-black font-bold transition-colors bg-zinc-50 focus:bg-white"
              />
              <div className="max-h-55 overflow-y-auto flex flex-col gap-1 custom-scrollbar">
                {filteredOptions.map((opt: any) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center duration-100 transition-all justify-between cursor-pointer ${value === opt.value ? "bg-blue-300 text-black shadow-sm" : "text-zinc-600 hover:bg-blue-100 hover:text-black"}`}
                  >
                    <span className="flex items-center truncate">
                      {opt.rgb && renderSwatch(opt.rgb)}
                      {opt.label}
                    </span>
                    {value === opt.value && (
                      <div className="bg-black text-white rounded-full p-0.5">
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                ))}
                {showAddOption && (
                  <button
                    type="button"
                    onClick={handleAddCustom}
                    className="w-full text-left px-4 py-3 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center gap-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 hover:text-black cursor-pointer transition-colors border border-dashed border-zinc-300"
                  >
                    <Plus size={14} /> Add "{search}"
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
