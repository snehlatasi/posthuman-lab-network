import { fetchJson } from "./apiClient";

export interface PublicationApiDto {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  authorDisplayName: string;
  publicationType: "ARTICLE" | "ESSAY" | "RESEARCH" | "CREATIVE_WORK";
  publishedAt?: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
}

export const publicationsApi = {
  getPublishedPublications: (type?: string) => {
    const query = type ? `?type=${type}` : "";
    return fetchJson<PublicationApiDto[]>(`/api/publications${query}`);
  },
  getAllAdminPublications: () => fetchJson<PublicationApiDto[]>("/api/publications/admin/all"),
  getPublicationBySlug: (slug: string) => fetchJson<PublicationApiDto>(`/api/publications/slug/${slug}`),
  submitPublication: (data: Partial<PublicationApiDto>) => fetchJson<PublicationApiDto>("/api/publications/submit", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  createPublication: (data: Partial<PublicationApiDto>) => fetchJson<PublicationApiDto>("/api/publications", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  updatePublication: (id: number, data: Partial<PublicationApiDto>) => fetchJson<PublicationApiDto>(`/api/publications/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  deletePublication: (id: number) => fetchJson<void>(`/api/publications/${id}`, {
    method: "DELETE"
  }),
  publishPublication: (id: number) => fetchJson<PublicationApiDto>(`/api/publications/${id}/publish`, {
    method: "PUT"
  }),
  unpublishPublication: (id: number) => fetchJson<PublicationApiDto>(`/api/publications/${id}/unpublish`, {
    method: "PUT"
  })
};

