export interface CreateUserRequest {
  name: string;
  password: string;
  email: string;
  cpf: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  userId: number;
  role: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  cellphone: string | null;
  cpf: string;
  type: string;
  birthDate: string | null;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
