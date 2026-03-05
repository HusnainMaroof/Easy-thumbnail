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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GenrateFormType } from "@/src/types/dashboard.type";
import { useAuthContext } from "@/src/context/AuthContext";

type StrictDropdownField = keyof Omit<
  GenrateFormType,
  | "title"
  | "extraPrompt"
  | "aiHook"
  | "aiAutoAdjust"
  | "uploadedImage"
  | "brandPrimaryColor"
  | "brandSecondaryColor"
  | "highlightTarget"
  | "avoidElements"
>;

type DashboardDropdownProps<K extends StrictDropdownField> = {
  label: string;
  field: K;
  options: { label: string; value: string }[];
  icon?: LucideIcon;
  allowCustom?: boolean;
};

export function DashboardDropdown<K extends StrictDropdownField>({
  label,
  field,
  options,
  icon: Icon,
  allowCustom = true,
}: DashboardDropdownProps<K>) {
  const { generateForm, setGenerateForm } = useAuthContext();
  const value = generateForm[field] as string;
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [customOptions, setCustomOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    return customOptions.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, customOptions]);

  const showAddOption =
    allowCustom &&
    search.trim() !== "" &&
    !customOptions.some(
      (opt) => opt.label.toLowerCase() === search.toLowerCase(),
    );

  const handleSelect = (val: string) => {
    setGenerateForm((prev: any) => ({ ...prev, [field]: val }));
    setIsOpen(false);
    setSearch("");
  };

  const handleAddCustom = () => {
    const newOption = { label: search, value: search };
    setCustomOptions((prev) => [...prev, newOption]);
    handleSelect(newOption.value);
  };

  const selectedOption = customOptions.find((opt) => opt.value === value);

  return (
    <div className="relative w-full group" ref={dropdownRef}>
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
        {label}
      </label>
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.98 }}
        className={`relative w-full flex items-center justify-between px-4 py-3.5 border-2 ${
          value ? "border-black" : "border-zinc-400"
        } rounded-xl bg-white cursor-pointer hover:border-black transition-colors`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {Icon && (
            <div className="p-1.5 rounded-md bg-zinc-100 text-zinc-400">
              <Icon size={16} strokeWidth={2.5} />
            </div>
          )}
          <span
            className={`text-[11px] font-black uppercase tracking-tight truncate ${value ? "text-black" : "text-zinc-500"} `}
          >
            {selectedOption ? selectedOption.label : `Select ${label}`}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          {isOpen ? <ChevronDown size={18} /> : <ChevronsUpDown size={16} />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute z-100 top-full left-0 right-0 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-1"
          >
            <div className="p-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${label} OR Add`}
                className="w-full px-3 py-2 text-xs border-2 rounded-md mb-2 outline-none focus:border-black text-black font-semibold"
              />
              <div className="max-h-52 overflow-y-auto flex flex-col gap-1 custom-scrollbar">
                {filteredOptions.map((opt) => {
                  const isSelected = value === opt.value;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-xs font-black uppercase flex items-center duration-100 transition-all justify-between cursor-pointer hover:bg-blue-100
                        ${isSelected ? "bg-[#F4E041] text-black" : "hover:bg-blue-100"}`}
                    >
                      <span className="truncate">{opt.label}</span>
                      {isSelected && (
                        <div className="bg-black text-[#F4E041] rounded-full p-0.5">
                          <Check size={12} strokeWidth={4} />
                        </div>
                      )}
                    </button>
                  );
                })}
                {showAddOption && (
                  <button
                    type="button"
                    onClick={handleAddCustom}
                    className="w-full text-left px-4 py-3 rounded-lg text-xs font-black uppercase flex items-center gap-2 bg-zinc-50 hover:bg-blue-100 cursor-pointer"
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
