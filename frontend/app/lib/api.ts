import axios from 'axios';
import type { CreateUserRequest, LoginRequest, LoginResponse, User } from '@/app/types/api';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function createUser(payload: CreateUserRequest): Promise<User> {
  const response = await api.post<User>('/users', payload);
  return response.data;
}

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', payload);
  return response.data;
}

export async function getUser(id: string): Promise<User> {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}
