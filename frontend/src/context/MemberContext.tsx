"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { createContext, useContext, useState, useEffect } from "react";
import { memberAuthApi, GoogleAuthResponseDto, GoogleAuthRequestDto } from "@/lib/api/memberAuth";

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
  updateMemberStatus: () => {}
});

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<MemberUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("posthuman_member_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setMember(parsed);
        } catch {
          localStorage.removeItem("posthuman_member_user");
        }
      }
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = async (googleData: GoogleAuthRequestDto): Promise<GoogleAuthResponseDto> => {
    const res = await memberAuthApi.verifyGoogleIdentity(googleData);
    const userState: MemberUser = {
      googleSubjectId: googleData.googleSubjectId,
      email: res.email || googleData.email,
      fullName: res.fullName || googleData.fullName,
      profileImageUrl: res.profileImageUrl || googleData.profileImageUrl,
      status: res.status
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
    <MemberContext.Provider value={{ member, loading, loginWithGoogle, logoutMember, updateMemberStatus }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);
