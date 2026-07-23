const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function fetchJson<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    }
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
