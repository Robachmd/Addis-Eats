"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import LogoutButton from "../LogoutButton";
import { useCartStore } from "../(store)/cartStore";

function Header() {
const [isMenuOpen, setIsMenuOpen] = useState(false);

const total = useCartStore((state) => state.total);
const itemCounts = useCartStore((state) => state.itemCounts);

const closeMenu = () => {
setIsMenuOpen(false);
};

const navigationLinks = [
{ label: "Home", href: "/" },
{ label: "Menu", href: "/menu" },
{ label: "Order & Cart", href: "/cart" },
{ label: "Checkout", href: "/checkout" },
{ label: "Dashboard", href: "/dashboard" },
{ label: "Register", href: "/register" },
{ label: "Login", href: "/login" },
];

return (
<header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-pale-warm-white">
    <nav className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6">
    <Link href="/" onClick={closeMenu} className="shrink-0 text-xl font-bold text-mahogany-red sm:text-2xl">
        Addis-eats
    </Link>

    <ul className="ml-auto hidden items-center gap-5 text-sm font-semibold text-dark-espresso lg:flex xl:gap-7">
        {navigationLinks.map((link) => (
        <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-mahogany-red">
            {link.label}
            </Link>
        </li>
        ))}

        <li>
        <LogoutButton />
        </li>
    </ul>

    <div className="ml-auto flex shrink-0 items-center gap-3 lg:ml-5">
        {itemCounts > 0 && (
        <Link
            href="/cart"
            aria-label={`Shopping cart: ${itemCounts} items, total ${total} ETB`}
            className="relative flex items-center gap-2 rounded-lg bg-dark-forest-green px-3 py-2 text-sm font-semibold text-pure-white transition-opacity hover:opacity-90"
        >
            <ShoppingCart size={20} />

            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-mahogany-red px-1 text-xs text-white">
            {itemCounts}
            </span>
            <span className="hidden sm:inline">{total} ETB</span>
        </Link>
        )}

        <button
        type="button"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        className="inline-flex items-center justify-center rounded-lg p-2 text-dark-espresso transition-colors hover:bg-gray-100 lg:hidden"
        >
        <Menu size={26} />
        </button>
    </div>
    </nav>

    {isMenuOpen && (
    <div id="mobile-navigation" className="border-t border-gray-200 bg-pale-warm-white shadow-lg lg:hidden">
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 font-semibold text-dark-espresso sm:px-6">
        {navigationLinks.map((link) => (
            <li key={link.href}>
            <Link
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 transition-colors hover:bg-gray-100 hover:text-mahogany-red"
            >
                {link.label}
            </Link>
            </li>
        ))}

        <li className="border-t border-gray-200 px-4 py-3">
            <LogoutButton />
        </li>
        </ul>
    </div>
    )}
</header>
);
}

export default Header;
