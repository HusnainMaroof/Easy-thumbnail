"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { GenrateFormType, INITIAL_FORM_STATE } from "../types/dashboard.type";
import { AuthSuccess } from "../types/authType";

type UserType = {
  
  userToken: string;
  displayName: string;
  email: string;
  SubPlans: string;
  isOnboard: boolean;
  credits: number | null;
  galleryData: any[] | null;
  
} | null;

type DashboardTab = "generate" | "review";

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
  dashboardSideBar: boolean;
  setDashboardSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  dashboardActiveTab: DashboardTab;
  setDashboardActiveTab: React.Dispatch<React.SetStateAction<DashboardTab>>;
  thumbnail: string;
  setThumnail: React.Dispatch<React.SetStateAction<string>>;
  resetgenerateForm: () => void;
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
  const [generateForm, setGenerateForm] =
    useState<GenrateFormType>(INITIAL_FORM_STATE);

  const [dashboardSideBar, setDashboardSideBar] = useState(true);
  const [dashboardActiveTab, setDashboardActiveTab] = useState<
    "generate" | "review"
  >("generate");
  const [thumbnail, setThumnail] = useState("");

  const resetgenerateForm = () => {
    setGenerateForm(INITIAL_FORM_STATE);
  };

  return (
    <AuthContext.Provider
      value={{
        thumbnail,
        setThumnail,
        dashboardActiveTab,
        setDashboardActiveTab,
        dashboardSideBar,
        setDashboardSideBar,
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
        resetgenerateForm,
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
