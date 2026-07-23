import { fetchJson } from "./apiClient";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author?: string;
  featuredImage?: string;
  status: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  return fetchJson<BlogPost[]>("/api/blog");
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  return fetchJson<BlogPost>(`/api/blog/${slug}`);
}
