import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();

  function handleFinishOrder() {
    clearCart();

    alert("Compra finalizada com sucesso!");

    navigate("/products");
  }

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Finalizar compra</h1>

        <div className="mt-6 rounded-2xl bg-zinc-50 p-6 text-center">
          <p className="text-sm text-zinc-600">
            Seu carrinho está vazio. Adicione produtos antes de finalizar.
          </p>

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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Finalizar compra</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Revise os itens do pedido antes de concluir.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-2xl border border-zinc-200 p-5">
          <h2 className="text-lg font-bold">Itens do pedido</h2>

          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <article
                key={item.product.id}
                className="flex items-center gap-4 border-b border-zinc-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-zinc-50 p-3">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="line-clamp-2 text-sm font-semibold">
                    {item.product.title}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">
                    Quantidade: {item.quantity}
                  </p>
                </div>

                <strong className="text-sm">
                  {formatCurrency(item.product.price * item.quantity)}
                </strong>
              </article>
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-zinc-200 p-5">
          <h2 className="text-lg font-bold">Resumo da compra</h2>

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

          <button
            type="button"
            onClick={handleFinishOrder}
            className="mt-5 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-[0.98]"
          >
            Confirmar pedido
          </button>

          <Link
            to="/cart"
            className="mt-3 flex w-full justify-center rounded-xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
          >
            Voltar ao carrinho
          </Link>
        </aside>
      </div>
    </div>
  );
}