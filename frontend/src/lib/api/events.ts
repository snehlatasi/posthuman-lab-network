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
  getAllAdminEvents: () => fetchJson<EventApiDto[]>("/api/events/admin/all"),
  getEventBySlug: (slug: string) => fetchJson<EventApiDto>(`/api/events/slug/${slug}`),
  createEvent: (data: Partial<EventApiDto>) => fetchJson<EventApiDto>("/api/events", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  updateEvent: (id: number, data: Partial<EventApiDto>) => fetchJson<EventApiDto>(`/api/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  deleteEvent: (id: number) => fetchJson<void>(`/api/events/${id}`, {
    method: "DELETE"
  }),
  publishEvent: (id: number) => fetchJson<EventApiDto>(`/api/events/${id}/publish`, {
    method: "PUT"
  }),
  unpublishEvent: (id: number) => fetchJson<EventApiDto>(`/api/events/${id}/unpublish`, {
    method: "PUT"
  })
};

