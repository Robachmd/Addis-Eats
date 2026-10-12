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
        <div className="flex flex-row flex-wrap md:flex-col md:items-stretch gap-2 ">
            {categories.map((category) => (
                <button className={` text-white font-bold py-2 px-3 text-left text-sm rounded ${selectedCategory===category ? 'bg-mahogany-red' : 'bg-red-700 hover:bg-red-800'}`} key={category} onClick={() => onCategoryChange(category)}>
                    {category}
                </button>
            ))}
        </div>
    );
}