"use client";

import React, { createContext, useContext, useState } from "react";
import { getStoredToken } from "@/lib/api/apiClient";
import { authApi, LoginRequestDto } from "@/lib/api/auth";

interface AuthContextType {
  isAdmin: boolean;
  adminEmail: string | null;
  loading: boolean;
  login: (credentials: LoginRequestDto) => Promise<void>;
  logout: () => void;
  showLoginModal: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  adminEmail: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  showLoginModal: false,
  openLoginModal: () => {},
  closeLoginModal: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !!getStoredToken();
    }
    return false;
  });
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    if (typeof window !== "undefined" && getStoredToken()) {
      return localStorage.getItem("posthuman_admin_email") || "admin@posthumanlab.org";
    }
    return null;
  });
  const [loading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = async (credentials: LoginRequestDto) => {
    const res = await authApi.login(credentials);
    if (res?.token) {
      setIsAdmin(true);
      const email = res.email || credentials.email || "admin@posthumanlab.org";
      setAdminEmail(email);
      localStorage.setItem("posthuman_admin_email", email);
      setShowLoginModal(false);
    }
  };

  const logout = () => {
    authApi.logout();
    localStorage.removeItem("posthuman_admin_email");
    setIsAdmin(false);
    setAdminEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        adminEmail,
        loading,
        login,
        logout,
        showLoginModal,
        openLoginModal: () => setShowLoginModal(true),
        closeLoginModal: () => setShowLoginModal(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
