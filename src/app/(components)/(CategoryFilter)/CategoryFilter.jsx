"use client";
export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = [
    "All",
    "Traditional Stews & Wat",
    "Tibs & Grills",
    "Fasting & Vegan / Tsom",
    "Raw & Cured Delicacies / Kitfo",
    "Beverages & Tej",
  ];

  return (
    <div className="flex flex-row flex-wrap md:flex-col md:items-stretch gap-2 ">
      {categories.map((category) => (
        <button
          className={`font-medium  py-1 px-2 text-left rounded ${selectedCategory === category ? "bg-mahogany-red text-white" : "bg-white text-gray hover:bg-red-100"}`}
          key={category}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
