export type UserRole = "admin" | "client";

export interface User {
  id: number;
  email: string;
  username: string;
  password?: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  role?: UserRole;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  token: string;
}