import { useEffect, useState } from "react";

import { ProductCard } from "../../components/product/ProductCard";
import { getProducts } from "../../services/productService";
import type { Product } from "../../types/product";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getProducts();

        setProducts(data);
      } catch {
        setErrorMessage("Não foi possível carregar os produtos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Produtos</h1>
        <p className="mt-4 text-sm text-zinc-500">Carregando produtos...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Produtos</h1>

        <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Produtos</h1>

        <div className="mt-4 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600">
          Nenhum produto encontrado.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Produtos</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Confira os produtos disponíveis na loja.
          </p>
        </div>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600">
          {products.length} produtos
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}