import { fetchJson, setStoredToken, getStoredToken } from "./apiClient";

export interface LoginRequestDto {
  email?: string;
  password?: string;
}

export interface LoginResponseDto {
  token: string;
  type: string;
  email: string;
  role: string;
}

export const authApi = {
  login: async (credentials: LoginRequestDto): Promise<LoginResponseDto> => {
    const res = await fetchJson<LoginResponseDto>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
    if (res?.token) {
      setStoredToken(res.token);
    }
    return res;
  },

  logout: () => {
    setStoredToken(null);
  },

  isAuthenticated: (): boolean => {
    return !!getStoredToken();
  }
};
