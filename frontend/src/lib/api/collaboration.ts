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
  status: string;
  createdAt: string;
}

export async function submitCollaborationRequest(payload: CollaborationRequestPayload): Promise<CollaborationResponse> {
  return fetchJson<CollaborationResponse>("/api/collaboration", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
