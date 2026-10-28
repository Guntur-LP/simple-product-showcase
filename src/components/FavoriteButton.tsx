import { useEffect, useState } from "react";

const STORAGE_KEY = "favorites";

function readFavorites(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

type FavoriteButtonProps = {
  productId: number;
};

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(readFavorites().includes(productId));
  }, [productId]);

  const handleToggle = () => {
    const current = readFavorites();
    const next = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsFavorite(next.includes(productId));
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={isFavorite}
      className={
        isFavorite
          ? "cursor-pointer rounded-lg border border-rose-500 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600"
          : "cursor-pointer rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
      }
    >
      {isFavorite ? "♥ Remove from Favorite" : "♡ Add to Favorite"}
    </button>
  );
}