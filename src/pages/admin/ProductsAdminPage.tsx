import { useEffect, useState } from "react";
import { Edit, Plus, Trash2, X } from "lucide-react";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  type ProductFormData,
} from "../../services/productService";
import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";

const INITIAL_FORM_DATA: ProductFormData = {
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
};

export function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<ProductFormData>(INITIAL_FORM_DATA);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    loadProducts();
  }, []);

  function handleOpenCreateForm() {
    setEditingProduct(null);
    setFormData(INITIAL_FORM_DATA);
    setIsFormOpen(true);
  }

  function handleOpenEditForm(product: Product) {
    setEditingProduct(product);

    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });

    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingProduct(null);
    setFormData(INITIAL_FORM_DATA);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }

      await loadProducts();
      handleCloseForm();
    } catch {
      setErrorMessage("Não foi possível salvar o produto.");
    }
  }

  async function handleDelete(productId: number) {
    const confirmed = window.confirm("Deseja realmente excluir este produto?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(productId);
      await loadProducts();
    } catch {
      setErrorMessage("Não foi possível excluir o produto.");
    }
  }

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Gerenciar produtos</h1>
        <p className="mt-4 text-sm text-zinc-500">Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Gerenciar produtos</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Cadastre, edite e remova produtos do catálogo.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
        >
          <Plus size={16} />
          Novo produto
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
              {editingProduct ? "Editar produto" : "Novo produto"}
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
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Nome do produto
              </label>

              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Preço
              </label>

              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    price: Number(event.target.value),
                  })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Categoria
              </label>

              <input
                id="category"
                type="text"
                value={formData.category}
                onChange={(event) =>
                  setFormData({ ...formData, category: event.target.value })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                URL da imagem
              </label>

              <input
                id="image"
                type="url"
                value={formData.image}
                onChange={(event) =>
                  setFormData({ ...formData, image: event.target.value })
                }
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Descrição
              </label>

              <textarea
                id="description"
                value={formData.description}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    description: event.target.value,
                  })
                }
                rows={4}
                className="w-full resize-none rounded-xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10"
                required
              />
            </div>

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
              >
                {editingProduct ? "Salvar alterações" : "Cadastrar produto"}
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

      {products.length === 0 ? (
        <div className="rounded-2xl bg-zinc-50 p-6 text-center text-sm text-zinc-600">
          Nenhum produto cadastrado.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="hidden grid-cols-[80px_1fr_140px_140px] bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 md:grid">
            <span>Imagem</span>
            <span>Produto</span>
            <span>Preço</span>
            <span className="text-right">Ações</span>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {products.map((product) => (
              <article
                key={product.id}
                className="grid gap-4 px-4 py-4 md:grid-cols-[80px_1fr_140px_140px] md:items-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-50 p-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {product.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {product.category}
                  </p>
                </div>

                <strong className="text-sm text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(product.price)}
                </strong>

                <div className="flex gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => handleOpenEditForm(product)}
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium transition hover:bg-zinc-100"
                  >
                    <Edit size={14} />
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
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