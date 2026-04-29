import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Moon, Package, ShoppingCart, Sun, Users } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useTheme } from "../../hooks/useTheme";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const linkBaseClass =
    "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800";

  const activeLinkClass = 
    "bg-zinc-900 text-white hover:bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-100";

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-white transition-colors dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold">Mini E-commerce</h1>
            <p className="text-xs text-zinc-500">
              Logado como {user?.role === "admin" ? "Administrador" : "Cliente"}
            </p>
          </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Claro" : "Escuro"}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>
    </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl bg-white p-4 shadow-sm transition-colors dark:bg-zinc-900">
          <nav className="space-y-2">
            {user?.role === "admin" && (
              <>
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? activeLinkClass : ""}`
                  }
                >
                  <Package size={16} />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? activeLinkClass : ""}`
                  }
                >
                  <Package size={16} />
                  Produtos
                </NavLink>

                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? activeLinkClass : ""}`
                  }
                >
                  <Users size={16} />
                  Usuários
                </NavLink>
              </>
            )}

            {user?.role === "client" && (
              <>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? activeLinkClass : ""}`
                  }
                >
                  <Package size={16} />
                  Produtos
                </NavLink>

                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `${linkBaseClass} ${isActive ? activeLinkClass : ""}`
                  }
                >
                  <ShoppingCart size={16} />
                  
                  <span className="flex-1">Carrinho</span>
                  
                  {totalItems > 0 && (
                  <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-bold text-zinc-900">
                    {totalItems}
                  </span>
                )}
              </NavLink>
              </>
            )}
          </nav>
        </aside>

        <section className="rounded-2xl bg-white p-6 shadow-sm transition-colors dark:bg-zinc-900">
          {children}
        </section>
      </div>
    </main>
  );
}