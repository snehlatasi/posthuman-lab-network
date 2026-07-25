import { fetchJson } from "./apiClient";

export interface MediaAssetDto {
  id: number;
  filename: string;
  url: string;
  originalFilename?: string;
  mimeType?: string;
  fileSizeBytes?: number;
  mediaType: "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT";
  provider: "LOCAL" | "YOUTUBE" | "EXTERNAL";
  providerVideoId?: string;
  title?: string;
  altText?: string;
  caption?: string;
  credit?: string;
  category?: string;
  featured: boolean;
  createdAt: string;
}

export interface GalleryAlbumDto {
  id: number;
  title: string;
  slug: string;
  description?: string;
  coverImageUrl?: string;
  location?: string;
  photographerCredit?: string;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface PersonDto {
  id: number;
  name: string;
  slug: string;
  role?: string;
  affiliation?: string;
  shortBio?: string;
  fullBio?: string;
  portraitUrl?: string;
  website?: string;
  orcid?: string;
  featured: boolean;
  createdAt: string;
}

export interface ConversationDto {
  id: number;
  title: string;
  slug: string;
  category?: string;
  shortDescription: string;
  longDescription?: string;
  displayNumber?: string;
  displayOrder: number;
  featured: boolean;
  createdAt: string;
}

export interface LearningResourceDto {
  id: number;
  title: string;
  slug: string;
  resourceType: "MASTERCLASS" | "COURSE" | "GUIDE" | "READING" | "WORKSHOP" | "VIDEO_RESOURCE";
  instructor?: string;
  description: string;
  coverImageUrl?: string;
  videoUrl?: string;
  duration?: string;
  difficultyLevel?: string;
  featured: boolean;
  createdAt: string;
}

export interface LabContentDto {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription?: string;
  researchFocus?: string;
  leadName?: string;
  location?: string;
  coverImageUrl?: string;
  featured: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface HomepageCurationDto {
  id: number;
  featuredMasterclassId?: number;
  featuredPublicationId?: number;
  featuredLabId?: number;
  featuredVideoId?: number;
  featuredConversationId?: number;
  announcementTitle?: string;
  announcementMessage?: string;
  announcementLink?: string;
  announcementActive: boolean;
  updatedAt?: string;
}

export interface AuditLogDto {
  id: number;
  adminEmail: string;
  action: string;
  entityType: string;
  entityId?: number;
  details?: string;
  timestamp: string;
}

export const cmsApi = {
  // Public APIs
  getMedia: () => fetchJson<MediaAssetDto[]>("/api/media"),
  getAlbums: () => fetchJson<GalleryAlbumDto[]>("/api/media/albums"),
  getPeople: () => fetchJson<PersonDto[]>("/api/people"),
  getConversations: () => fetchJson<ConversationDto[]>("/api/conversations/all"),
  getLearningResources: () => fetchJson<LearningResourceDto[]>("/api/learning"),
  getLabs: () => fetchJson<LabContentDto[]>("/api/labs"),
  getHomepageCuration: () => fetchJson<HomepageCurationDto>("/api/curation/homepage"),
  getHomepageSummary: () => fetchJson<Record<string, unknown>>("/api/public/home"),

  // Admin Media APIs
  addYouTubeVideo: (data: {
    url: string;
    title?: string;
    category?: string;
    description?: string;
  }) =>
    fetchJson<MediaAssetDto>("/api/admin/media/youtube", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteMedia: (id: number) => fetchJson<void>(`/api/admin/media/${id}`, { method: "DELETE" }),

  createAlbum: (album: Partial<GalleryAlbumDto>) =>
    fetchJson<GalleryAlbumDto>("/api/admin/media/albums", {
      method: "POST",
      body: JSON.stringify(album),
    }),

  // Admin People APIs
  getPeopleAdmin: () => fetchJson<PersonDto[]>("/api/admin/people"),
  createPerson: (person: Partial<PersonDto>) =>
    fetchJson<PersonDto>("/api/admin/people", {
      method: "POST",
      body: JSON.stringify(person),
    }),
  updatePerson: (id: number, person: Partial<PersonDto>) =>
    fetchJson<PersonDto>(`/api/admin/people/${id}`, {
      method: "PUT",
      body: JSON.stringify(person),
    }),
  deletePerson: (id: number) => fetchJson<void>(`/api/admin/people/${id}`, { method: "DELETE" }),

  // Admin Conversations APIs
  getConversationsAdmin: () => fetchJson<ConversationDto[]>("/api/admin/conversations"),
  createConversation: (conv: Partial<ConversationDto>) =>
    fetchJson<ConversationDto>("/api/admin/conversations", {
      method: "POST",
      body: JSON.stringify(conv),
    }),
  deleteConversation: (id: number) =>
    fetchJson<void>(`/api/admin/conversations/${id}`, { method: "DELETE" }),

  // Admin Learning APIs
  getLearningAdmin: () => fetchJson<LearningResourceDto[]>("/api/admin/learning"),
  createLearningResource: (res: Partial<LearningResourceDto>) =>
    fetchJson<LearningResourceDto>("/api/admin/learning", {
      method: "POST",
      body: JSON.stringify(res),
    }),
  deleteLearningResource: (id: number) =>
    fetchJson<void>(`/api/admin/learning/${id}`, { method: "DELETE" }),

  // Admin Labs APIs
  getLabsAdmin: () => fetchJson<LabContentDto[]>("/api/admin/labs"),
  createLab: (lab: Partial<LabContentDto>) =>
    fetchJson<LabContentDto>("/api/admin/labs", {
      method: "POST",
      body: JSON.stringify(lab),
    }),
  deleteLab: (id: number) => fetchJson<void>(`/api/admin/labs/${id}`, { method: "DELETE" }),

  // Admin Curation & Audit APIs
  getCurationSettings: () => fetchJson<HomepageCurationDto>("/api/admin/curation"),
  updateCurationSettings: (curation: HomepageCurationDto) =>
    fetchJson<HomepageCurationDto>("/api/admin/curation", {
      method: "PUT",
      body: JSON.stringify(curation),
    }),
  getAuditLogs: () => fetchJson<AuditLogDto[]>("/api/admin/audit"),
};
