import { fetchJson } from "./apiClient";

export interface MemberSignupRequestDto {
  fullName: string;
  email: string;
  password: string;
}

export interface MemberSigninRequestDto {
  email: string;
  password: string;
}

export interface MemberOtpVerifyRequestDto {
  email: string;
  otp: string;
}

export interface MemberOtpChallengeResponseDto {
  email: string;
  message: string;
  devOtp?: string;
}

export interface MemberAuthResponseDto {
  status: "NOT_APPLIED" | "PENDING" | "APPROVED" | "REJECTED";
  applicationId?: number;
  memberId?: number;
  accountSubjectId: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
}

export interface MembershipApplicationRequestDto {
  googleSubjectId: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  affiliation?: string;
  role?: string;
  country?: string;
  areasOfInterest: string;
  bio?: string;
  motivation?: string;
  website?: string;
}

export interface MembershipApplicationResponseDto {
  id: number;
  googleSubjectId: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  affiliation?: string;
  role?: string;
  country?: string;
  areasOfInterest: string;
  bio?: string;
  motivation?: string;
  website?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface MemberDto {
  id: number;
  googleSubjectId: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  affiliation?: string;
  role?: string;
  country?: string;
  areasOfInterest?: string;
  status: "ACTIVE" | "SUSPENDED";
  joinedAt: string;
}

export interface PublicMemberDto {
  id: number;
  fullName: string;
  affiliation?: string;
  role?: string;
  country?: string;
  profileImageUrl?: string;
  joinedAt?: string;
}

export const memberAuthApi = {
  signup: (data: MemberSignupRequestDto) =>
    fetchJson<MemberOtpChallengeResponseDto>("/api/members/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  signin: (data: MemberSigninRequestDto) =>
    fetchJson<MemberOtpChallengeResponseDto>("/api/members/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  verifyOtp: (data: MemberOtpVerifyRequestDto) =>
    fetchJson<MemberAuthResponseDto>("/api/members/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  submitApplication: (data: MembershipApplicationRequestDto) =>
    fetchJson<MembershipApplicationResponseDto>("/api/members/apply", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getPublicDirectory: () => fetchJson<PublicMemberDto[]>("/api/members/directory"),

  // Admin Member Endpoints
  getAdminApplications: () =>
    fetchJson<MembershipApplicationResponseDto[]>("/api/admin/members/applications"),

  approveApplication: (id: number) =>
    fetchJson<MembershipApplicationResponseDto>(`/api/admin/members/applications/${id}/approve`, {
      method: "PUT",
    }),

  rejectApplication: (id: number) =>
    fetchJson<MembershipApplicationResponseDto>(`/api/admin/members/applications/${id}/reject`, {
      method: "PUT",
    }),

  getAdminMembersList: () => fetchJson<MemberDto[]>("/api/admin/members/list"),
};
