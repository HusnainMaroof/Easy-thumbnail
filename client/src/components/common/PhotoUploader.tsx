"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X } from "lucide-react";

type PhotoUploaderProps = {
  value?: File | null;
  onChange: (file: File | null) => void;
  label: string;
};

export function PhotoUploader({ value, onChange, label }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [preview, setPreview] = useState<string | null>(null);

  // ✅ single source of truth (value → preview)
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [value]);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div className="w-full">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
        {label}
      </label>

      <motion.div
        whileHover={{ y: -4 }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative w-full border-2 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200
          ${
            isDragging
              ? "border-black bg-[#F4E041]/20"
              : "border-zinc-200 bg-white hover:border-black"
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full"
            >
              <img
                src={preview}
                className="w-full h-48 object-cover rounded-xl border-2 border-black"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-3 right-3 bg-black text-white p-2 rounded-full"
              >
                <X size={14} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              className="flex flex-col items-center gap-3"
            >
              <Upload size={22} />
              <p className="text-xs font-bold">Upload Image</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
