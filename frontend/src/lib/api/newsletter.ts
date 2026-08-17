import { fetchJson } from "./apiClient";

export interface NewsletterSubscribeDto {
  name: string;
  email: string;
  interests?: string;
  termsAccepted: boolean;
  source?: string;
}

export interface NewsletterSubscriptionResponseDto {
  id: number;
  email: string;
  status: "ACTIVE" | "UNSUBSCRIBED";
  message: string;
}

export interface NewsletterSubscriberDto {
  id: number;
  name: string;
  email: string;
  interests?: string;
  status: "ACTIVE" | "UNSUBSCRIBED";
  source: string;
  createdAt: string;
  updatedAt: string;
  subscribedAt: string;
  unsubscribedAt?: string;
}

export const newsletterApi = {
  subscribe: (data: NewsletterSubscribeDto) =>
    fetchJson<NewsletterSubscriptionResponseDto>("/api/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getSubscribers: () => fetchJson<NewsletterSubscriberDto[]>("/api/newsletter/subscribers"),
  unsubscribeSubscriber: (id: number) =>
    fetchJson<NewsletterSubscriptionResponseDto>(`/api/newsletter/subscribers/${id}/unsubscribe`, {
      method: "PUT",
    }),
  deleteSubscriber: (id: number) =>
    fetchJson<void>(`/api/newsletter/subscribers/${id}`, { method: "DELETE" }),
};
