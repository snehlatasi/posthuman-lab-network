const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("posthuman_auth_token");
}

export function setStoredToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("posthuman_auth_token", token);
  } else {
    localStorage.removeItem("posthuman_auth_token");
  }
}

export async function fetchJson<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const token = getStoredToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string> || {})
  };

  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errorDetail = "API communication failed";
    try {
      const errBody = await response.json();
      errorDetail = errBody.message || errorDetail;
    } catch {
      // JSON parsing failure fallback
    }
    throw new Error(errorDetail);
  }

  // Treat HTTP 201/204 empty responses safely
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

