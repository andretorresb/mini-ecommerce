import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";

export function CartPage() {
  const {
    items,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Carrinho</h1>

        <div className="mt-6 rounded-2xl bg-zinc-50 p-6 text-center">
          <p className="text-sm text-zinc-600">Seu carrinho está vazio.</p>

          <Link
            to="/products"
            className="mt-4 inline-flex rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Ver produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Carrinho</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Confira os produtos antes de finalizar a compra.
          </p>
        </div>

        <button
          type="button"
          onClick={clearCart}
          className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
        >
          Limpar carrinho
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.product.id}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 p-4 sm:flex-row sm:items-center"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-zinc-50 p-3">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h2 className="line-clamp-2 text-sm font-semibold">
                  {item.product.title}
                </h2>

                <p className="mt-1 text-sm font-bold">
                  {formatCurrency(item.product.price)}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.product.id)}
                    className="rounded-lg border border-zinc-300 p-2 transition hover:bg-zinc-100"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="min-w-8 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.product.id)}
                    className="rounded-lg border border-zinc-300 p-2 transition hover:bg-zinc-100"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <strong className="text-sm">
                  {formatCurrency(item.product.price * item.quantity)}
                </strong>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                  className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                  aria-label="Remover produto"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-zinc-200 p-5">
          <h2 className="text-lg font-bold">Resumo</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <strong>{formatCurrency(total)}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Frete</span>
              <strong>{formatCurrency(0)}</strong>
            </div>

            <div className="border-t border-zinc-200 pt-3">
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total</span>
                <strong>{formatCurrency(total)}</strong>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-5 flex w-full justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Finalizar compra
          </Link>
        </aside>
      </div>
    </div>
  );
}