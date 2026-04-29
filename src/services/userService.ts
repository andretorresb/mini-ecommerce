import { api } from "./api";
import type { User, UserRole } from "../types/user";

const STORAGE_KEY = "@mini-ecommerce:users";

export interface UserFormData {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  role: UserRole;
}

function saveUsers(users: User[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getUserRole(username: string): UserRole {
  if (username === "mor_2314") {
    return "admin";
  }

  return "client";
}

export async function getUsers() {
  const storedUsers = localStorage.getItem(STORAGE_KEY);

  if (storedUsers) {
    return JSON.parse(storedUsers) as User[];
  }

  const response = await api.get<User[]>("/users");

  const usersWithRole = response.data.map((user) => ({
    ...user,
    role: getUserRole(user.username),
  }));

  saveUsers(usersWithRole);

  return usersWithRole;
}

export async function createUser(data: UserFormData) {
  const users = await getUsers();

  const newUser: User = {
    id: Date.now(),
    email: data.email,
    username: data.username,
    password: data.password,
    phone: data.phone,
    role: data.role,
    name: {
      firstname: data.firstname,
      lastname: data.lastname,
    },
  };

  const updatedUsers = [newUser, ...users];

  saveUsers(updatedUsers);

  return newUser;
}

export async function updateUser(userId: number, data: UserFormData) {
  const users = await getUsers();

  const updatedUsers = users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        email: data.email,
        username: data.username,
        password: data.password,
        phone: data.phone,
        role: data.role,
        name: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
      };
    }

    return user;
  });

  saveUsers(updatedUsers);

  return updatedUsers.find((user) => user.id === userId);
}

export async function deleteUser(userId: number) {
  const users = await getUsers();

  const updatedUsers = users.filter((user) => user.id !== userId);

  saveUsers(updatedUsers);
}