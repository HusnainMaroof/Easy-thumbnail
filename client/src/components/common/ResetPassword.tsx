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
import { MainButton } from "./Buttons";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Lock,
  LockIcon,
  Mail,
  Unlock,
  X,
} from "lucide-react";
import { CustomInput } from "./Inputs";
import z from "zod";
import { verifyPasswordSchema } from "@/src/validator/auth.validator";
import {
  ActionResponse,
  PassLinkActions,
  ResetPassowrdAction,
} from "@/src/actions/auth.actions";
import { useAuthContext } from "@/src/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { validateForm } from "@/src/validator/validate";

const ResetPassword = () => {
  const initialState: ActionResponse = {
    success: false,
    error: false,
    message: null,
    data: null,
  };

  type FormErrors = z.ZodFlattenedError<
    z.infer<typeof verifyPasswordSchema>
  >["fieldErrors"];

  const [state, dispatcher, isPending] = useActionState<
    ActionResponse,
    FormData
  >(ResetPassowrdAction, initialState);
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const origin = useParams();

  const handleFormAction = async (formData: FormData) => {
    setErrors({});

    let userToken = origin.token!?.toString();

    const validate = await validateForm(verifyPasswordSchema, formData);
    if (!validate.success) {
      setErrors(validate?.errors);
      return;
    }
    if (password !== newPassword) {
      setErrors({ newPassword: ["Password does not match"] });
      return;
    }
    formData.append("token", userToken);

    startTransition(() => {
      dispatcher(formData);
    });
  };

  useEffect(() => {
    if (state.success && state.message === "Password Reset Successfully") {
      router.push("/");
    }
  }, [state]);

  let IsDisabled = isPending || !password;

  return (
    <AnimatePresence mode="wait">
      <div className="fixed  inset-0 z-100 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm min-h-screen text-black">
        {/* OVERLAY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 
bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px] bg-black/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md max-h-[95vh] overflow-y-auto scrollbar-custom bg-white border-[6px] border-black rounded-[2.5rem] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10"
        >
          {/* TOP ICON */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-md md:text-xl  font-black uppercase tracking-tighter leading-[0.9] text-black mb-6 text-center z-1000"
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
              Reset Your Password
            </h2>
            <span></span>
          </div>
          <form action={handleFormAction} noValidate>
            <CustomInput
              err={errors?.password?.[0] ?? ""}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              label="Password"
              icon={showPass ? Unlock : LockIcon}
              placeholder="••••••••"
              type={showPass ? "text" : "password"}
              Click={() => setShowPass((prev) => !prev)}
            />
            <CustomInput
              err={errors?.newPassword?.[0] ?? ""}
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              label="New Password"
              icon={showPass ? Unlock : LockIcon}
              placeholder="••••••••"
              type={showPass ? "text" : "password"}
              Click={() => setShowPass((prev) => !prev)}
            />
            {state.error && (
              <>
                <motion.div
                  initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                  animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
                  exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                  className="overflow-hidden  rounded-lg"
                >
                  <div className="bg-[#FF6B6B] border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3 rounded-lg">
                    <AlertCircle size={18} className="shrink-0" />
                    <span className="text-[11px] font-black uppercase tracking-tight leading-tight">
                      {state.message}
                    </span>
                  </div>
                </motion.div>
              </>
            )}
            {state.success &&
              state.message === "Password Reset Successfully" && (
                <>
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                    animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                    className="overflow-hidden rounded-lg "
                  >
                    <div className="bg-[#72D5BA] border-[3px] border-black p-3 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3 rounded-lg">
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
                disabled={IsDisabled}
                variant={IsDisabled ? "disabled" : "purple"}
                className={IsDisabled ? "cursor-not-allowed" : "cursor-pointer"}
              >
                {isPending ? "Verifying..." : "Confirm"}
              </MainButton>
            </div>
          </form>

          {/* MINIMALIST FOOTER */}
          <div className="mt-10 pt-6 border-t-2 border-gray-100 flex justify-center">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-300">
              <CheckCircle2 size={10} />
              Verified Secure
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResetPassword;
