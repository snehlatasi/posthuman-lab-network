import { fetchJson } from "./apiClient";

export interface CollaborationRequestPayload {
  name: string;
  email: string;
  organization?: string;
  collaborationType?: string;
  message: string;
}

export interface CollaborationResponse {
  id: number;
  name: string;
  email: string;
  organization?: string;
  collaborationType?: string;
  message?: string;
  status: string;
  createdAt: string;
}

export type CollaborationResponseDto = CollaborationResponse;

export const collaborationApi = {
  submitCollaborationRequest: (payload: CollaborationRequestPayload): Promise<CollaborationResponse> =>
    fetchJson<CollaborationResponse>("/api/collaboration", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  getAllRequests: (): Promise<CollaborationResponse[]> => fetchJson<CollaborationResponse[]>("/api/collaboration"),
  deleteRequest: (id: number): Promise<void> => fetchJson<void>(`/api/collaboration/${id}`, { method: "DELETE" })
};

export const submitCollaborationRequest = collaborationApi.submitCollaborationRequest;

