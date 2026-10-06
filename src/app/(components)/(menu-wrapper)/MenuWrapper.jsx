"use client";
import { useState } from "react";
import CategoryFilter from "../(CategoryFilter)/CategoryFilter";
import FilterDish from "../(CategoryFilter)/FilterDish";
export default function MenuWrapper({ dishes }) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [search, setSearch] = useState("");
    const filteredDishes = selectedCategory === "All" ? dishes : dishes.filter(dish => dish.category === selectedCategory);
    const searchedDishes = filteredDishes.filter(dish => dish.nameEn.toLowerCase().includes(search.toLowerCase()) || dish.nameAm.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className=" min-h-screen gap-2 bg-soft-coral-tint">
            <div className="mx-10 mt-10">
                <p className="bg-pale-dusty-rose w-60 text-taupe-brown font-bold text-xs">HANDCRAFTED GONDAR & ADDIS SPICES</p>
                <h1 className="text-4xl font-semibold font-serif text-mahogany-red">Our Complete Culinary Heritage</h1>
                <p className="w-170 text-taupe-brown">Every dish is prepared daily from scratch using sun-dried spices, stone-ground legume flours,
                and clarified herbal butter sourced directly from highland farm cooperatives.</p>
            </div>

            <div className="flex flex-1 gap-4">
            <aside className="w-52 shrink-0 px-4 py-6">
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}/>

                </aside>

                <main className="flex-1 ">
                <div className="flex px-6 pt-6 mr-50 justify-center "> 
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search dishes eg. kitfo, tibs..." className="w-full rounded-lg border  border-gray-300 bg-white px-4 py-2 text-dark-espresso outline-none focus:border-mahogany-red" />
                </div>

                    <FilterDish dishes={searchedDishes} />
                </main>

            </div>
        </div>
    );
}