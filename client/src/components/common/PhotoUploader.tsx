"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon } from "lucide-react";

type PhotoUploaderProps = {
  value?: File | null;
  onChange: (file: File | null) => void;
  label: string;
};

export function PhotoUploader({ value, onChange, label }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="w-full">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2 ml-1">
        Upload Photo
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
              ? "border-black bg-[#F4E041]/20 shadow-[6px_6px_0px_0px_#000]"
              : "border-zinc-200 bg-white hover:border-black hover:shadow-[6px_6px_0px_0px_#000]"
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
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
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl border-2 border-black"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute top-3 right-3 bg-black text-[#F4E041] p-2 rounded-full shadow-md hover:scale-105 transition"
              >
                <X size={14} strokeWidth={3} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="p-4 rounded-full bg-[#F4E041] text-black shadow-[4px_4px_0px_0px_#000]">
                <Upload size={22} strokeWidth={3} />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-wide text-black">
                  Drag & Drop Image
                </p>
                <p className="text-[10px] text-zinc-500 mt-1 font-semibold">
                  or click to browse
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
