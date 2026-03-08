import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType } from "@/src/types/dashboard.type";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  History,
  Save,
  Sparkles,
  Wand2,
  X,
  Zap,
} from "lucide-react";

export const DashboardSideBar = () => {
  const { dashboardSideBar, setDashboardSideBar } = useAuthContext();

  return (
    <>
      <AnimatePresence>
        {dashboardSideBar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 bg-black/40 md:hidden text-black"
            onClick={() => setDashboardSideBar(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: dashboardSideBar ? 320 : 0 }}
        className="fixed md:relative left-0 top-0 bottom-0 z-120 h-full shrink-0 bg-white border-r-2 border-zinc-200 overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.05)] flex flex-col"
      >
        <div className="w-[320px] h-full flex flex-col">
          <div className="p-6 border-b-2 border-zinc-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2">
              <Wand2 size={18} className="text-[#B197FC]" />
              <h3 className="font-black uppercase tracking-widest text-sm">
                Toolbox
              </h3>
            </div>
            <button
              className="p-1.5 bg-zinc-100 rounded-lg cursor-pointer hover:bg-zinc-200 transition-colors"
              onClick={() => setDashboardSideBar(false)}
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-6 space-y-10 overflow-y-auto custom-scrollbar flex-1 pb-24">
            <section>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">
                Current Setup
              </p>
              <button className="w-full py-3.5 px-4 bg-zinc-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-[3px_3px_0px_0px_#B197FC] active:translate-y-1 active:shadow-none cursor-pointer">
                <Save size={16} /> Save Configuration
              </button>
            </section>

            <section>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 flex items-center justify-between">
                Recent Saves <History size={12} />
              </p>
              <div className="space-y-2">
                {[
                  {
                    name: "Tech Review - iPhone",
                    date: "2 hours ago",
                    color: "bg-blue-100 text-blue-700",
                  },
                  {
                    name: "Gaming Reaction Ext...",
                    date: "1 day ago",
                    color: "bg-purple-100 text-purple-700",
                  },
                  {
                    name: "Finance Portfolio",
                    date: "3 days ago",
                    color: "bg-emerald-100 text-emerald-700",
                  },
                ].map((item, i) => (
                  <button
                    key={i}
                    className="w-full p-3 border-2 border-zinc-100 hover:border-black rounded-xl text-left transition-all group flex justify-between items-center bg-white hover:bg-zinc-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`w-2 h-2 rounded-full ${item.color} shrink-0`}
                      />
                      <div className="truncate">
                        <div className="text-[11px] font-black uppercase truncate text-zinc-800 group-hover:text-black transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[9px] font-bold text-zinc-400 mt-0.5">
                          {item.date}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      size={14}
                      className="text-zinc-300 group-hover:text-black transition-colors shrink-0 ml-2"
                    />
                  </button>
                ))}
              </div>
            </section>

            <section>
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3 flex justify-between items-center">
                Inspiration Gallery{" "}
                <Sparkles size={12} className="text-[#B197FC]" />
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop",
                  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=300&fit=crop",
                ].map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl overflow-hidden border-2 border-zinc-100 hover:border-[#B197FC] cursor-pointer relative group transition-all"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-[9px] font-black uppercase tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                        Use Style
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
