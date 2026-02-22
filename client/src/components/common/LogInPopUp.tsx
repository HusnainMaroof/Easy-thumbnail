"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Hexagon, Mail, Lock, User, Chrome } from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";
import { CustomInput } from "./Inputs";
import { MainButton } from "./Buttons";

export const LogInPopUp = () => {
  const { showLoginPopup, setShowLoginPopup, LoginView, setLoginView } =
    useAuthContext();
  // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const isLogin = LoginView === "login";

  useEffect(() => {
    setEmail("");
    setPassword("");
    setDisplayName("");
  }, [LoginView]);

  return (
    <AnimatePresence mode="wait">
      {showLoginPopup && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginPopup(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* MODAL CONTENT */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white border-[6px] border-black rounded-[2.5rem] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 overflow-hidden"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute cursor-pointer top-6 right-6 p-1 text-gray-300 hover:text-black transition-colors z-10"
            >
              <X size={24} />
            </button>

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

            {/* HEADER */}
            <motion.div layout className="mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tight text-black leading-none">
                {isLogin ? "Welcome Back" : "Join the Studio"}
              </h2>
              <p className="text-gray-400 font-bold text-xs mt-2">
                {isLogin
                  ? "Log in to continue generating viral thumbnails."
                  : "Create an account to save your AI generations."}
              </p>
            </motion.div>

            {/* FORM FIELDS */}
            <motion.div layout className="space-y-4 mb-8">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    key="display-name"
                  >
                    <CustomInput
                      onChange={(e) => setDisplayName(e.target.value)}
                      value={displayName}
                      label="Display Name"
                      icon={User}
                      placeholder="e.g. MrBeast Fan"
                      type="text"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <CustomInput
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <CustomInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label="Password"
                icon={Lock}
                placeholder="••••••••"
                type="password"
              />
            </motion.div>

            {/* ACTIONS */}
            <motion.div layout className="space-y-4">
              <MainButton variant="purple" className="cursor-pointer">
                {isLogin ? "Sign In" : "Create Account"}
              </MainButton>
              <div className="relative flex items-center py-2">
                <div className="grow border-t-2 border-gray-100"></div>
                <span className="shrink mx-4 text-[10px] font-black text-gray-300 uppercase">
                  Or
                </span>
                <div className="grow border-t-2 border-gray-100"></div>
              </div>

              <MainButton variant="purple" className="cursor-pointer">
                Continue with Google
              </MainButton>
              <div className="text-center font-bold text-xs text-gray-400 pt-4">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => setLoginView(isLogin ? "signup" : "login")}
                  className="text-[#88AAEE]  hover:text-[#7799dd] cursor-pointer hover:btn-blue underline decoration-2 underline-offset-4 transition-colors"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
