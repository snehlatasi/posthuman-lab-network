"use client";

import React, { createContext, useContext, useState } from "react";
import type {
  MemberAuthResponseDto,
  MemberOtpChallengeResponseDto,
  MemberOtpVerifyRequestDto,
  MemberSigninRequestDto,
  MemberSignupRequestDto,
} from "@/lib/api/memberAuth";
import { memberAuthApi } from "@/lib/api/memberAuth";

interface MemberUser {
  accountSubjectId: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  status: "NOT_APPLIED" | "PENDING" | "APPROVED" | "REJECTED";
}

interface MemberContextType {
  member: MemberUser | null;
  loading: boolean;
  signup: (data: MemberSignupRequestDto) => Promise<MemberOtpChallengeResponseDto>;
  signin: (data: MemberSigninRequestDto) => Promise<MemberOtpChallengeResponseDto>;
  verifyOtp: (data: MemberOtpVerifyRequestDto) => Promise<MemberAuthResponseDto>;
  logoutMember: () => void;
  updateMemberStatus: (status: MemberUser["status"]) => void;
}

const MemberContext = createContext<MemberContextType>({
  member: null,
  loading: true,
  signup: async () => ({ email: "", message: "" }),
  signin: async () => ({ email: "", message: "" }),
  verifyOtp: async () => ({
    status: "NOT_APPLIED",
    accountSubjectId: "",
    email: "",
    fullName: "",
  }),
  logoutMember: () => {},
  updateMemberStatus: () => {},
});

const isDemoMember = (member: MemberUser): boolean =>
  "googleSubjectId" in member ||
  member.accountSubjectId?.startsWith("demo-google-") ||
  member.accountSubjectId?.startsWith("google-sub-");

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<MemberUser | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("posthuman_member_user");
      if (stored) {
        try {
          const cached = JSON.parse(stored) as MemberUser;
          if (isDemoMember(cached)) {
            localStorage.removeItem("posthuman_member_user");
            localStorage.removeItem("posthuman_demo_google_identity");
            return null;
          }
          return cached;
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

  const signup = (data: MemberSignupRequestDto) => memberAuthApi.signup(data);
  const signin = (data: MemberSigninRequestDto) => memberAuthApi.signin(data);

  const verifyOtp = async (data: MemberOtpVerifyRequestDto): Promise<MemberAuthResponseDto> => {
    const res = await memberAuthApi.verifyOtp(data);
    const userState: MemberUser = {
      accountSubjectId: res.accountSubjectId,
      email: res.email,
      fullName: res.fullName,
      profileImageUrl: res.profileImageUrl,
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
      value={{ member, loading, signup, signin, verifyOtp, logoutMember, updateMemberStatus }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);
