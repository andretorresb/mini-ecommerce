import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Edit, Plus, Trash2, X } from "lucide-react";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  type UserFormData,
} from "../../services/userService";
import type { User } from "../../types/user";

const INITIAL_FORM_DATA: UserFormData = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  phone: "",
  role: "client",
};

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<UserFormData>(INITIAL_FORM_DATA);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadUsers() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getUsers();

      setUsers(data);
    } catch {
      setErrorMessage("Não foi possível carregar os usuários.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function handleOpenCreateForm() {
    setEditingUser(null);
    setFormData(INITIAL_FORM_DATA);
    setIsFormOpen(true);
  }

  function handleOpenEditForm(user: User) {
    setEditingUser(user);

    setFormData({
      firstname: user.name.firstname,
      lastname: user.name.lastname,
      email: user.email,
      username: user.username,
      password: user.password || "",
      phone: user.phone,
      role: user.role || "client",
    });

    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingUser(null);
    setFormData(INITIAL_FORM_DATA);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
      } else {
        await createUser(formData);
      }

      await loadUsers();
      handleCloseForm();
    } catch {
      setErrorMessage("Não foi possível salvar o usuário.");
    }
  }

  async function handleDelete(userId: number) {
    const confirmed = window.confirm("Deseja realmente excluir este usuário?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(userId);
      await loadUsers();
    } catch {
      setErrorMessage("Não foi possível excluir o usuário.");
    }
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Gerenciar usuários</h1>
        <p className="mt-4 text-sm text-zinc-500">Carregando usuários...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerenciar usuários</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Cadastre, edite e remova usuários do sistema.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          <Plus size={16} />
          Novo usuário
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {isFormOpen && (
        <section className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {editingUser ? "Editar usuário" : "Novo usuário"}
            </h2>

            <button
              type="button"
              onClick={handleCloseForm}
              className="rounded-lg p-2 transition hover:bg-zinc-200"
              aria-label="Fechar formulário"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstname"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Nome
              </label>

              <input
                id="firstname"
                type="text"
                value={formData.firstname}
                onChange={(event) =>
                  setFormData({ ...formData, firstname: event.target.value })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Sobrenome
              </label>

              <input
                id="lastname"
                type="text"
                value={formData.lastname}
                onChange={(event) =>
                  setFormData({ ...formData, lastname: event.target.value })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                E-mail
              </label>

              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Telefone
              </label>

              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(event) =>
                  setFormData({ ...formData, phone: event.target.value })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Usuário
              </label>

              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(event) =>
                  setFormData({ ...formData, username: event.target.value })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Senha
              </label>

              <input
                id="password"
                type="text"
                value={formData.password}
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required={!editingUser}
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Tipo de usuário
              </label>

              <select
                id="role"
                value={formData.role}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    role: event.target.value as UserFormData["role"],
                  })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              >
                <option value="client">Cliente</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                {editingUser ? "Salvar alterações" : "Cadastrar usuário"}
              </button>

              <button
                type="button"
                onClick={handleCloseForm}
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      {users.length === 0 ? (
        <div className="rounded-2xl bg-zinc-50 p-6 text-center text-sm text-zinc-600">
          Nenhum usuário cadastrado.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-200">
          <div className="hidden grid-cols-[1fr_1fr_140px_140px] bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600 md:grid">
            <span>Nome</span>
            <span>E-mail</span>
            <span>Tipo</span>
            <span className="text-right">Ações</span>
          </div>

          <div className="divide-y divide-zinc-200">
            {users.map((user) => (
              <article
                key={user.id}
                className="grid gap-4 px-4 py-4 md:grid-cols-[1fr_1fr_140px_140px] md:items-center"
              >
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    {user.name.firstname} {user.name.lastname}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">
                    @{user.username}
                  </p>
                </div>

                <p className="text-sm text-zinc-600">{user.email}</p>

                <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                  {user.role === "admin" ? "Admin" : "Cliente"}
                </span>

                <div className="flex gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => handleOpenEditForm(user)}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-100"
                  >
                    <Edit size={14} />
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(user.id)}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}