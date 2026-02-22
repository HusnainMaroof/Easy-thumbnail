"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  showAuthPopup: boolean;
  setShowAuthPopup: React.Dispatch<React.SetStateAction<boolean>>;
  showLoginPopup: boolean;
  setShowLoginPopup: React.Dispatch<React.SetStateAction<boolean>>;
  LoginView: string;
  setLoginView: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [showAuthPopup, setShowAuthPopup] = React.useState(false);
  const [showLoginPopup, setShowLoginPopup] = React.useState(false);
  const [LoginView, setLoginView] = useState("login");

  return (
    <AuthContext.Provider
      value={{
        showAuthPopup,
        setShowAuthPopup,
        showLoginPopup,
        setShowLoginPopup,
        LoginView,
        setLoginView,
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
