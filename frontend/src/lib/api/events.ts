import { fetchJson } from "./apiClient";

export interface EventApiDto {
  id: number;
  title: string;
  slug: string;
  description: string;
  eventType: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
  online: boolean;
  registrationUrl?: string;
  status: "DRAFT" | "UPCOMING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export const eventsApi = {
  getAllEvents: () => fetchJson<EventApiDto[]>("/api/events"),
  getUpcomingEvents: () => fetchJson<EventApiDto[]>("/api/events/upcoming"),
  getEventBySlug: (slug: string) => fetchJson<EventApiDto>(`/api/events/slug/${slug}`)
};
