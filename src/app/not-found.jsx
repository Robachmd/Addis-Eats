"use client";

import Link from "next/link";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
return (
<main className="min-h-[75vh] flex items-center justify-center px-5 py-16 bg-[#faf8f5]">
    <div className="max-w-xl w-full text-center">

    {/* Illustration */}
    <div className="relative flex justify-center mb-8">
        <div className="w-36 h-36 rounded-full bg-orange-100 flex items-center justify-center">
        <SearchX size={65} className="text-orange-600" strokeWidth={1.5} />
        </div>
        <span className="absolute top-0 right-[25%] text-5xl font-bold text-orange-600">
        ?
        </span>
    </div>

    <p className="text-orange-600 font-bold tracking-[0.3em] text-sm mb-3">
        ERROR 404
    </p>

    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
        Oops! Lost your way?
    </h1>

    <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-9">
        Looks like this page has disappeared from our menu.
        Dont worry, theres plenty of delicious Ethiopian food waiting for you!
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
        href="/"
        className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-7 py-3.5 rounded-xl transition"
        >
        <Home size={19} />
        Back to Home
        </Link>

        <button
        onClick={() => window.history.back()}
        className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold px-7 py-3.5 rounded-xl transition"
        >
        <ArrowLeft size={19} />
        Go Back
        </button>
    </div>

    <p className="mt-12 text-sm text-gray-400">
        Hungry? Your next favorite dish is just a click away.
    </p>

    </div>
</main>
);
}