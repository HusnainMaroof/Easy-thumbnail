"use client";

import React, { useActionState, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Hexagon,
  Mail,
  Lock,
  User,
  Chrome,
  Unlock,
  Form,
  Verified,
} from "lucide-react";
import { useAuthContext } from "@/src/context/AuthContext";
import { CustomInput } from "./Inputs";
import { MainButton } from "./Buttons";
import { loginSchema, registerSchema } from "@/src/validator/auth.validator";

import z, { ZodError } from "zod";
import {
  regUserAction,
  ActionResponse,
  loginAction,
} from "@/src/actions/auth.actions";
import { validateForm } from "@/src/validator/validate";
import { useRouter } from "next/navigation";

export const LogInPopUp = () => {
  const router = useRouter();
  const {
    showLoginPopup,
    setShowLoginPopup,
    LoginView,
    setLoginView,
    showEmailPopUp,
    setshowEmailPopUp,
    setEmailVeriferAction
  } = useAuthContext();
  type FormErrors = z.ZodFlattenedError<
    z.infer<typeof registerSchema>
  >["fieldErrors"];

  const initialState: ActionResponse = {
    success: false,
    error: false,
    message: null,
    data: null,
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const isLogin = LoginView === "login";
  const actions = isLogin ? loginAction : regUserAction;
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(actions, initialState);

  const handleFormAction = async (formData: FormData) => {
    setErrors({});
    // console.log(formData);

    if (isLogin) {
      const result = validateForm(loginSchema, formData);

      if (!result.success) {
        setErrors(result?.errors);

        return;
      }
    } else {
      const result = validateForm(registerSchema, formData);

      if (!result.success) {
        setErrors(result?.errors);

        return;
      }
    }

    setErrors({});

    return formAction(formData);
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setDisplayName("");
    setShowPass(false);
    setErrors({});
  }, [showLoginPopup, LoginView]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const IsDisabled: boolean =
    isPending || !email || !password || (!isLogin && !displayName);

  useEffect(() => {
    if (state.error) {
      setErrors({ email: [state.message] });
    }

    if (state.success && state.message === "Otp sended") {
      router.push(`/auth/verify-otp/${state.data.userToken}`);
    }
  }, [state]);

  return (
    <AnimatePresence mode="wait">
      {showLoginPopup && (
        <div className="fixed  inset-0 z-100 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm min-h-screen">
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginPopup(false)}
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px] bg-black/40 backdrop-blur-sm"
          />

          {/* MODAL CONTENT */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md max-h-[95vh] overflow-y-auto scrollbar-custom bg-white border-[6px] border-black rounded-[2.5rem] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 "
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

            <form action={handleFormAction} noValidate>
              <motion.div layout className="space-y-2 mb-4 w-full">
                <AnimatePresence mode="popLayout">
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      key="display-name"
                    >
                      <CustomInput
                        err={errors?.displayName?.[0] ?? ""}
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                        label="Display Name"
                        name="displayName"
                        icon={User}
                        placeholder="e.g. MrBeast Fan"
                        type="text"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <CustomInput
                  err={errors?.email?.[0] ?? ""}
                  name="email"
                  label="Email Address"
                  icon={Mail}
                  type=""
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {state.error && (
                  <>
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                      animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
                      exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                      className="overflow-hidden "
                    >
                      <div className="bg-[#FF6B6B] border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
                        <Verified size={18} className="shrink-0" />
                        <span className="text-[11px] font-black uppercase tracking-tight leading-tight">
                          Verify Your Email
                          <span
                            onClick={() => {
                              setEmail("");
                              setPassword("");
                              setDisplayName("");
                              setShowPass(false);
                              setErrors({});
                              setShowLoginPopup(false);
                              setshowEmailPopUp(true);
                            }}
                            className="underline text-green-300 pl-1 cursor-pointer"
                          >
                            click Here
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  </>
                )}
                <CustomInput
                  err={errors?.password?.[0] ?? ""}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  label="Password"
                  icon={showPass ? Unlock : Lock}
                  placeholder="••••••••"
                  type={showPass ? "text" : "password"}
                  Click={() => setShowPass((prev) => !prev)}
                />

                <span
                  onClick={() => {
                    setEmail("");
                    setPassword("");
                    setDisplayName("");
                    setShowPass(false);
                    setErrors({});
                    setShowLoginPopup(false);
                    setshowEmailPopUp(true);
                    setEmailVeriferAction("reset-pass")
                  }}
                  className=" cursor-pointer text-right block underline text-[#88AAEE] hover:text-[#7799dd]"
                >
                  Forgot Password
                </span>
              </motion.div>
              <motion.div layout className="space-y-4">
                <div>
                  <MainButton
                    disabled={IsDisabled}
                    type="submit"
                    variant={IsDisabled ? "disabled" : "purple"}
                    className={
                      IsDisabled ? "cursor-not-allowed" : "cursor-pointer"
                    }
                  >
                    {isPending
                      ? isLogin
                        ? "Signing In..." // Login is pending
                        : "Creating Account..." // Signup is pending
                      : isLogin
                        ? "Sign In" // Login ready
                        : "Create Account"}
                  </MainButton>
                </div>
                <div className="relative flex items-center py-2">
                  <div className="grow border-t-2 border-gray-100"></div>
                  <span className="shrink mx-4 text-[10px] font-black text-gray-300 uppercase">
                    Or
                  </span>
                  <div className="grow border-t-2 border-gray-100"></div>
                </div>

                <MainButton variant="google" className="cursor-pointer">
                  Continue with Google
                </MainButton>
                <div className="text-center font-bold text-xs text-gray-400 pt-4">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setLoginView(isLogin ? "signup" : "login")}
                    className="text-[#88AAEE]  hover:text-[#7799dd] cursor-pointer hover:btn-blue underline decoration-2 underline-offset-4 transition-colors"
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
