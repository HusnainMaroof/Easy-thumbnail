"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

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

  return (
    <AuthContext.Provider
      value={{
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
