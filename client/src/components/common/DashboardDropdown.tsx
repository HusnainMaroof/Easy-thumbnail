"use client";

import React, { useState, useRef, useEffect } from "react";
import { LucideIcon } from "lucide-react";

type Option<T extends string> = {
  label: string;
  value: T;
};

type DashboardDropdownProps<TForm, K extends keyof TForm> = {
  label: string;
  field: K;
  value: TForm[K];
  options: Option<Extract<TForm[K], string>>[];
  onChange: (field: K, value: TForm[K]) => void;
  icon?: LucideIcon;
};

function DashboardDropdown<TForm, K extends keyof TForm>({
  label,
  field,
  value,
  options,
  onChange,
  icon: Icon,
}: DashboardDropdownProps<TForm, K>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative w-full z-100">
      <label className="text-xs font-bold uppercase mb-2 block">{label}</label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between border-2 border-black px-4 py-3 bg-white font-bold"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} />}
          <span>{selected?.label ?? `Select ${label}`}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 border-2 border-black bg-white z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(field, opt.value as TForm[K]);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 border-b border-black last:border-0 hover:bg-gray-100"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardDropdown;
