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

export const blogApi = {
  getPublishedBlogPosts: (): Promise<BlogPost[]> => {
    return fetchJson<BlogPost[]>("/api/blog");
  },
  getAllBlogPostsAdmin: (): Promise<BlogPost[]> => {
    return fetchJson<BlogPost[]>("/api/blog/admin/all");
  },
  getBlogPostBySlug: (slug: string): Promise<BlogPost> => {
    return fetchJson<BlogPost>(`/api/blog/${slug}`);
  },
  createBlogPost: (data: Partial<BlogPost>): Promise<BlogPost> => {
    return fetchJson<BlogPost>("/api/blog", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },
  updateBlogPost: (id: number, data: Partial<BlogPost>): Promise<BlogPost> => {
    return fetchJson<BlogPost>(`/api/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  },
  deleteBlogPost: (id: number): Promise<void> => {
    return fetchJson<void>(`/api/blog/${id}`, {
      method: "DELETE"
    });
  },
  publishBlogPost: (id: number): Promise<BlogPost> => {
    return fetchJson<BlogPost>(`/api/blog/${id}/publish`, {
      method: "PUT"
    });
  },
  unpublishBlogPost: (id: number): Promise<BlogPost> => {
    return fetchJson<BlogPost>(`/api/blog/${id}/unpublish`, {
      method: "PUT"
    });
  }
};

// Export legacy single-functions for backwards compatibility
export const getPublishedBlogPosts = blogApi.getPublishedBlogPosts;
export const getBlogPostBySlug = blogApi.getBlogPostBySlug;

