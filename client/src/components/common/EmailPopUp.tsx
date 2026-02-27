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
import { AlertCircle, Check, CheckCircle2, Mail, X } from "lucide-react";
import { CustomInput } from "./Inputs";
import z from "zod";
import { emailSchema, verifyEmailSchema } from "@/src/validator/auth.validator";
import {
  ActionResponse,
  EmailVerifierAction,
  PassLinkActions,
} from "@/src/actions/auth.actions";
import { useAuthContext } from "@/src/context/AuthContext";
import { validateForm } from "@/src/validator/validate";
import { useRouter } from "next/navigation";
const EmailPopUp = () => {
  const { showEmailPopUp, setshowEmailPopUp, emailVeriferAction } =
    useAuthContext();
  const router = useRouter();
  const initialState: ActionResponse = {
    success: false,
    error: false,
    message: null,
    data: null,
  };

  type FormErrors = z.ZodFlattenedError<
    z.infer<typeof verifyEmailSchema>
  >["fieldErrors"];

  const [passstate, passdispatcher, passisPending] = useActionState<
    ActionResponse,
    FormData
  >(PassLinkActions, initialState);
  const [emailVerifystate, emailVerifydispatcher, emailVerifyisPending] =
    useActionState<ActionResponse, FormData>(EmailVerifierAction, initialState);

  let isPending =
    emailVeriferAction === "reset-pass" ? passisPending : emailVerifyisPending;
  let state =
    emailVeriferAction === "reset-pass" ? passstate : emailVerifystate;

  const [errors, setErrors] = useState<FormErrors>();
  const [email, setEmail] = useState("");

  const handleFormAction = async (formData: FormData) => {
    setErrors({});

    const origin = window.location.origin;

    const validate = await validateForm(verifyEmailSchema, formData);
    if (!validate.success) {
      setErrors(validate?.errors);
      return;
    }

    formData.append("origin", origin);

    startTransition(() => {
      if (emailVeriferAction === "reset-pass") return passdispatcher(formData);
      else return emailVerifydispatcher(formData);
    });
  };

  useEffect(() => {
    setErrors({});
    setEmail("");
  }, [state, showEmailPopUp]);

  let IsDisabled = isPending || !email;
  useEffect(() => {
    if (state.error) {
      setErrors({ email: [state.message] });
    }

    if (state.success && state.message === "Otp email sended") {
      router.push(`/auth/verify-otp/${state.data}`);
    }
  }, [state]);

  return (
    <AnimatePresence mode="wait">
      {showEmailPopUp && (
        <div className="fixed  inset-0 z-100 flex items-center justify-center p-4 bg-black/10 backdrop-blur-sm min-h-screen text-black">
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setshowEmailPopUp(false)}
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md max-h-[95vh] overflow-y-auto scrollbar-custom bg-white border-[6px] border-black rounded-[2.5rem] shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10"
          >
            <button
              onClick={() => setshowEmailPopUp(false)}
              className="absolute cursor-pointer top-6 right-6 p-1 text-gray-300 hover:text-black transition-colors z-10"
            >
              <X size={24} />
            </button>
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
                {emailVeriferAction === "reset-pass"
                  ? "Verify Email"
                  : "Verify Email"}
              </h2>
              <span></span>
            </div>
            <form action={handleFormAction} noValidate>
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
              {state.success && state.message === "email sended" && (
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
                        {state.success &&
                          state.message === "email sended" &&
                          " We have send email to reset you password"}
                      </span>
                    </div>
                  </motion.div>
                </>
              )}
              {state.success && state.message === "Otp email sended" && (
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
                        {state.success &&
                          state.message === "Otp email sended" &&
                          " We have send otp email "}
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
                  className={
                    IsDisabled ? "cursor-not-allowed" : "cursor-pointer"
                  }
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
      )}
    </AnimatePresence>
  );
};

export default EmailPopUp;
