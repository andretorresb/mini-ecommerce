import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

interface CartContextData {
  items: CartItem[];
  totalItems: number;
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

const STORAGE_KEY = "@mini-ecommerce:cart";

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);

    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  }, [items]);

  function addToCart(product: Product) {
    setItems((currentItems) => {
      const productAlreadyInCart = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (productAlreadyInCart) {
        return currentItems.map((item) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });
      }

      return [
        ...currentItems,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(productId: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  }

  function increaseQuantity(productId: number) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      })
    );
  }

  function decreaseQuantity(productId: number) {
    setItems((currentItems) =>
      currentItems
        .map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        total,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}