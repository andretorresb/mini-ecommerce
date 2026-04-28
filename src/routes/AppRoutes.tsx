import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../pages/Login";
import { Unauthorized } from "../pages/Unauthorized";

import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { UsersPage } from "../pages/admin/UsersPage";
import { ProductsAdminPage } from "../pages/admin/ProductsAdminPage";

import { ProductsPage } from "../pages/client/ProductsPage";
import { CartPage } from "../pages/client/CartPage";
import { CheckoutPage } from "../pages/client/CheckoutPage";

import { ProtectedRoute } from "../components/layout/ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}>
        <UsersPage />
      </ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute allowedRoles={["admin"]}>
        <ProductsAdminPage />
      </ProtectedRoute>} />

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}