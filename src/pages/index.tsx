import Head from "next/head";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

type Status = "loading" | "success" | "error";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const keyword = query.trim().toLowerCase();
  const visibleProducts = keyword
    ? products.filter((product) =>
        product.title.toLowerCase().includes(keyword)
      )
    : products.slice(0, 5);

  return (
    <>
      <Head>
        <title>Products | ShopCase</title>
      </Head>

      <h1 className="text-2xl font-bold text-stone-900">Products</h1>

      <div className="relative mt-4">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products..."
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 pr-10 outline-none focus:border-teal-600"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-stone-400 transition hover:text-stone-700"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M5.3 5.3a1 1 0 0 1 1.4 0L10 8.6l3.3-3.3a1 1 0 1 1 1.4 1.4L11.4 10l3.3 3.3a1 1 0 0 1-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 0 1-1.4-1.4L8.6 10 5.3 6.7a1 1 0 0 1 0-1.4z" />
            </svg>
          </button>
        )}
      </div>

      {status === "loading" && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-xl border border-stone-200 bg-stone-100"
            />
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="mt-8 text-stone-600">
          Failed to load products. Please try again later.
        </p>
      )}

      {status === "success" && visibleProducts.length === 0 && (
        <p className="mt-8 text-stone-500">No products found.</p>
      )}

      {status === "success" && visibleProducts.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}