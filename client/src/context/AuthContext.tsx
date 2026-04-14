"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { GenrateFormType, INITIAL_FORM_STATE } from "../types/dashboard.type";
import { AuthSuccess, DashboardTab, UserType } from "../types/authType";
import toast from "react-hot-toast";

type AuthContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
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
  user: initialUser,
}: {
  children: ReactNode;
  user: UserType;
}) => {
  const [user, setUser] = useState<UserType>(initialUser);

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
    toast.success("Form reset successfully!");
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
        setUser,
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
