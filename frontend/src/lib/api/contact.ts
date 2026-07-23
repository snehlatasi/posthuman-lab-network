import { fetchJson } from "./apiClient";

export interface ContactSubmitDto {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponseDto {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "NEW" | "READ" | "ARCHIVED";
  createdAt: string;
}

export const contactApi = {
  submitContactMessage: (data: ContactSubmitDto) =>
    fetchJson<ContactResponseDto>("/api/contact", {
      method: "POST",
      body: JSON.stringify(data)
    })
};
