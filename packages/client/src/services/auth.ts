import { http } from '@/lib/http';

export interface User {
  id: string;
  email: string;
  name: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export const authService = {
  login: (data: LoginData) =>
    http.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterData) =>
    http.post<AuthResponse>('/auth/register', data),
}; 