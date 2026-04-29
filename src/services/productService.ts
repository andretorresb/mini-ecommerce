import { api } from "./api";
import type { Product } from "../types/product";

const STORAGE_KEY = "@mini-ecommerce:products";

export interface ProductFormData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export async function getProducts() {
  const storedProducts = localStorage.getItem(STORAGE_KEY);

  if (storedProducts) {
    return JSON.parse(storedProducts) as Product[];
  }

  const response = await api.get<Product[]>("/products");

  saveProducts(response.data);

  return response.data;
}

export async function createProduct(data: ProductFormData) {
  const products = await getProducts();

  const newProduct: Product = {
    id: Date.now(),
    title: data.title,
    price: Number(data.price),
    description: data.description,
    category: data.category,
    image: data.image,
    rating: {
      rate: 0,
      count: 0,
    },
  };

  const updatedProducts = [newProduct, ...products];

  saveProducts(updatedProducts);

  return newProduct;
}

export async function updateProduct(productId: number, data: ProductFormData) {
  const products = await getProducts();

  const updatedProducts = products.map((product) => {
    if (product.id === productId) {
      return {
        ...product,
        title: data.title,
        price: Number(data.price),
        description: data.description,
        category: data.category,
        image: data.image,
      };
    }

    return product;
  });

  saveProducts(updatedProducts);

  return updatedProducts.find((product) => product.id === productId);
}

export async function deleteProduct(productId: number) {
  const products = await getProducts();

  const updatedProducts = products.filter((product) => product.id !== productId);

  saveProducts(updatedProducts);
}