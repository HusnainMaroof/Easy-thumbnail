"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Hexagon } from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";

const AuthPopUp = () => {
  const { showAuthPopup, setShowAuthPopup, setShowLoginPopup, setLoginView } =
    useAuthContext();

  const handleLogin = (i: string) => {
    if (i === "signUp") {
      setLoginView("signup");
    } else {
      setLoginView("login");
    }
    setShowLoginPopup(true);
    setShowAuthPopup(false);
  };
  return (
    <AnimatePresence>
      {showAuthPopup && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuthPopup(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* MODAL CONTENT */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white border-[6px] border-black rounded-[2.5rem] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowAuthPopup(false)}
              className="absolute top-6 right-6 p-1 text-gray-300 hover:text-black transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* LOGO ICON */}
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

            {/* TEXT CONTENT */}
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4 text-black">
              Welcome Back
            </h2>
            <p className="text-gray-500 font-bold text-sm leading-relaxed mb-10">
              Please log in to your account to generate content. <br /> Sign in
              to continue!
            </p>

            {/* ACTIONS */}
            <div className="space-y-6">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 6px 0px 0px rgba(0,0,0,1)",
                }}
                whileTap={{
                  scale: 0.98,
                  boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
                }}
                onClick={() => handleLogin("login")}
                className={`cursor-pointer relative w-full py-4 border-4 border-black rounded-2xl font-black uppercase text-sm tracking-wide transition-all shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] bg-[#B197FC] text-white
      `}
              >
                Log In
              </motion.button>

              <div className="text-center font-bold text-sm text-gray-500 mt-4">
                Don't have an account?{" "}
                <button
                  onClick={() => handleLogin("signUp")}
                  className="text-[#88AAEE]  hover:text-[#7799dd] cursor-pointer hover:btn-blue underline decoration-2 underline-offset-4 transition-colors"
                >
                  Sign up
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthPopUp;
