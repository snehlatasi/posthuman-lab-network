"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { GoogleAuthResponseDto, GoogleAuthRequestDto } from "@/lib/api/memberAuth";
import { memberAuthApi } from "@/lib/api/memberAuth";

interface MemberUser {
  googleSubjectId: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  status: "NOT_APPLIED" | "PENDING" | "APPROVED" | "REJECTED";
}

interface MemberContextType {
  member: MemberUser | null;
  loading: boolean;
  loginWithGoogle: (googleData: GoogleAuthRequestDto) => Promise<GoogleAuthResponseDto>;
  logoutMember: () => void;
  updateMemberStatus: (status: MemberUser["status"]) => void;
}

const MemberContext = createContext<MemberContextType>({
  member: null,
  loading: true,
  loginWithGoogle: async () => ({ status: "NOT_APPLIED", email: "", fullName: "" }),
  logoutMember: () => {},
  updateMemberStatus: () => {},
});

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<MemberUser | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("posthuman_member_user");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          localStorage.removeItem("posthuman_member_user");
        }
      }
    }
    return null;
  });

  const [loading] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return false;
    }
    return true;
  });

  useEffect(() => {
    // Background re-validation of cached member status against backend
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("posthuman_member_user") : null;
    if (stored) {
      try {
        const cached: MemberUser = JSON.parse(stored);
        if (cached && cached.googleSubjectId) {
          memberAuthApi
            .verifyGoogleIdentity({
              googleSubjectId: cached.googleSubjectId,
              email: cached.email,
              fullName: cached.fullName,
              profileImageUrl: cached.profileImageUrl,
            })
            .then((res) => {
              if (res && res.status && res.status !== cached.status) {
                const updated: MemberUser = { ...cached, status: res.status };
                setMember(updated);
                if (typeof window !== "undefined") {
                  localStorage.setItem("posthuman_member_user", JSON.stringify(updated));
                }
              }
            })
            .catch(() => {
              // Ignore network errors on background revalidation
            });
        }
      } catch {
        // Ignore parse error
      }
    }
  }, []);

  const loginWithGoogle = async (
    googleData: GoogleAuthRequestDto
  ): Promise<GoogleAuthResponseDto> => {
    const res = await memberAuthApi.verifyGoogleIdentity(googleData);
    const userState: MemberUser = {
      googleSubjectId: googleData.googleSubjectId,
      email: res.email || googleData.email,
      fullName: res.fullName || googleData.fullName,
      profileImageUrl: res.profileImageUrl || googleData.profileImageUrl,
      status: res.status,
    };
    setMember(userState);
    if (typeof window !== "undefined") {
      localStorage.setItem("posthuman_member_user", JSON.stringify(userState));
    }
    return res;
  };

  const logoutMember = () => {
    setMember(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("posthuman_member_user");
    }
  };

  const updateMemberStatus = (status: MemberUser["status"]) => {
    if (member) {
      const updated = { ...member, status };
      setMember(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("posthuman_member_user", JSON.stringify(updated));
      }
    }
  };

  return (
    <MemberContext.Provider
      value={{ member, loading, loginWithGoogle, logoutMember, updateMemberStatus }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);
