import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../pages/Login";
import { Unauthorized } from "../pages/Unauthorized";

import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { UsersPage } from "../pages/admin/UsersPage";
import { ProductsAdminPage } from "../pages/admin/ProductsAdminPage";

import { ProductsPage } from "../pages/client/ProductsPage";
import { CartPage } from "../pages/client/CartPage";
import { CheckoutPage } from "../pages/client/CheckoutPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/products" element={<ProductsAdminPage />} />

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}