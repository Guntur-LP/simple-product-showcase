import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import { getProduct } from "@/lib/api";
import type { Product } from "@/types/product";

type Status = "loading" | "success" | "notFound" | "error";

export default function ProductDetail() {
  const { isReady, query } = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  const slug = typeof query.slug === "string" ? query.slug : null;
  const isInvalid = isReady && slug === null;

  useEffect(() => {
    if (!isReady || slug === null) {
      return;
    }

    let cancelled = false;

    getProduct(slug)
      .then((data) => {
        if (cancelled) {
          return;
        }
        if (data) {
          setProduct(data);
          setStatus("success");
        } else {
          setStatus("notFound");
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
  }, [isReady, slug]);

  const showNotFound = isInvalid || status === "notFound";

  return (
    <>
      <Head>
        <title>
          {product ? `${product.title} | ShopCase` : "Product | ShopCase"}
        </title>
      </Head>

      <Link href="/" className="text-sm text-teal-700 hover:underline">
        ← Back to products
      </Link>

      {showNotFound && (
        <p className="mt-8 text-stone-600">Product not found.</p>
      )}

      {!showNotFound && status === "error" && (
        <p className="mt-8 text-stone-600">
          Failed to load product. Please try again later.
        </p>
      )}

      {!showNotFound && status === "loading" && (
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="h-80 animate-pulse rounded-xl border border-stone-200 bg-stone-100" />
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-stone-200" />
            <div className="h-8 w-full animate-pulse rounded bg-stone-200" />
            <div className="h-8 w-32 animate-pulse rounded bg-stone-200" />
            <div className="h-24 w-full animate-pulse rounded bg-stone-200" />
          </div>
        </div>
      )}

      {status === "success" && product && (
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="relative h-80 w-full rounded-xl border border-stone-200 bg-white">
            <Image
              src={product.image}
              alt={product.title}
              fill
              unoptimized
              className="object-contain p-6"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-stone-500">
              {product.category}
            </p>
            <h1 className="mt-2 text-2xl font-bold text-stone-900">
              {product.title}
            </h1>
            <p className="mt-4 text-3xl font-semibold text-teal-700">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-2 text-sm text-stone-600">
              ★ {product.rating.rate} ({product.rating.count} reviews)
            </p>
            <p className="mt-6 leading-relaxed text-stone-700">
              {product.description}
            </p>
            <div className="mt-8">
              <FavoriteButton productId={product.id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}