"use client";

import React, { startTransition, useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Zap,
  ArrowRight,
  Crown,
  Briefcase,
  Coins,
  ImagePlus,
  PanelLeftClose,
} from "lucide-react";
import { PRICING_PLANS } from "@/src/static data/dashboardData";
import { useAuthContext } from "@/src/context/AuthContext";
import { ActionResponse } from "@/src/actions/auth.actions";
import { PricingPayload } from "@/src/types/dashboard.type";
import { redirect } from "next/navigation";
import Link from "next/link";
import { envConfig } from "@/src/config/envConfig";

// ==========================================
// 1. DATA & CALCULATIONS
// ==========================================
const initialState: ActionResponse = {
  success: false,
  error: false,
  message: null,
  data: null,
};
export default function PricingDashboard() {
  const { user } = useAuthContext();

  const [IsPending, setIsPending] = React.useState(false);

  const COST_PER_THUMBNAIL = 0.8;

  const handelSubmit = async (plain: string) => {
    if (plain === "CUSTOM") {
      redirect("/dashboard/pricing/sales");
    }

    if (plain === "PRO") {
      try {
        setIsPending(true);
        const res = await fetch("/api/pricing/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plainId: envConfig.PAYMENT_KEYS.LEMON_STORE_ID,
          }),
        });

        const result = await res.json();

        if (res.ok) {
          console.log(result.checkoutUrl);
          window.location.href = result.checkoutUrl;
        }
      } catch (error) {
        console.log("error while makeing checkout", error);
      }
    }
  };

  const calculateThumbnails = (credits: number) =>
    Math.floor(credits / COST_PER_THUMBNAIL);
  return (
    <div className="h-full md:min-h-screen bg-[#FDFDFF] text-black font-sans selection:bg-[#F4E041] flex flex-col relative overflow-hidden pb-16 md:pb-24 overflow-y-scroll!">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Header Section */}
      <div className="relative z-10 pt-10 md:pt-16 pb-10 md:pb-16 px-4 ">
        <Link href={"/dashboard/home"}>
          {" "}
          <span className="text-left underline flex items-center gap-2 cursor-pointer hover:bg-gray-200 w-fit border border-gray-400   rounded-lg p-1.5">
            <PanelLeftClose size={22} /> Back
          </span>
        </Link>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-black mb-6 text-center"
        >
          FREE AI <br />
          <span className="bg-[#F4E041] px-4 border-4 border-black inline-block transform -rotate-2">
            THUMBNAIL
          </span>
          <br /> MAKER
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[10px] sm:text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest max-w-xs sm:max-w-xl mx-auto leading-relaxed"
        >
          Every generation costs a flat 0.8 credits. Pick the plan that fuels
          your upload schedule. Cancel anytime.
        </motion.p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 xl:gap-8 items-stretch max-w-md lg:max-w-none mx-auto">
          {PRICING_PLANS.map((plan, index) => {
            const isHighlight = plan.theme === "highlight";
            const isDark = plan.theme === "dark";
            let IsDisabled = user?.SubPlans === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative flex flex-col border-2 border-black rounded-4xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${
                  isHighlight
                    ? "bg-white shadow-[8px_8px_0px_0px_#000] lg:-translate-y-4 lg:hover:-translate-y-6 lg:z-20"
                    : isDark
                      ? "bg-zinc-900 text-white shadow-[8px_8px_0_#6a7282]"
                      : "bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-400 text-white border-2 border-black px-4 py-1.5 rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_0px_#000] whitespace-nowrap z-10">
                    Most Popular
                  </div>
                )}

                <div className="p-6 sm:p-8 lg:p-6 xl:p-8 flex flex-col flex-1 h-full">
                  {/* Plan Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000] shrink-0 ${isDark ? "bg-zinc-800" : "bg-zinc-100"}`}
                      >
                        <plan.icon
                          size={18}
                          className={isDark ? "text-white" : "text-black"}
                          strokeWidth={2.5}
                        />
                      </div>
                      <h3 className="font-black text-lg sm:text-xl uppercase tracking-widest">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  {/* Pricing Math */}
                  <div className="mb-6 md:mb-8">
                    <div className="flex items-baseline gap-1.5 mb-3 md:mb-4">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                        {plan.price === "Custom" ? "Custom" : `$${plan.price}`}
                      </span>
                      {plan.price !== "Custom" && (
                        <span
                          className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
                        >
                          /month
                        </span>
                      )}
                    </div>

                    {/* The Credit Calculation UI */}
                    <div
                      className={`p-3 sm:p-4 rounded-xl border-2 border-dashed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 ${isDark ? "border-zinc-700 bg-zinc-800/50" : isHighlight ? "border-[#B197FC]/40 bg-[#B197FC]/5" : "border-zinc-200 bg-zinc-50"}`}
                    >
                      <div className="flex-1">
                        <div className="font-black text-[10px] sm:text-[11px] uppercase tracking-widest flex items-center gap-2">
                          <div
                            className={`p-1.5 rounded-md ${isHighlight ? "bg-[#B197FC]/20 text-[#B197FC]" : isDark ? "bg-[#F4E041]/20 text-[#F4E041]" : "bg-zinc-200 text-zinc-600"}`}
                          >
                            <Coins size={14} strokeWidth={2.5} />
                          </div>
                          {plan.credits} Credits
                        </div>
                      </div>
                      <div className="hidden sm:block text-lg font-black text-zinc-300 px-2">
                        ≈
                      </div>
                      <div className="flex-1 sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t-2 border-dashed sm:border-t-0 sm:border-l-0 border-zinc-200 sm:border-transparent mt-1 sm:mt-0">
                        <div className="font-black text-[10px] sm:text-[11px] uppercase tracking-widest flex items-center gap-2 sm:justify-end text-zinc-800 dark:text-zinc-200">
                          <div
                            className={`p-1.5 rounded-md ${isDark ? "bg-zinc-700 text-zinc-300" : "bg-white border-2 border-zinc-200 text-zinc-600"}`}
                          >
                            <ImagePlus size={14} strokeWidth={2.5} />
                          </div>
                          <span
                            className={isDark ? "text-white" : "text-black"}
                          >
                            {plan.credits === "Custom"
                              ? "Unlimited"
                              : calculateThumbnails(
                                  plan.credits as number,
                                )}{" "}
                            Thumbs
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider leading-relaxed mb-8 {isDark ? "text-white!" : "text-black!"}`}
                  >
                    {plan.description}
                  </p>

                  {/* Features List */}
                  <div className="flex-1 mb-8">
                    <p
                      className={`text-[9px] font-black uppercase tracking-widest mb-4 ${isDark ? "text-white!" : "text-black!"}`}
                    >
                      Includes:
                    </p>
                    <ul className="space-y-3 sm:space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 shrink-0  rounded-full p-0.5 sm:p-1 shadow-sm ${isDark ? "bg-white! text-black!" : "bg-black text-white"}`}
                          >
                            <Check size={10} strokeWidth={4} />
                          </div>
                          <span
                            className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wide leading-snug ${isDark ? "text-zinc-300" : "text-zinc-700"}`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    disabled={IsDisabled}
                    onClick={() => handelSubmit(plan.id)}
                    className={`w-full py-4 px-6 rounded-xl border-2 font-black text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer mt-auto ${
                      IsDisabled
                        ? "cursor-not-allowed! opacity-60"
                        : isHighlight
                          ? "bg-blue-300 border-black text-black shadow-[4px_4px_0px_0px_#000] hover:bg-blue-400 hover:text-white active:translate-y-1 active:shadow-none"
                          : isDark
                            ? "bg-white border-white text-black shadow-[4px_4px_0px_0px_#F4E041] hover:bg-zinc-200 active:translate-y-1 active:shadow-none"
                            : "bg-zinc-900 border-transparent text-white hover:bg-zinc-700  cursor-not-allowed!"
                    }`}
                  >
                    {IsPending ? (
                      <> Configring</>
                    ) : (
                      <>
                        {plan.id === user?.SubPlans
                          ? "Current Plan"
                          : plan.buttonText}

                        {(isHighlight || isDark) && (
                          <ArrowRight size={14} strokeWidth={3} />
                        )}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
