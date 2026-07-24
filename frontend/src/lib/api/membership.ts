import { fetchJson } from "./apiClient";

export interface MembershipInterestSubmitDto {
  name: string;
  email: string;
  areaOfInterest: string;
  message?: string;
}

export interface MembershipInterestResponseDto {
  id: number;
  name: string;
  email: string;
  areaOfInterest: string;
  message?: string;
  status: "NEW" | "REVIEWED" | "CONTACTED" | "ARCHIVED";
  createdAt: string;
}

export const membershipApi = {
  submitMembershipInterest: (data: MembershipInterestSubmitDto) =>
    fetchJson<MembershipInterestResponseDto>("/api/membership/interests", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  getAllInterests: () => fetchJson<MembershipInterestResponseDto[]>("/api/membership/interests"),
  updateInterestStatus: (id: number, status: string) =>
    fetchJson<MembershipInterestResponseDto>(`/api/membership/interests/${id}/status?status=${status}`, {
      method: "PUT"
    })
};

