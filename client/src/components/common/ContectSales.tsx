"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Send,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
  Zap,
  Users,
  BarChart3,
  Heart,
  ChevronDown,
  Check,
  PanelLeftClose,
} from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const VOLUME_OPTIONS = [
  "1-50 thumbnails/mo",
  "50-200 thumbnails/mo",
  "200-1000 thumbnails/mo",
  "1000+ thubnails/mo",
];

export default function ContactSales() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    volume: VOLUME_OPTIONS[1],
    message: "",
  });

  // Custom Dropdown State
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVolumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          volume: VOLUME_OPTIONS[1],
          message: "",
        });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-dvh h-full w-full bg-[#FDFDFF] text-black font-sans selection:bg-[#F4E041] relative flex flex-col overflow-x-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* --- TOP NAV --- */}
      <div className="relative z-10 pt-10 md:pt-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <a
          href="/dashboard/home"
          className="text-left flex items-center gap-2 cursor-pointer hover:bg-gray-200 w-fit border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-y-px hover:translate-x-px hover:shadow-none rounded-lg px-3 py-1.5 text-black font-black uppercase tracking-widest text-[10px] transition-all bg-white"
        >
          <PanelLeftClose size={16} strokeWidth={2.5} /> Back
        </a>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative z-10 flex items-center justify-center p-4 md:p-8 mb-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Sales Pitch & Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center max-w-xl"
          >
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#a855f7] border-2 border-black shadow-[3px_3px_0px_0px_#000] text-white w-max mb-8">
              <Building2 size={16} strokeWidth={2.5} />
              <span className="text-xs font-black uppercase tracking-widest">
                Enterprise Solutions
              </span>
            </motion.div>

            <motion.h1 className="text-4xl md:text-6xl font-black text-black tracking-tighter mb-6 leading-tight">
              Scale your <br /> visual output.
            </motion.h1>

            <motion.p className="text-zinc-600 font-medium leading-relaxed mb-10 text-lg">
              Whether you run a creative agency, manage a network of channels,
              or need high-volume API access, our enterprise plans are built to
              scale with your ambition.
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="flex flex-col gap-6"
            >
              <motion.div className="flex gap-4 items-start group">
                <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] group-hover:shadow-[4px_4px_0px_0px_#a855f7] group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all shrink-0">
                  <Users size={20} strokeWidth={2.5} className="text-black" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-black mb-1">
                    Multi-Seat Collaboration
                  </h3>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    Shared workspaces, unified billing, and advanced permission
                    controls for large teams.
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex gap-4 items-start group">
                <div className="p-3 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] group-hover:shadow-[4px_4px_0px_0px_#10b981] group-hover:-translate-y-1 group-hover:-translate-x-1 transition-all shrink-0">
                  <BarChart3
                    size={20}
                    strokeWidth={2.5}
                    className="text-black"
                  />
                </div>
                <div>
                  <h3 className="font-black text-lg text-black mb-1">
                    Dedicated Account Manager
                  </h3>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    Priority support, custom onboarding, and strategy sessions
                    tailored to your goals.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <div className="bg-white rounded-4xl border-[3px] border-black shadow-[8px_8px_0px_0px_#000] p-8 md:p-10 relative overflow-hidden h-full">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <motion.div>
                      <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">
                        Talk to Sales
                      </h2>
                      <p className="text-sm font-medium text-zinc-500">
                        Fill out the form and a product expert will be in touch.
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                      <motion.div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="John Doe"
                          className="w-full bg-[#f8f9fa] border-2 border-zinc-300 rounded-xl py-3.5 px-4 text-sm font-bold text-black outline-none focus:bg-white focus:border-black focus:shadow-[4px_4px_0px_0px_#F4E041] transition-all placeholder:text-zinc-400 placeholder:font-medium"
                        />
                      </motion.div>
                      <motion.div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="john@company.com"
                          className="w-full bg-[#f8f9fa] border-2 border-zinc-300 rounded-xl py-3.5 px-4 text-sm font-bold text-black outline-none focus:bg-white focus:border-black focus:shadow-[4px_4px_0px_0px_#F4E041] transition-all placeholder:text-zinc-400 placeholder:font-medium"
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          placeholder="Acme Corp"
                          className="w-full bg-[#f8f9fa] border-2 border-zinc-300 rounded-xl py-3.5 px-4 text-sm font-bold text-black outline-none focus:bg-white focus:border-black focus:shadow-[4px_4px_0px_0px_#F4E041] transition-all placeholder:text-zinc-400 placeholder:font-medium"
                        />
                      </motion.div>
                      <motion.div
                        className="flex flex-col gap-2 relative"
                        ref={dropdownRef}
                      >
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                          Expected Volume
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsVolumeOpen(!isVolumeOpen)}
                          className={`w-full text-left bg-[#f8f9fa] border-2 rounded-xl py-3.5 px-4 text-sm font-bold text-black outline-none transition-all flex items-center justify-between ${
                            isVolumeOpen
                              ? "bg-white border-black shadow-[4px_4px_0px_0px_#F4E041]"
                              : "border-zinc-300 hover:bg-white hover:border-black focus:bg-white focus:border-black focus:shadow-[4px_4px_0px_0px_#F4E041]"
                          }`}
                        >
                          <span className="truncate pr-2">
                            {formData.volume}
                          </span>
                          <ChevronDown
                            size={16}
                            strokeWidth={2.5}
                            className={`shrink-0 transition-transform duration-200 ${isVolumeOpen ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {isVolumeOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 4 }}
                              exit={{ opacity: 0, y: -5 }}
                              transition={{ duration: 0.15 }}
                              className="absolute top-18 left-0 right-0 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-50"
                            >
                              <div className="p-2 bg-white flex flex-col gap-1">
                                {VOLUME_OPTIONS.map((opt) => (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => {
                                      setFormData({ ...formData, volume: opt });
                                      setIsVolumeOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-xs font-black uppercase tracking-wider flex items-center duration-100 transition-all justify-between cursor-pointer ${
                                      formData.volume === opt
                                        ? "bg-[#F4E041] text-black shadow-sm border-2 border-black"
                                        : "text-zinc-600 hover:bg-zinc-100 hover:text-black border-2 border-transparent"
                                    }`}
                                  >
                                    <span className="truncate">{opt}</span>
                                    {formData.volume === opt && (
                                      <div className="bg-black text-white rounded-full p-0.5 shadow-sm shrink-0 ml-2">
                                        <Check size={12} strokeWidth={4} />
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>

                    <motion.div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                        How can we help?
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your team's workflow and what you're looking to achieve..."
                        rows={4}
                        className="w-full bg-[#f8f9fa] border-2 border-zinc-300 rounded-xl py-3.5 px-4 text-sm font-bold text-black outline-none focus:bg-white focus:border-black focus:shadow-[4px_4px_0px_0px_#F4E041] transition-all resize-none placeholder:text-zinc-400 placeholder:font-medium"
                      />
                    </motion.div>

                    <motion.button
                      whileHover={
                        !isSubmitting
                          ? {
                              scale: 1.02,
                              x: 2,
                              y: -2,
                              boxShadow: "0px 0px 0px 0px #000",
                            }
                          : {}
                      }
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-full py-4 bg-[#F4E041] text-black rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 border-2 border-black shadow-[4px_4px_0px_0px_#000] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            size={20}
                            className="animate-spin text-black"
                          />{" "}
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} strokeWidth={2.5} /> contect sales
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center text-center py-20 px-4 h-full"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{
                        scale: { type: "spring", stiffness: 200 },
                        rotate: { type: "tween", duration: 0.5 },
                        delay: 0.1,
                      }}
                      className="w-20 h-20 bg-[#a855f7] border-[3px] border-black text-white shadow-[4px_4px_0px_0px_#000] rounded-full flex items-center justify-center mb-8"
                    >
                      <CheckCircle2 size={40} strokeWidth={3} />
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-3xl font-black text-black uppercase tracking-tighter mb-4"
                    >
                      Request Received!
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-zinc-600 font-medium text-base max-w-85 leading-relaxed"
                    >
                      Thanks for your interest,{" "}
                      <span className="text-black font-bold">
                        {formData.name}
                      </span>
                      . An enterprise specialist will reach out to{" "}
                      <span className="text-black font-bold">
                        {formData.email}
                      </span>{" "}
                      shortly.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 border-t-2 border-black bg-white mt-auto"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              © {new Date().getFullYear()} Thumbnail Builder. Built with{" "}
              <Heart size={12} fill="#FF0000" className="text-[#FF0000]" />
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="text-[10px] font-black text-zinc-500 hover:text-[#a855f7] uppercase tracking-widest transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] font-black text-zinc-500 hover:text-[#a855f7] uppercase tracking-widest transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-[10px] font-black text-zinc-500 hover:text-[#a855f7] uppercase tracking-widest transition-colors"
            >
              System Status
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
