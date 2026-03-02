"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { GenrateFormType } from "../types/dashboard.type";

type UserType = {
  userToken: string;
  displayName: string;
  email: string;
} | null;

type AuthContextType = {
  user: UserType;
  showAuthPopup: boolean;
  setShowAuthPopup: React.Dispatch<React.SetStateAction<boolean>>;
  showLoginPopup: boolean;
  setShowLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
  showEmailPopUp: boolean;
  setshowEmailPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  LoginView: string;
  setLoginView: React.Dispatch<React.SetStateAction<string>>;
  emailVeriferAction: string;
  setEmailVeriferAction: React.Dispatch<React.SetStateAction<string>>;
  generateForm: GenrateFormType;
  setGenerateForm: React.Dispatch<React.SetStateAction<GenrateFormType>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: UserType;
}) => {
  const [showAuthPopup, setShowAuthPopup] = React.useState(false);
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);
  const [LoginView, setLoginView] = useState("login");
  const [showEmailPopUp, setshowEmailPopUp] = useState(false);
  const [emailVeriferAction, setEmailVeriferAction] = useState("");
  const [generateForm, setGenerateForm] = useState<GenrateFormType>({
    platform: "",
    title: "",
    aiHook: false,
    niche: "",
    emotion: "",
    style: "",
    subjectType: "",
    placement: "",
    textIntensity: "",
    highlight: "",
    background: "",
  });

  return (
    <AuthContext.Provider
      value={{
        generateForm,
        setGenerateForm,
        user,
        showAuthPopup,
        setShowAuthPopup,
        showLoginPopup,
        setShowLoginPopup,
        LoginView,
        setLoginView,
        showEmailPopUp,
        setshowEmailPopUp,
        emailVeriferAction,
        setEmailVeriferAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
