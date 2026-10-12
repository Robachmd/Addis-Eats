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
            <div className="md:mx-10 md:mt-10 mx-4 mt-6">
                <p className="bg-pale-dusty-rose w-60 text-taupe-brown font-bold text-xs">HANDCRAFTED GONDAR & ADDIS SPICES</p>
                <h1 className="text-3xl md:text-4xl font-semibold font-serif text-mahogany-red">Our Complete Culinary Heritage</h1>
                <p className="w-full md:max-w-3xl text-taupe-brown">Every dish is prepared daily from scratch using sun-dried spices, stone-ground legume flours,
                and clarified herbal butter sourced directly from highland farm cooperatives.</p>
            </div>

            <div className="flex flex-col md:flex-row flex-1 gap-4">
            <aside className="flex sm:flex-col w-52 shrink-0 px-4 py-6">
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}/>

                </aside>

                <main className="flex-1 ">
                <div className="flex w-170 md:px-6 px-6 pt-6 justify-center "> 
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search dishes eg. kitfo, tibs..." className="w-full rounded-lg border  border-gray-300 bg-white px-4 py-2 text-dark-espresso outline-none focus:border-mahogany-red" />
                </div>

                    <FilterDish dishes={searchedDishes} />
                </main>

            </div>
        </div>
    );
}