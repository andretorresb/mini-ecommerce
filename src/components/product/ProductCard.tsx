import { useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";

import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCart } from "../../hooks/useCart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleAddToCart(event?: MouseEvent<HTMLButtonElement>) {
    event?.stopPropagation();

    addToCart(product);

    setIsFlying(true);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setIsFlying(false);
    }, 800);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 1500);
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        onClick={handleOpenModal}
        className="group flex h-full cursor-pointer flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="flex h-48 items-center justify-center rounded-xl bg-zinc-50 p-4 dark:bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <span className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">
            {product.category}
          </span>

          <h2 className="mt-2 line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {product.title}
          </h2>

          <p className="mt-2 line-clamp-3 text-sm text-zinc-500 dark:text-zinc-400">
            {product.description}
          </p>

          <div className="mt-auto pt-4">
            <strong className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(product.price)}
            </strong>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              <ShoppingCart size={16} />
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-zinc-900 md:grid-cols-[320px_1fr] md:gap-8"
            >
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute right-4 top-4 rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                aria-label="Fechar detalhes do produto"
              >
                <X size={20} />
              </button>

              <div className="flex min-h-72 items-center justify-center rounded-2xl bg-zinc-50 p-6 dark:bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-72 max-w-full object-contain"
                />
              </div>

              <div className="mt-6 flex flex-col md:mt-0">
                <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {product.category}
                </span>

                <h2 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {product.title}
                </h2>

                <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {product.description}
                </p>

                {product.rating && (
                  <div className="mt-4 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
                    Avaliação:{" "}
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {product.rating.rate}
                    </strong>{" "}
                    de 5 baseado em{" "}
                    <strong className="text-zinc-900 dark:text-zinc-100">
                      {product.rating.count}
                    </strong>{" "}
                    avaliações.
                  </div>
                )}

                <div className="mt-auto pt-6">
                  <strong className="block text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(product.price)}
                  </strong>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                  >
                    <ShoppingCart size={18} />
                    Adicionar ao carrinho
                  </button>

                  <AnimatePresence>
                    {showSuccessMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="mt-3 text-center text-sm font-medium text-green-600 dark:text-green-400"
                      >
                        Produto adicionado ao carrinho!
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFlying && (
          <motion.div
            className="pointer-events-none fixed left-1/2 top-1/2 z-[60] flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 shadow-2xl"
            initial={{
              x: "-50%",
              y: "-50%",
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: "-42vw",
              y: "-36vh",
              scale: 0.35,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img
              src={product.image}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}