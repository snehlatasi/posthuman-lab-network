import { fetchJson } from "./apiClient";

export interface GoogleAuthRequestDto {
  googleSubjectId: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  idToken?: string;
}

export interface GoogleAuthResponseDto {
  status: "NOT_APPLIED" | "PENDING" | "APPROVED" | "REJECTED";
  applicationId?: number;
  memberId?: number;
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
  verifyGoogleIdentity: (data: GoogleAuthRequestDto) =>
    fetchJson<GoogleAuthResponseDto>("/api/members/auth/google", {
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
