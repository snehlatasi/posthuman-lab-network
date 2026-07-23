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
  getPublicationBySlug: (slug: string) => fetchJson<PublicationApiDto>(`/api/publications/slug/${slug}`)
};
