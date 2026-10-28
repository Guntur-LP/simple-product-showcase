import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="relative h-48 w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          unoptimized
          className="object-contain"
        />
      </div>
      <h2 className="mt-4 line-clamp-2 flex-1 font-semibold text-stone-900">
        {product.title}
      </h2>
      <Link
        href={`/products/${product.id}`}
        className="mt-4 rounded-lg bg-teal-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-teal-800"
      >
        View Details
      </Link>
    </article>
  );
}