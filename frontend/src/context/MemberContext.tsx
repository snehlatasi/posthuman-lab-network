"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
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

const MEMBER_STORAGE_KEY = "posthuman_member_user";
const DEMO_MEMBER_STORAGE_KEY = "posthuman_demo_google_identity";
const MEMBER_CHANGE_EVENT = "posthuman-member-change";

const isDemoMember = (member: MemberUser): boolean =>
  "googleSubjectId" in member ||
  member.accountSubjectId?.startsWith("demo-google-") ||
  member.accountSubjectId?.startsWith("google-sub-");

let cachedMemberRaw: string | null | undefined;
let cachedMember: MemberUser | null = null;

const notifyMemberChanged = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(MEMBER_CHANGE_EVENT));
  }
};

const getStoredMemberSnapshot = (): MemberUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(MEMBER_STORAGE_KEY);
  if (stored === cachedMemberRaw) {
    return cachedMember;
  }

  cachedMemberRaw = stored;
  cachedMember = null;

  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored) as MemberUser;
    if (isDemoMember(parsed)) {
      localStorage.removeItem(MEMBER_STORAGE_KEY);
      localStorage.removeItem(DEMO_MEMBER_STORAGE_KEY);
      cachedMemberRaw = null;
      return null;
    }

    cachedMember = parsed;
    return cachedMember;
  } catch {
    localStorage.removeItem(MEMBER_STORAGE_KEY);
    cachedMemberRaw = null;
    return null;
  }
};

const getServerMemberSnapshot = (): MemberUser | null => null;

const subscribeToMember = (callback: () => void) => {
  window.addEventListener(MEMBER_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(MEMBER_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const persistMember = (member: MemberUser | null) => {
  if (typeof window === "undefined") {
    return;
  }

  if (member) {
    localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(member));
  } else {
    localStorage.removeItem(MEMBER_STORAGE_KEY);
  }
  notifyMemberChanged();
};

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const member = useSyncExternalStore(
    subscribeToMember,
    getStoredMemberSnapshot,
    getServerMemberSnapshot,
  );

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
    persistMember(userState);
    return res;
  };

  const logoutMember = () => {
    persistMember(null);
  };

  const updateMemberStatus = (status: MemberUser["status"]) => {
    if (member) {
      const updated = { ...member, status };
      persistMember(updated);
    }
  };

  return (
    <MemberContext.Provider
      value={{ member, loading: false, signup, signin, verifyOtp, logoutMember, updateMemberStatus }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => useContext(MemberContext);
