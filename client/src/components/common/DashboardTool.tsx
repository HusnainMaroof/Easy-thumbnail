import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType } from "@/src/types/dashboard.type";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  History,
  RefreshCcw,
  Save,
  Sparkles,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const FloatingWorkspaceToolbar = () => {
  const { resetgenerateForm } = useAuthContext();
  const [activeMenu, setActiveMenu] = useState<"save" | "history" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Click outside listener to close menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ToolbarButton = ({
    id,
    icon,
    tooltip,
    onClick,
    isAccent,
    children,
  }: any) => (
    <div className="relative group flex items-center justify-center">
      <button
        onClick={(e) => {
          if (id === "save" || id === "history") {
            setActiveMenu(activeMenu === id ? null : id);
          } else if (onClick) {
            onClick(e);
          }
        }}
        className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer border-[3px] shadow-[2px_2px_0px_0px_#000] active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#000] relative z-10 ${
          activeMenu === id
            ? "bg-black text-[#F4E041] border-black translate-y-0.5 shadow-none" // Active open state
            : isAccent
              ? "bg-[#B197FC] hover:bg-[#a182f8] border-black text-white"
              : "bg-white hover:bg-[#F4E041] border-black text-black"
        }`}
      >
        {icon}
      </button>

      {/* Tooltip (Hidden when a menu is open to prevent overlap) */}
      <div
        className={`absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-lg pointer-events-none transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] border-2 border-zinc-800 whitespace-nowrap z-100 ${activeMenu === id ? "opacity-0" : "opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"}`}
      >
        {tooltip}
      </div>

      {/* Popover Content Slot */}
      {children}
    </div>
  );

  return (
    <motion.div
      ref={menuRef}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
      className="fixed right-4 md:right-6 top-1/3 md:top-1/2 -translate-y-1/2 z-90 flex flex-col gap-3 bg-zinc-50 p-2 md:p-3 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-[3px] border-black"
    >
      {/* SAVE BUTTON & POPOVER */}
      <ToolbarButton
        id="save"
        icon={<Save size={20} strokeWidth={2.5} />}
        tooltip="Save Setup"
      >
        <AnimatePresence>
          {activeMenu === "save" && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-4 md:mr-6 w-64 bg-white border-[3px] border-black rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-100 origin-right"
            >
              <h3 className="font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2 text-black">
                <Save size={14} /> Save Workspace
              </h3>
              <input
                type="text"
                placeholder="e.g. Tech Review V2"
                className="w-full border-[3px] border-zinc-300 focus:border-black rounded-xl p-3 text-xs font-black outline-none mb-3 transition-colors bg-zinc-50 focus:bg-white"
                autoFocus
              />
              <button
                onClick={() => setActiveMenu(null)}
                className="w-full py-3 bg-[#F4E041] hover:bg-[#e3d03c] text-black border-[3px] border-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-[3px_3px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                Save Preset
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </ToolbarButton>

      {/* HISTORY BUTTON & POPOVER */}
      <ToolbarButton
        id="history"
        icon={<History size={20} strokeWidth={2.5} />}
        tooltip="Recent Saves"
      >
        <AnimatePresence>
          {activeMenu === "history" && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-4 md:mr-6 w-72 bg-white border-[3px] border-black rounded-2xl p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-100 origin-right overflow-hidden"
            >
              <div className="p-3 border-b-[3px] border-zinc-100 mb-2 flex justify-between items-center bg-white sticky top-0 z-10">
                <h3 className="font-black text-xs uppercase tracking-widest text-black flex items-center gap-2">
                  <History size={14} /> Recent Saves
                </h3>
                <span className="text-[9px] font-black text-white bg-black px-2 py-0.5 rounded-md shadow-[2px_2px_0px_0px_#B197FC]">
                  3 Items
                </span>
              </div>

              <div className="flex flex-col gap-1.5 max-h-70 overflow-y-auto custom-scrollbar p-1">
                {[
                  {
                    name: "Tech Review - iPhone",
                    date: "2 hours ago",
                    color: "bg-[#F4E041]",
                  },
                  {
                    name: "Gaming Reaction Ext...",
                    date: "1 day ago",
                    color: "bg-[#B197FC]",
                  },
                  {
                    name: "Finance Portfolio",
                    date: "3 days ago",
                    color: "bg-[#A7F3D0]",
                  },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMenu(null)}
                    className="w-full p-3 border-[3px] border-transparent hover:border-black rounded-xl text-left transition-all group flex justify-between items-center bg-zinc-50 hover:bg-white cursor-pointer hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`w-3 h-3 rounded-md border-2 border-black ${item.color} shrink-0`}
                      />
                      <div className="truncate">
                        <div className="text-[10px] font-black uppercase truncate text-zinc-800 group-hover:text-black transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[8px] font-bold text-zinc-500 mt-0.5 uppercase tracking-wider">
                          {item.date}
                        </div>
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      strokeWidth={3}
                      className="text-black shrink-0 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ToolbarButton>

      <div className="w-8 h-1 bg-zinc-300 mx-auto rounded-full my-1" />

      <ToolbarButton
        id="reset"
        icon={<RefreshCcw size={20} strokeWidth={2.5} />}
        tooltip="Reset Workspace"
        onClick={resetgenerateForm}
      />
      <ToolbarButton
        id="tips"
        icon={<Sparkles size={20} strokeWidth={2.5} />}
        tooltip="Pro Tips"
        isAccent={true}
      />
    </motion.div>
  );
};
