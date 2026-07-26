"use client";

import React, { createContext, useCallback, useContext, useState, useSyncExternalStore } from "react";
import { AUTH_CHANGE_EVENT, getStoredToken } from "@/lib/api/apiClient";
import type { LoginRequestDto } from "@/lib/api/auth";
import { authApi } from "@/lib/api/auth";

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
  closeLoginModal: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAdmin = useSyncExternalStore(subscribeToAuth, getAuthSnapshot, getServerAuthSnapshot);
  const adminEmail = useSyncExternalStore(
    subscribeToAuth,
    getAdminEmailSnapshot,
    getServerEmailSnapshot
  );
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = useCallback(async (credentials: LoginRequestDto) => {
    const res = await authApi.login(credentials);
    if (res?.token) {
      const email = res.email || credentials.email || "admin@posthumanlab.org";
      localStorage.setItem("posthuman_admin_email", email);
      window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
      setShowLoginModal(false);
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    localStorage.removeItem("posthuman_admin_email");
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        adminEmail,
        loading: false,
        login,
        logout,
        showLoginModal,
        openLoginModal: () => setShowLoginModal(true),
        closeLoginModal: () => setShowLoginModal(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

function subscribeToAuth(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === "posthuman_auth_token" ||
      event.key === "posthuman_admin_email"
    ) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(AUTH_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(AUTH_CHANGE_EVENT, callback);
  };
}

function getAuthSnapshot() {
  return !!getStoredToken();
}

function getServerAuthSnapshot() {
  return false;
}

function getAdminEmailSnapshot() {
  if (typeof window === "undefined" || !getStoredToken()) return null;
  return localStorage.getItem("posthuman_admin_email") || "admin@posthumanlab.org";
}

function getServerEmailSnapshot() {
  return null;
}
