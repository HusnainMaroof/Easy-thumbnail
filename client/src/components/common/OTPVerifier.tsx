"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, RefreshCcw, CheckCircle2 } from "lucide-react";
import { MainButton } from "./Buttons";

/**
 * REUSABLE NEO-BRUTAL BUTTON
 */

const OTPVerifier = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [email] = useState("creator@easythumbnail.com");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer Logic
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
    const code = otp.join("");
    if (code.length < 6) return;
    setIsVerifying(true);
    setTimeout(() => setIsVerifying(false), 2000);
  };

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
        <div className="flex justify-between gap-2 mb-10">
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

        {/* ACTIONS */}
        <div className="space-y-6">
          <MainButton
            onClick={handleVerify}
            disabled={otp.some((d) => d === "") || isVerifying}
            className="cursor-pointer"
          >
            {isVerifying ? "Verifying..." : "Confirm"}
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
