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
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export const contactApi = {
  submitContactMessage: (data: ContactSubmitDto) =>
    fetchJson<ContactResponseDto>("/api/contact", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  getAllMessages: () => fetchJson<ContactResponseDto[]>("/api/contact"),
  deleteMessage: (id: number) => fetchJson<void>(`/api/contact/${id}`, { method: "DELETE" })
};
