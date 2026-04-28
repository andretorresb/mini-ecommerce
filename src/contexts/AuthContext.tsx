import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { api } from "../services/api";
import type { AuthUser, User, UserRole } from "../types/user";

interface AuthContextData {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

const STORAGE_KEY = "@mini-ecommerce:user";

function getUserRole(username: string): UserRole {
  if (username === "mor_2314") {
    return "admin";
  }

  return "client";
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  async function login(username: string, password: string) {
    const loginResponse = await api.post("/auth/login", {
      username,
      password,
    });

    const token = loginResponse.data.token;

    const usersResponse = await api.get<User[]>("/users");

    const foundUser = usersResponse.data.find(
      (item) => item.username === username
    );

    if (!foundUser) {
      throw new Error("Usuário não encontrado.");
    }

    const authUser: AuthUser = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      role: getUserRole(foundUser.username),
      token,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);

    return authUser;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}