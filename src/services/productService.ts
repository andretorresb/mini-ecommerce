import { api } from "./api";
import type { Product } from "../types/product";

export async function getProducts() {
  const response = await api.get<Product[]>("/products");

  return response.data;
}