import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useRouter();

  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-stone-900">
          ShopCase
        </Link>
        <ul className="flex gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "font-semibold text-teal-700"
                      : "text-stone-600 hover:text-stone-900"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}