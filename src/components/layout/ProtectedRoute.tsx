import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { useAuth } from "../../hooks/useAuth";
import type { UserRole } from "../../types/user";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-900">
        <p className="text-sm text-zinc-600">Carregando...</p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}