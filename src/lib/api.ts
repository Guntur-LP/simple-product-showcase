import type { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  }
  const text = await res.text();
  if (!text) {
    return null;
  }
  return JSON.parse(text) as Product;
}