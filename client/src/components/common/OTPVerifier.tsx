"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useActionState,
  startTransition,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Ticket,
  Check,
} from "lucide-react";
import { MainButton } from "./Buttons";
import { ActionResponse, verifyOtpAction } from "@/src/actions/auth.actions";
import { useParams } from "next/navigation";
import { ErrorState, VerifyOtpPayload } from "@/src/types/auth";
import { div } from "framer-motion/client";

/**
 * REUSABLE NEO-BRUTAL BUTTON
 */

const OTPVerifier = () => {
  const initialState: ActionResponse = {
    success: true,
    error: false,
    message: null,
    data: null,
  };

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [email] = useState("creator@easythumbnail.com");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [state, dispatcher, isPending] = useActionState<
    ActionResponse,
    VerifyOtpPayload
  >(verifyOtpAction, initialState);
  const token = useParams();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    let sender = "otp-resender";
    const code = otp.join("").toString();
    let userToken = token.token!?.toString();
    startTransition(() => {
      dispatcher({ code, userToken, sender });
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const code = otp.join("").toString();
    let userToken = token.token!?.toString();
    if (code.length < 6) return;
    let sender = "otp-verifier";
    startTransition(() => {
      dispatcher({ code, userToken, sender });
    });
    console.log(state);
  };

  const IsDisabled = isPending || otp.join("").length <= 5;

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-4 font-sans text-black">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-md bg-white border-[6px] border-black rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12"
      >
        {/* TOP ICON */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-md md:text-xl  font-black uppercase tracking-tighter leading-[0.9] text-black mb-6 text-center"
        >
          FREE AI <br />
          <span className="bg-[#F4E041] px-4 border-4 border-black inline-block transform -rotate-2">
            THUMBNAIL
          </span>
          <br /> MAKER
        </motion.h1>

        {/* MINIMALIST HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tight leading-none">
            Verify Code
          </h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-3">
            Sent to: {email}
          </p>
        </div>

        {/* OTP INPUTS */}
        <div className="flex justify-between gap-2 mb-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full h-14 md:h-16 bg-gray-50 border-4 border-black rounded-xl text-center text-xl font-black outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(177,151,252,1)] transition-all"
            />
          ))}
        </div>

        {state.error && (
          <>
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="overflow-hidden "
            >
              <div className="bg-[#FF6B6B] border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
                <AlertCircle size={18} className="shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-tight leading-tight">
                  {state.message}
                </span>
              </div>
            </motion.div>
          </>
        )}
        {state.success && state.message === "Otp Verified" && (
          <>
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="overflow-hidden "
            >
              <div className="bg-[#72D5BA] border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
                <Check size={18} className="shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-tight leading-tight">
                  {state.message}
                </span>
              </div>
            </motion.div>
          </>
        )}

        {/* ACTIONS */}
        <div className="space-y-6 mt-3">
          <MainButton
            onClick={handleVerify}
            disabled={IsDisabled}
            variant={IsDisabled ? "disabled" : "purple"}
            className={IsDisabled ? "cursor-not-allowed" : "cursor-pointer"}
          >
            {isPending ? "Verifying..." : "Confirm"}
          </MainButton>

          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`font-black cursor-pointer text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 mx-auto transition-colors ${
                canResend
                  ? "text-black underline decoration-2 underline-offset-4 hover:text-[#B197FC]"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <RefreshCcw size={12} />
              {canResend ? "Resend" : `Resend in ${timer}s`}
            </button>
          </div>
        </div>

        {/* MINIMALIST FOOTER */}
        <div className="mt-10 pt-6 border-t-2 border-gray-100 flex justify-center">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-300">
            <CheckCircle2 size={10} />
            Verified Secure
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerifier;
