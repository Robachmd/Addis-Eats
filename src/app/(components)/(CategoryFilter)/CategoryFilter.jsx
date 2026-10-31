"use client";

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ["All", "Traditional Stews & Wat", "Tibs & Grills", "Fasting & Vegan / Tsom", "Raw & Cured Delicacies / Kitfo", "Beverages & Tej"];

  return (
    <div className="flex flex-nowrap gap-2 overflow-x-auto overflow-y-hidden -mx-1 px-1 pb-3 scrollbar-hide lg:flex-col lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0">
      {categories.map((category) => (
        <button key={category} onClick={() => onCategoryChange(category)} className={`shrink-0 whitespace-nowrap lg:w-full lg:whitespace-normal text-sm font-medium text-left px-1 py-2.5 rounded-lg transition-all duration-200
        ${selectedCategory === category ? "bg-mahogany-red text-white shadow-sm" : "bg-soft-coral-tint/50 text-taupe-brown hover:bg-pale-dusty-rose hover:text-mahogany-red"}`}>
          {category}
        </button>
      ))}
    </div>
  );
}