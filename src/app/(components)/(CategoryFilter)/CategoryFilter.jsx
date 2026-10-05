"use client";
export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
    const categories = [
        "All",
        "Traditional Stews & Wat",
        "Tibs & Grills",
        "Fasting & Vegan / Tsom",
        "Raw & Cured Delicacies / Kitfo",
        "Beverages & Tej"
    ];

    return (
        <div className="flex flex-col gap-y-4">
            {categories.map((category) => (
                <button className={` text-white font-bold py-2 px-4 rounded ${selectedCategory===category ? 'bg-mahogany-red' : 'bg-red-700 hover:bg-red-800'}`} key={category} onClick={() => onCategoryChange(category)}>
                    {category}
                </button>
            ))}
        </div>
    );
}