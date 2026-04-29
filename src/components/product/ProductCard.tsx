import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-48 items-center justify-center rounded-xl bg-zinc-50 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition group-hover:scale-105"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-xs font-medium uppercase text-zinc-500">
          {product.category}
        </span>

        <h2 className="mt-2 line-clamp-2 text-sm font-semibold text-zinc-900">
          {product.title}
        </h2>

        <p className="mt-2 line-clamp-3 text-sm text-zinc-500">
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          <strong className="text-lg font-bold text-zinc-900">
            {formatCurrency(product.price)}
          </strong>

          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-[0.98]"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </article>
  );
}