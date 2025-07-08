import api from "../services/api";

export interface RegisterPayload {
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
}

export async function register(payload: RegisterPayload): Promise<string> {
  const res = await api.post("/auth/register", payload);
  return res.data.message;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function getMe() {
  const res = await api.get("/auth/me", {});
  return res.data;
}
