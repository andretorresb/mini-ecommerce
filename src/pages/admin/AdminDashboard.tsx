import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Users } from "lucide-react";

import { getProducts } from "../../services/productService";
import { getUsers } from "../../services/userService";

export function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);

        const [products, users] = await Promise.all([
          getProducts(),
          getUsers(),
        ]);

        setTotalProducts(products.length);
        setTotalUsers(users.length);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-4 text-sm text-zinc-500">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Visão geral do painel administrativo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">
                Total de produtos
              </p>

              <strong className="mt-2 block text-3xl font-bold text-zinc-900">
                {totalProducts}
              </strong>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <Package size={24} />
            </div>
          </div>

          <Link
            to="/admin/products"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition hover:gap-3"
          >
            Gerenciar produtos
            <ArrowRight size={16} />
          </Link>
        </article>

        <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">
                Total de usuários
              </p>

              <strong className="mt-2 block text-3xl font-bold text-zinc-900">
                {totalUsers}
              </strong>
            </div>

            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <Users size={24} />
            </div>
          </div>

          <Link
            to="/admin/users"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition hover:gap-3"
          >
            Gerenciar usuários
            <ArrowRight size={16} />
          </Link>
        </article>
      </div>

      <section className="mt-6 rounded-2xl border border-zinc-200 p-5">
        <h2 className="text-lg font-bold">Sobre o sistema</h2>

        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Este painel permite que o usuário administrador gerencie produtos e
          usuários usando dados mockados no LocalStorage, simulando operações de
          criação, edição e exclusão.
        </p>
      </section>
    </div>
  );
}