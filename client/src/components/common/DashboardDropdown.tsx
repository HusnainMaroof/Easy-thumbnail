"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType } from "@/src/types/dashboard.type";

// Dropdown fields: all string fields except title/extraPrompt
type DropdownField = {
  [K in keyof GenrateFormType]: GenrateFormType[K] extends string ? K : never;
}[keyof GenrateFormType];
type StrictDropdownField = Exclude<DropdownField, "title" | "extraPrompt">;

type DashboardDropdownProps<K extends StrictDropdownField> = {
  label: string;
  field: K;
  options: { label: string; value: GenrateFormType[K] }[];
  icon?: LucideIcon;
};

export function DashboardDropdown<K extends StrictDropdownField>({
  label,
  field,
  options,
  icon: Icon,
}: DashboardDropdownProps<K>) {
  const { generateForm, setGenerateForm } = useAuthContext();
  const value = generateForm[field];
  const [isOpen, setIsOpen] = useState(false);
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

  const selectedOption = options.find((opt) => opt.value === value);

  const updateField = (val: GenrateFormType[K]) => {
    setGenerateForm((prev) => ({
      ...prev,
      [field]: val,
    }));
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="text-[9px] font-black text-black uppercase tracking-widest block mb-2 opacity-50 ml-1">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-200 bg-white
          ${isOpen ? "border-black shadow-[4px_4px_0px_0px_#000] -translate-y-1" : "border-zinc-200 hover:border-zinc-400 shadow-sm"}`}
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon
              size={16}
              className={value ? "text-[#88AAEE]" : "text-zinc-300"}
            />
          )}
          <span
            className={`text-[10px] md:text-[11px] font-black uppercase tracking-tight ${value ? "text-black" : "text-zinc-400"}`}
          >
            {selectedOption ? selectedOption.label : `Select ${label}`}
          </span>
        </div>

        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            className="absolute z-[100] left-0 right-0 mt-2 bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_#000] overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((opt) => (
                <motion.button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    updateField(opt.value);
                    setIsOpen(false);
                  }}
                  whileHover={{ backgroundColor: "#f0f0f0" }}
                  transition={{ duration: 0.2 }}
                  className={`w-full text-left px-5 py-4 text-[10px] font-black uppercase flex items-center justify-between border-b border-zinc-100 last:border-0
                    ${value === opt.value ? "bg-[#F4E041] text-black" : "text-zinc-600"}`}
                >
                  {opt.label}
                  {value === opt.value && <CheckCircle2 size={14} />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
