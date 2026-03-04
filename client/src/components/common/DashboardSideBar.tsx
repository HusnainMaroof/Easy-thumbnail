import { useAuthContext } from "@/src/context/AuthContext";
import { GenrateFormType } from "@/src/types/dashboard.type";
import { AnimatePresence, motion } from "framer-motion";
import { Save, X, Zap } from "lucide-react";
type SidebarProps = {
  updateField: <K extends keyof GenrateFormType>(
    field: K,
    value: GenrateFormType[K],
    targetStep?: number | null,
  ) => void;
};

const DashboardSideBar = ({ updateField }: SidebarProps) => {
  const { dashboardSideBar, setDashboardSideBar, generateForm } =
    useAuthContext();
  return (
    <div>
      <AnimatePresence>
        {dashboardSideBar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 bg-black/40  lg:hidden text-black"
            onClick={() => setDashboardSideBar(false)}
          />
        )}
      </AnimatePresence>
      <motion.aside
        initial={false}
        animate={{
          x: dashboardSideBar ? 0 : -320,
          width: dashboardSideBar ? 300 : 0,
          opacity: dashboardSideBar ? 1 : 0,
        }}
        className="absolute lg:relative z-110 h-full shrink-0 border-r-2 border-zinc-200 bg-white overflow-hidden shadow-2xl lg:shadow-none rounded-2xl"
      >
        <div className="w-75 p-6 space-y-8 h-full overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-2">
            
            <button
              className="lg:hidden p-1 bg-zinc-100 rounded-md cursor-pointer "
              onClick={() => setDashboardSideBar(false)}
            >
              <X size={14} />
            </button>
          </div>
          <section className="space-y-4">
            <label className="text-[9px] font-black uppercase opacity-50">
              Extra Prompt Direction
            </label>
            <textarea
              className="w-full h-40 p-4 bg-zinc-50 border-2 border-zinc-200 rounded-xl text-[11px] font-bold focus:border-black outline-none transition-all resize-none shadow-inner"
              placeholder="E.g. Add a glowing neon outline to the subject..."
              value={generateForm.extraPrompt}
              onChange={(e) => updateField("extraPrompt", e.target.value, null)}
            />
          </section>
         
          <div className="pt-6 border-t border-zinc-100">
            <button className="w-full py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[9px] font-black uppercase hover:bg-zinc-100 hover:border-black transition-all">
              <Save size={12} className="inline mr-2" /> Save Configuration
            </button>
          </div>
        </div>
      </motion.aside>
    </div>
  );
};

export default DashboardSideBar;
